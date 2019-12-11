import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import { Alert } from 'antd';
import Geosuggest from 'react-geosuggest';

// Helpers
import isAllEnglishString from '../../lib/isAllEnglishString';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorAlert = styled(Alert)`
  margin-top: 10px;
  height: ${props => (props.disabled ? 0 : 'auto')};
  transform: ${props => (props.disabled ? 'scaleY(0)' : 'scaleY(1)')};
  transition: transform 0.1s, height 0.1s;
`;

const AddressLookup = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [unit, setUnit] = useState();
  const [lookupFailed, setLookupFailed] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setError(null);
  }, [
    // selectedAddress,
    unit,
    // phoneNumber,
    // buildingType,
    // elevatorAccess,
    // isGroundFloor
  ]);

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
    address.postal_code = address_body.postal_code;
    address.street_number = address_body.street_number;
    address.street_name = address_body.route;

    setSelectedAddress(address);

    if (Object.values(address).some(v => !isAllEnglishString(v))) {
      setError(
        "Uh oh! Looks like Google couldn't find all your address details. Please fill out the required fields below, or input your address again."
      );
      setLookupFailed(true);
    } else {
      setError(null);
      setLookupFailed(false);
    }
  };

  const buildAddressSearchBar = () => {
    return (
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
            <input value={unit || ''} onChange={e => setUnit(e.target.value)} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      {/* {error ? ( */}
      <ErrorAlert
        disabled={error ? true : null}
        message={error}
        type="error"
        showIcon
      />
      {/* ) : null} */}
      {buildAddressSearchBar()}
      {/* {lookupFailed && buildAddressDetails()}
      {selectedAddress && buildAdditionalInfo()} */}
    </Wrapper>
  );
};

AddressLookup.propTypes = {};

export default AddressLookup;
