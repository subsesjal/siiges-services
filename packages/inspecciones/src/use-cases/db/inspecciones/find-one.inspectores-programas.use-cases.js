const { checkers } = require('@siiges-services/shared');

const findOneInspectoresProgramas = (
  findOneInspectorQuery,
  findInspectoresProgramasQuery,
  findAllInspeccionQuery,
  findOneUsuarioQuery,
) => async ({ usuarioId }) => {
  const persona = await findOneUsuarioQuery({ id: usuarioId });
  checkers.throwErrorIfDataIsFalsy(persona, 'Usuarios', usuarioId);
  const { personaId } = persona;

  const inspector = await findOneInspectorQuery({ personaId });
  checkers.throwErrorIfDataIsFalsy(inspector, 'Inspector usuario', usuarioId);
  const { id: inspectorId } = inspector;

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
