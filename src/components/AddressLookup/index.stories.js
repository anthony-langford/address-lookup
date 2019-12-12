import React, { useState } from 'react';

// Components
import AddressLookup from '../../index';

export default { title: 'Address Lookup' };

export const withText = () => {
  const [selectedAddress, setSelectedAddress] = useState();

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        padding: '100px 0 0',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '600px' }}>
        <AddressLookup
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      </div>
    </div>
  );
};
