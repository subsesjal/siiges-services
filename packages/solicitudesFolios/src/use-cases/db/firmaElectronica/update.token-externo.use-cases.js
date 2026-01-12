const updateTokenExterno = (updateTokenExternoQuery) => async (id, data) => {
  const updatedToken = await updateTokenExternoQuery(id, data);

  return updatedToken;
};

module.exports = updateTokenExterno;
