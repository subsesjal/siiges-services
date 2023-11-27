const { checkers } = require('@siiges-services/shared');

const createOrgColegiado = (
  findOneInstitucionQuery,
  createOrgColegiadoQuery,
) => async (data) => {
  const INSTITUCION_OPD = 2;
  const { institucionId } = data;

  const institucion = await findOneInstitucionQuery({
    id: institucionId,
    tipoInstitucionId: INSTITUCION_OPD,
  });
  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', institucionId);

  const orgColegiado = await createOrgColegiadoQuery(data);

  return orgColegiado;
};

module.exports = createOrgColegiado;
