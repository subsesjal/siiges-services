const getById = (usuarioModel) => async (id) => {
	
  const usuario = await userModel.findOne({ where: {id} })

  if (!usuario) {
    
  }
  
  return usuario;
	const address = await addressModel.findOne({
		where: {
			id: user.addressId,
		},
	});

	newUser = {
		fullName: `${user.firstName} ${user.lastName}`,
		birthday: user.birthday,
		adreessId: user.adreessId,
		clothes: userClothes.newClothes(),
	};

	return newUser;
};

module.exports = getById;
