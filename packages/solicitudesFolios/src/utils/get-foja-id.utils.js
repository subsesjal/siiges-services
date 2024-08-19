const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const getFojaId = async (
  libroId,
  findAllFojaQuery,
  createFojaQuery,
  countFoliosDocumentosAlumnosQuery,
) => {
  if (checkers.isUndefined(libroId)) throw boom.badRequest('libroId is undefined');

  const fojas = (await findAllFojaQuery({ libroId })) || [];
  const lastFoja = fojas.length ? fojas.pop() : null;

  if (!lastFoja) {
    return createFojaQuery({ libroId, nombre: 6, descripcion: 6 });
  }

  const totalFoliosFoja = await countFoliosDocumentosAlumnosQuery(null, {
    isDeleting: false,
    searchColumn: 'fojaId',
    searchText: lastFoja.id,
  });

  if (totalFoliosFoja < 30) {
    return lastFoja;
  }

  const nuevaFoja = parseInt(lastFoja.nombre, 10) + 1;
  return createFojaQuery({ libroId, nombre: nuevaFoja, descripcion: nuevaFoja });
};

module.exports = {
  getFojaId,
};
