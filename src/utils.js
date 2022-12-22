export const delZero = (val) => {
  if (val.indexOf('0') === 0) {
    return val.substring(1);
  }
  return val;
}