import React, { useState, useEffect } from 'react';
import { get } from 'lodash';

// Components
// @ts-ignore
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Alert, Select } from 'antd';
import {
  AddressLookupWrapper,
  AddressSearchWrapper,
  SearchBarWrapper,
  Label,
  SearchBar,
  UnitInputWrapper,
  UnitInput,
  Description,
  FormWrapper,
  FieldWrapper,
  Input,
  AddressDetailsWrapper,
  AddressInput,
  AddressPreviewWrapper,
} from './styles';

// Helpers
import isAllEnglishString from '../../lib/isAllEnglishString';
import { getAddressLines } from '../../lib/address';

// Interfaces
import { Address } from '../../interfaces/Address';

interface AddressLookupProps {
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
}

const AddressLookup: React.FC<AddressLookupProps> = ({
  selectedAddress,
  setSelectedAddress,
}) => {
  const [lookupFailed, setLookupFailed] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setError(null);
  }, [selectedAddress]);

  const onSuggestSelect = (suggest: any) => {
    if (!suggest || !suggest.gmaps || !suggest.gmaps.address_components) return;

    const { address_components } = suggest.gmaps;
    const address_body = address_components.reduce((acc: any, cv: any) => {
      acc[cv.types[0]] = cv.long_name;
      return acc;
    }, {});

    const address: Address = {
      country: address_body.country,
      city: address_body.locality,
      province: address_body.administrative_area_level_1,
      postalCode: address_body.postal_code,
      streetNumber: address_body.street_number,
      streetName: address_body.route,
    };

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
    <AddressSearchWrapper>
      <SearchBarWrapper>
        <Label>Street Name</Label>
        <SearchBar
          onSuggestSelect={onSuggestSelect}
          placeholder="Search for your address..."
          suggestsClassName="address-search-list"
          suggestItemClassName="address-search-list-item"
        />
      </SearchBarWrapper>

      <UnitInputWrapper>
        <Label>Unit #</Label>
        <UnitInput
          value={get(selectedAddress, 'unit') ? selectedAddress.unit : ''}
          onChange={e =>
            setSelectedAddress({ ...selectedAddress, unit: e.target.value })
          }
        />
      </UnitInputWrapper>
    </AddressSearchWrapper>
  );

  const buildAddressDetails = () => {
    if (!selectedAddress) return null;

    const renderInput = <field extends keyof Address>(field: field) => {
      const value = selectedAddress[field];
      const isValid = isAllEnglishString(value);

      return (
        <AddressInput
          error={isValid}
          value={value}
          onChange={e => {
            const updatedAddress = { ...selectedAddress };
            updatedAddress[field] = e.target.value;
            setSelectedAddress(updatedAddress);
          }}
        />
      );
    };

    return (
      <AddressDetailsWrapper>
        <FieldWrapper>
          <Label>Street #:</Label>
          {renderInput('streetNumber')}
        </FieldWrapper>
        <FieldWrapper>
          <Label>Street Name:</Label>
          {renderInput('streetName')}
        </FieldWrapper>
        <FieldWrapper>
          <Label>City: </Label>
          {renderInput('city')}
        </FieldWrapper>
        <FieldWrapper>
          <Label>Province:</Label>
          {renderInput('province')}
        </FieldWrapper>
        <FieldWrapper>
          <Label>Country:</Label>
          {renderInput('country')}
        </FieldWrapper>
        <FieldWrapper>
          <Label>Postal Code</Label>
          {renderInput('postalCode')}
        </FieldWrapper>
      </AddressDetailsWrapper>
    );
  };

  // const buildPhoneNumber = () => (
  //   <Row>
  //     <FieldWrapper>
  //       <Label>Phone number:</Label>
  //       <ReactPhoneInput
  //         country="ca"
  //         enableAreaCodes
  //         value={selectedAddress.phoneNumber}
  //         onChange={(phoneNumber: string) =>
  //           setSelectedAddress({ ...selectedAddress, phoneNumber })
  //         }
  //         placeholder="Phone #"
  //         inputClass="react-phone-input2"
  //         inputStyle={{
  //           width: window.innerWidth < 768 ? '100%' : '200px',
  //           borderRadius: '4px',
  //         }}
  //       />
  //     </FieldWrapper>
  //     <FieldWrapper className="ext-field">
  //       <Label>Extension:</Label>
  //       <Input
  //         placeholder="Ext."
  //         onChange={e => {
  //           setSelectedAddress({
  //             ...selectedAddress,
  //             extension: e.target.value,
  //           });
  //         }}
  //         value={selectedAddress.extension || ''}
  //       />
  //     </FieldWrapper>
  //   </Row>
  // );

  // const buildSelectResidenceType = () => (
  //   <FieldWrapper>
  //     <Label>Residence Type:</Label>
  //     <Select
  //       onSelect={(buildingType: any) =>
  //         setSelectedAddress({ ...selectedAddress, buildingType })
  //       }
  //       value={selectedAddress.buildingType || '----------'}
  //       style={{ width: '200px' }}
  //     >
  //       <Select.Option value="is_house">House</Select.Option>
  //       <Select.Option value="is_apartment">Condo</Select.Option>
  //       <Select.Option value="is_business">Business</Select.Option>
  //     </Select>
  //   </FieldWrapper>
  // );

  // const buildGroundFloor = () => (
  //   <FieldWrapper>
  //     <Label>Ground Floor:</Label>
  //     <Select
  //       onSelect={(isGroundFloor: string) =>
  //         setSelectedAddress({ ...selectedAddress, isGroundFloor })
  //       }
  //       value={selectedAddress.isGroundFloor || '----------'}
  //       style={{ width: '200px' }}
  //     >
  //       <Select.Option value="NO">NO</Select.Option>
  //       <Select.Option value="YES">YES</Select.Option>
  //     </Select>
  //   </FieldWrapper>
  // );

  // const buildElevatorAccess = () => (
  //   <Row>
  //     <FieldWrapper>
  //       <Label>Elevator Access:</Label>
  //       <Select
  //         onSelect={(elevatorAccess: string) =>
  //           setSelectedAddress({ ...selectedAddress, elevatorAccess })
  //         }
  //         value={selectedAddress.elevatorAccess || '----------'}
  //         style={{ width: '200px' }}
  //         disabled={selectedAddress.isGroundFloor !== 'NO'}
  //       >
  //         <Select.Option value="NO">NO</Select.Option>
  //         <Select.Option value="YES">YES</Select.Option>
  //       </Select>
  //     </FieldWrapper>
  //   </Row>
  // );

  const buildAddressPreview = () => {
    if (!selectedAddress) return null;
    const completedAddress = { ...selectedAddress };
    completedAddress.address = `${completedAddress.streetNumber} ${completedAddress.streetName}`;
    completedAddress.unit = selectedAddress.unit;
    const lines = getAddressLines(completedAddress);
    console.log(lines);
    return lines.map(line => <div key={line}>{line}</div>);
  };

  const buildAdditionalInfo = () => (
    <div className="additional-info">
      <Description>
        Please fill out some additional info on this address
      </Description>
      <FormWrapper>
        <FieldWrapper>
          <Label>Phone number:</Label>
          <ReactPhoneInput
            country="ca"
            enableAreaCodes
            value={selectedAddress.phoneNumber}
            onChange={(phoneNumber: string) =>
              setSelectedAddress({ ...selectedAddress, phoneNumber })
            }
            placeholder="Phone #"
            inputClass="react-phone-input2"
            inputStyle={{
              width: window.innerWidth < 768 ? '100%' : '200px',
              borderRadius: '4px',
            }}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label>Extension:</Label>
          <Input
            placeholder="Ext."
            onChange={e => {
              setSelectedAddress({
                ...selectedAddress,
                extension: e.target.value,
              });
            }}
            value={selectedAddress.extension || ''}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Label>Residence Type:</Label>
          <Select
            onSelect={(buildingType: any) =>
              setSelectedAddress({ ...selectedAddress, buildingType })
            }
            value={selectedAddress.buildingType || '----------'}
            style={{ width: window.innerWidth < 768 ? '100%' : '200px' }}
          >
            <Select.Option value="is_house">House</Select.Option>
            <Select.Option value="is_apartment">Condo</Select.Option>
            <Select.Option value="is_business">Business</Select.Option>
          </Select>
        </FieldWrapper>

        <FieldWrapper>
          <Label>Ground Floor:</Label>
          <Select
            onSelect={(isGroundFloor: string) =>
              setSelectedAddress({ ...selectedAddress, isGroundFloor })
            }
            value={selectedAddress.isGroundFloor || '----------'}
            style={{ width: window.innerWidth < 768 ? '100%' : '200px' }}
          >
            <Select.Option value="NO">NO</Select.Option>
            <Select.Option value="YES">YES</Select.Option>
          </Select>
        </FieldWrapper>

        <FieldWrapper>
          <Label>Elevator Access:</Label>
          <Select
            onSelect={(elevatorAccess: string) =>
              setSelectedAddress({ ...selectedAddress, elevatorAccess })
            }
            value={selectedAddress.elevatorAccess || '----------'}
            style={{ width: window.innerWidth < 768 ? '100%' : '200px' }}
            disabled={selectedAddress.isGroundFloor !== 'NO'}
          >
            <Select.Option value="NO">NO</Select.Option>
            <Select.Option value="YES">YES</Select.Option>
          </Select>
        </FieldWrapper>
      </FormWrapper>
      <Description>Please confirm your new address details</Description>
      <AddressPreviewWrapper>{buildAddressPreview()}</AddressPreviewWrapper>
    </div>
  );

  return (
    <AddressLookupWrapper>
      {error ? (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ margin: '0 0 8px 0' }}
        />
      ) : null}
      {buildAddressSearchBar()}
      {lookupFailed && buildAddressDetails()}
      {selectedAddress && buildAdditionalInfo()}
    </AddressLookupWrapper>
  );
};

export default AddressLookup;
