import React from 'react';
import { get } from 'lodash';

// Components
import {
  AddressSearchWrapper,
  SearchBarWrapper,
  Label,
  SearchBar,
  UnitInputWrapper,
  UnitInput,
} from '../styles';

// Helpers
import { isAllEnglishString } from '../../../lib/isAllEnglishString';

// Interfaces
import { Address } from '../../../interfaces/Address';

interface AddressSearchBarProps {
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
  setLookupFailed: (lookupFailed: boolean) => void;
  setError: (error: string | null) => void;
}

const AddressSearchBar: React.SFC<AddressSearchBarProps> = ({
  selectedAddress,
  setSelectedAddress,
  setLookupFailed,
  setError,
}): React.ReactElement => {
  const onSuggestSelect = (suggest: any): void => {
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

  return (
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
};

export default AddressSearchBar;
