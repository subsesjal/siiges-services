const findItemInObj = (obj) => (identifier) => obj.find((item) => item.name === identifier);

module.exports = findItemInObj;
