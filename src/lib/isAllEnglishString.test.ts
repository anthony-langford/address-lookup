import isAllEnglishString from './isAllEnglishString';

describe('isAllEnglishString', () => {
  test('English string', () => {
    expect(isAllEnglishString('this is an english string')).toEqual(true);
  });

  test('French string', () => {
    expect(isAllEnglishString('string en français')).toEqual(false);
  });
});
