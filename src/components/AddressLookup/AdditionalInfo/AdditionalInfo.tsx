import React from 'react';

// Components
// @ts-ignore
import ReactPhoneInput from 'react-phone-input-2';
import { Select } from 'antd';
import {
  Label,
  Description,
  FormWrapper,
  FieldWrapper,
  Input,
  AddressPreviewWrapper,
} from '../styles';

// Interfaces
import { Address } from '../../../interfaces/Address';
import { getAddressLines } from '../../../lib/address';

interface AdditionalInfoProps {
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
}

const AdditionalInfo: React.SFC<AdditionalInfoProps> = ({
  selectedAddress,
  setSelectedAddress,
}): React.ReactElement => {
  const buildAddressPreview = (): React.ReactElement[] | null => {
    if (!selectedAddress) return null;
    const completedAddress = { ...selectedAddress };
    completedAddress.address = `${completedAddress.streetNumber} ${completedAddress.streetName}`;
    completedAddress.unit = selectedAddress.unit;
    const lines = getAddressLines(completedAddress);
    return lines.map(line => <div key={line}>{line}</div>);
  };

  return (
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
};

export default AdditionalInfo;
