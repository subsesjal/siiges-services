const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const getLibroId = async (tipoDocumentoId, findOneLibroQuery, createLibroQuery) => {
  if (checkers.isUndefined(tipoDocumentoId)) throw boom.badRequest('tipoDocumentoId is undefined');

  const año = new Date().getFullYear();
  let libro = await findOneLibroQuery({ descripcion: año, tipoDocumentoId });

  if (!libro) {
    const consecutivo = await findOneLibroQuery({ descripcion: año - 1, tipoDocumentoId });
    const nombre = consecutivo ? parseInt(consecutivo.nombre, 10) + 1 : 6;

    libro = await createLibroQuery({
      tipoDocumentoId,
      nombre,
      descripcion: año,
    });
  }

  return libro;
};

module.exports = {
  getLibroId,
};
