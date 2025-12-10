const { checkers } = require('@siiges-services/shared');

const updateSolicitudRevEquiv = (
  findOneSolicitudRevEquivQuery,
) => async (data, identifierObj) => {
  const include = [
    {
      association: 'interesado',
      include: [
        { association: 'persona', include: [{ association: 'domicilio' }] },
        { association: 'institucionProcedencia' },
        { association: 'institucionDestino' },
      ],
    },
  ];

  const solicitud = await findOneSolicitudRevEquivQuery(identifierObj, { include });

  checkers.throwErrorIfDataIsFalsy(
    solicitud,
    'solicitudes-rev-equiv',
    identifierObj.id,
  );

  const { interesado } = solicitud;
  const persona = interesado?.persona;
  const domicilio = persona?.domicilio;
  const institProc = interesado?.institucionProcedencia;
  const institDest = interesado?.institucionDestino;

  if (data.interesado?.persona?.domicilio) {
    await domicilio.update(data.interesado.persona.domicilio);
  }

  if (data.interesado?.persona) {
    const personaData = { ...data.interesado.persona };
    delete personaData.domicilio;
    await persona.update(personaData);
  }

  if (data.interesado) {
    const interesadoData = { ...data.interesado };
    delete interesadoData.persona;
    delete interesadoData.institucionDestino;
    delete interesadoData.institucionProcedencia;

    await interesado.update(interesadoData);
  }

  if (data.interesado?.institucionProcedencia) {
    await institProc.update(data.interesado.institucionProcedencia);
  }

  if (data.interesado?.institucionDestino) {
    const destData = { ...data.interesado.institucionDestino };
    delete destData.programa;
    await institDest.update(destData);
  }

  const solicitudData = { ...data };
  delete solicitudData.interesado;

  await solicitud.update(solicitudData);

  return findOneSolicitudRevEquivQuery(identifierObj, { include });
};

module.exports = updateSolicitudRevEquiv;
