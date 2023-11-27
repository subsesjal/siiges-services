const { checkers } = require('@siiges-services/shared');

const createAcuerdo = (
  findOneOrgColegiadoQuery,
  createAcuerdoQuery,
) => async (identifierObject, data) => {
  const { organoColegiadoId } = identifierObject;
  const orgColegiado = await findOneOrgColegiadoQuery({ id: organoColegiadoId });
  checkers.throwErrorIfDataIsFalsy(orgColegiado, 'organos_colegiados', organoColegiadoId);

  const acuerdo = await createAcuerdoQuery({
    organoColegiadoId,
    ...data,
  });

  return acuerdo;
};

module.exports = { createAcuerdo };
