const isAllEnglishString = str => {
  if (!str || !str.trim()) return false;
  // eslint-disable-next-line
  const pattern = /[\x00-\x80]+/; // ASCII character set (0-128, i.e. 0x0 to 0x80).
  return str.split('').every(s => pattern.test(s));
};

export default isAllEnglishString;
