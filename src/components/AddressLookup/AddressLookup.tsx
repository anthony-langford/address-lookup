import React, { useState, useEffect } from 'react';

// Components
import 'react-phone-input-2/lib/style.css';
import ErrorAlert from '../ErrorAlert';
import AddressSearchBar from './AddressSearchBar';
import AddressDetails from './AddressDetails';
import AdditionalInfo from './AdditionalInfo';
import { AddressLookupWrapper } from './styles';

// Interfaces
import { Address } from '../../interfaces/Address';

interface AddressLookupProps {
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
}

const AddressLookup: React.FC<AddressLookupProps> = ({
  selectedAddress,
  setSelectedAddress,
}): React.ReactElement => {
  const [lookupFailed, setLookupFailed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setError(null);
  }, [selectedAddress]);

  return (
    <AddressLookupWrapper>
      <ErrorAlert error={error} />
      <AddressSearchBar
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        setLookupFailed={setLookupFailed}
        setError={setError}
      />
      {lookupFailed && (
        <AddressDetails
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      )}
      {selectedAddress && (
        <AdditionalInfo
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      )}
    </AddressLookupWrapper>
  );
};

export default AddressLookup;
