import { Address } from '../interfaces/Address';

export const getAddressLines = (address: Address): string[] => {
  if (!address) return [];
  return [
    (address.unit ? `${address.unit} - ` : '') + address.address,
    `${address.city} ${address.province}`,
    `${address.country}, ${address.postalCode}`,
  ];
};

export const getOneLineAddress = (address: Address): string => {
  if (!address) return '';
  return getAddressLines(address)[0];
};
