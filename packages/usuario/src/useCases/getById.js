const boom = require('@hapi/boom');

const getById = (getByIdQuery) => async (id) => {
	//const result = await getUsuarioById(id);
  const result = null;
  console.log(`result: ${result} and id: ${id}`);
	if (!result) {
		throw boom.notFound(
			`[geolocation:getPlace]: No place found with id: ${id}`
		);
	}
	return result;
};

module.exports = {
	getById,
};
