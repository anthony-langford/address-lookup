import React from 'react';

// Components
import {
  Label,
  FieldWrapper,
  AddressDetailsWrapper,
  AddressInput,
} from '../styles';

// Helpers
import { isAllEnglishString } from '../../../lib/isAllEnglishString';

// Interfaces
import { Address } from '../../../interfaces/Address';

interface AddressDetailsProps {
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
}

const AddressDetails: React.SFC<AddressDetailsProps> = ({
  selectedAddress,
  setSelectedAddress,
}): React.ReactElement | null => {
  if (!selectedAddress) return null;

  const renderInput = <field extends keyof Address>(
    field: field
  ): React.ReactElement => {
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

export default AddressDetails;
