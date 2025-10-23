const isTrue = (value) => ["true", 1, true].includes(value);
const isFalse = (value) => ["false", 0, false].includes(value);
const removePropertyInObject = (target = {}, property = []) => {
  for (const item of property) {
    delete target[item];
  }
  return target;
};

module.exports = {
  isFalse,
  isTrue,
  removePropertyInObject,
};
