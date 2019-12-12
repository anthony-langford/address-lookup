import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Components
import { Alert, Select } from 'antd';
import Geosuggest from 'react-geosuggest';

// Helpers
import isAllEnglishString from '../../lib/isAllEnglishString';
import { getAddressLines } from '../../lib/address';

const AddressLookup = ({ selectedAddress, setSelectedAddress }) => {
  const [lookupFailed, setLookupFailed] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setError(null);
  }, [selectedAddress]);

  const onSuggestSelect = suggest => {
    if (!suggest || !suggest.gmaps || !suggest.gmaps.address_components) return;

    const { address_components } = suggest.gmaps;
    const address_body = address_components.reduce((acc, cv) => {
      acc[cv.types[0]] = cv.long_name;
      return acc;
    }, {});

    const address = {};

    address.country = address_body.country;
    address.city = address_body.locality;
    address.province = address_body.administrative_area_level_1;
    address.postalCode = address_body.postal_code;
    address.streetNumber = address_body.street_number;
    address.streetName = address_body.route;

    setSelectedAddress(address);

    if (Object.values(address).some(value => !isAllEnglishString(value))) {
      setError(
        "Uh oh! Looks like Google couldn't find all your address details. Please fill out the required fields below, or input your address again."
      );
      setLookupFailed(true);
    } else {
      setError(null);
      setLookupFailed(false);
    }
  };

  const buildAddressSearchBar = () => (
    <div className="address-search-form">
      <div className="address-search">
        <div className="address-search-bar">
          <div className="label">Street Name</div>
          <Geosuggest
            onSuggestSelect={onSuggestSelect}
            placeholder="Search for your address..."
            suggestsClassName="address-search-list"
            suggestItemClassName="address-search-list-item"
          />
        </div>

        <div className="unit-input">
          <div className="label">Unit #</div>
          <input
            value={get(selectedAddress, 'unit') ? selectedAddress.unit : ''}
            onChange={e =>
              setSelectedAddress({ ...selectedAddress, unit: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );

  const buildAddressDetails = () => {
    if (!selectedAddress) return null;

    const renderInput = field => {
      const value = selectedAddress[field];
      const isValid = isAllEnglishString(value);
      return (
        <input
          value={value}
          className={isValid ? '' : 'error'}
          onChange={e => {
            const updatedAddress = { ...selectedAddress };
            updatedAddress[field] = e.target.value;
            setSelectedAddress(updatedAddress);
          }}
        />
      );
    };

    return (
      <div className="address-details">
        <div className="address-field">
          <div className="label">Street #:</div>
          {renderInput('streetNumber')}
        </div>
        <div className="address-field">
          <div className="label">Street Name:</div>
          {renderInput('streetName')}
        </div>
        <div className="address-field">
          <div className="label">City: </div>
          {renderInput('city')}
        </div>
        <div className="address-field">
          <div className="label">Province:</div>
          {renderInput('province')}
        </div>
        <div className="address-field">
          <div className="label">Country:</div>
          {renderInput('country')}
        </div>
        <div className="address-field">
          <div className="label">Postal Code</div>
          {renderInput('postalCode')}
        </div>
      </div>
    );
  };

  const buildPhoneNumber = () => (
    <>
      <div className="phone-field">
        <div className="label">Phone number:</div>
        <ReactPhoneInput
          country="ca"
          enableAreaCodes
          value={selectedAddress.phoneNumber}
          onChange={phoneNumber =>
            setSelectedAddress({ ...selectedAddress, phoneNumber })
          }
          placeholder="Phone #"
        />
      </div>
      <div className="ext-field">
        <div className="label">Extension:</div>
        <input
          placeholder="Ext."
          onChange={e => {
            setSelectedAddress({
              ...selectedAddress,
              extension: e.target.value,
            });
          }}
          value={selectedAddress.extension || ''}
        />
      </div>
    </>
  );

  const buildSelectResidenceType = () => (
    <div className="residence-type">
      <div className="label">Residence Type:</div>
      <Select
        onSelect={buildingType =>
          setSelectedAddress({ ...selectedAddress, buildingType })
        }
        value={selectedAddress.buildingType || '----------'}
        className="select-dropdown"
      >
        <Select.Option value="is_house">house</Select.Option>
        <Select.Option value="is_apartment">condo</Select.Option>
        <Select.Option value="is_business">business</Select.Option>
      </Select>
    </div>
  );

  const buildGroundFloor = () => (
    <div className="ground-floor">
      <div className="label">Ground Floor:</div>
      <Select
        onSelect={isGroundFloor =>
          setSelectedAddress({ ...selectedAddress, isGroundFloor })
        }
        value={selectedAddress.isGroundFloor || '----------'}
        className="select-dropdown"
      >
        <Select.Option value="NO">NO</Select.Option>
        <Select.Option value="YES">YES</Select.Option>
      </Select>
    </div>
  );

  const buildElevatorAccess = () => (
    <div className="elevator-access">
      <div className="label">Elevator Access:</div>
      <Select
        onSelect={elevatorAccess =>
          setSelectedAddress({ ...selectedAddress, elevatorAccess })
        }
        value={selectedAddress.elevatorAccess || '----------'}
        className="select-dropdown"
        disabled={selectedAddress.isGroundFloor !== 'NO'}
      >
        <Select.Option value="NO">NO</Select.Option>
        <Select.Option value="YES">YES</Select.Option>
      </Select>
    </div>
  );

  const buildAddressPreview = () => {
    if (!selectedAddress) return null;
    const completedAddress = { ...selectedAddress };
    completedAddress.address = `${completedAddress.streetNumber} ${completedAddress.streetName}`;
    completedAddress.unit = selectedAddress.unit;
    const lines = getAddressLines(completedAddress);
    return lines.map(line => <div key={line}>{line}</div>);
  };

  const buildAdditionalInfo = () => (
    <div className="additional-info">
      <div className="description">
        Please fill out some additional info on this address
      </div>
      <div className="fields">
        {buildPhoneNumber()}
        {buildSelectResidenceType()}
        {buildGroundFloor()}
        {buildElevatorAccess()}
      </div>
      <div className="description">Please confirm your new address details</div>
      <div className="address-preview">{buildAddressPreview()}</div>
    </div>
  );

  return (
    <div className="new-address-modal">
      {error ? (
        <Alert
          className={`alert-smooth-box ${error ? '' : 'disabled'}`}
          message={error}
          type="error"
          showIcon
        />
      ) : null}
      {buildAddressSearchBar()}
      {lookupFailed && buildAddressDetails()}
      {selectedAddress && buildAdditionalInfo()}
    </div>
  );
};

AddressLookup.propTypes = {
  selectedAddress: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])),
  setSelectedAddress: PropTypes.func.isRequired,
};

AddressLookup.defaultProps = {
  selectedAddress: null,
};

export default AddressLookup;
