import { getAddressLines, getOneLineAddress } from './address';

describe('getAddressLines', () => {
  test('Address without unit', () => {
    const address = {
      unit: '',
      address: '160 John Street',
      city: 'Toronto',
      province: 'Ontario',
      country: 'Canada',
      postalCode: 'M5V 2A4',
      streetNumber: '200',
      streetName: 'John Street',
    };
    expect(getAddressLines(address)).toEqual([
      '160 John Street',
      'Toronto Ontario',
      'Canada, M5V 2A4',
    ]);
  });

  test('Address with unit', () => {
    const address = {
      unit: '200',
      address: '160 John Street',
      city: 'Toronto',
      province: 'Ontario',
      country: 'Canada',
      postalCode: 'M5V 2A4',
      streetNumber: '200',
      streetName: 'John Street',
    };
    expect(getAddressLines(address)).toEqual([
      '200 - 160 John Street',
      'Toronto Ontario',
      'Canada, M5V 2A4',
    ]);
  });
});

describe('getOneLineAddress', () => {
  test('Address without unit', () => {
    const address = {
      unit: '',
      address: '160 John Street',
      city: 'Toronto',
      province: 'Ontario',
      country: 'Canada',
      postalCode: 'M5V 2A4',
      streetNumber: '200',
      streetName: 'John Street',
    };
    expect(getOneLineAddress(address)).toBe('160 John Street');
  });

  test('Address with unit', () => {
    const address = {
      unit: '200',
      address: '160 John Street',
      city: 'Toronto',
      province: 'Ontario',
      country: 'Canada',
      postalCode: 'M5V 2A4',
      streetNumber: '200',
      streetName: 'John Street',
    };
    expect(getOneLineAddress(address)).toBe('200 - 160 John Street');
  });
});
