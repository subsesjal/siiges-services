const { checkers } = require('@siiges-services/shared');

const findOneInspectoresProgramas = (
  findOneInspectorQuery,
  findInspectoresProgramasQuery,
  findAllInspeccionQuery,
) => async ({ inspectorId }) => {
  const inspector = await findOneInspectorQuery({ id: inspectorId });
  checkers.throwErrorIfDataIsFalsy(inspector, 'Inspectores-programas', inspectorId);

  const inspeccionPrograma = await findInspectoresProgramasQuery({ inspectorId });
  checkers.throwErrorIfDataIsFalsy(inspeccionPrograma, 'Inspectores-programas', inspectorId);

  const inspeccionesId = inspeccionPrograma.map(({ inspeccionId }) => inspeccionId);
  const include = [
    {
      association: 'programa',
      attributes: ['id', 'nombre'],
      include: [
        {
          association: 'solicitud',
          attributes: ['id', 'folio'],
        }],
    },
  ];
  const inspeccion = await findAllInspeccionQuery({ id: inspeccionesId }, { include });

  return inspeccion;
};

module.exports = { findOneInspectoresProgramas };
