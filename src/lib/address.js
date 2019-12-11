const getAddressLines = address => {
  if (!address) return [];
  return [
    (address.unit ? `${address.unit} - ` : '') + address.address,
    `${address.city} ${address.province}`,
    `${address.country}, ${address.postalCode}`,
  ];
};

const getOneLineAddress = address => {
  if (!address) return '';
  return getAddressLines(address)[0];
};

export { getAddressLines, getOneLineAddress };
