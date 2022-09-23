const findItemInObj = (obj) => (
  identifier,
) => obj.find((item) => item.nombre === identifier);

module.exports = findItemInObj;
