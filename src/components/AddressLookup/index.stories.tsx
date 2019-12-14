import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

// Components
import { AddressLookup } from '../../index';

// export default { title: 'Address Lookup' };
const stories = storiesOf('Components', module);

const AddressLookupComponent = () => {
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

stories.add('Address Lookup', () => <AddressLookupComponent />, {
  info: { inline: true },
});
