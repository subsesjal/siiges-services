const { Logger } = require('@siiges-services/shared');

function formatFecha(fecha) {
  if (!fecha) return null;
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split('T')[0];
}

const findRvoePublic = (
  findAllProgramasQuery,
  includePublicRvoeQuery,
  wherePublicRvoeQuery,
) => async (filters) => {
  const { plantelId } = filters;

  const programas = await findAllProgramasQuery(
    null,
    {
      attributes: ['id', 'nombre', 'acuerdoRvoe', 'fechaSurteEfecto', 'vigencia'],
      query: {
        ...wherePublicRvoeQuery,
        plantelId,
      },
      include: includePublicRvoeQuery,
    },
  );

  if (!programas || programas.length === 0) {
    return [];
  }

  const data = programas.map((programa) => {
    const nivel = programa.nivel || {};
    const plantel = programa.plantel || {};
    const domicilio = plantel.domicilio || {};
    const municipio = domicilio.municipio || {};

    if (!nivel.descripcion) {
      Logger.warn(`[RVOE Public]: Programa ${programa.id} sin nivel descripcion`);
    }
    if (!municipio.nombre) {
      Logger.warn(`[RVOE Public]: Programa ${programa.id} sin municipio nombre`);
    }

    return {
      id: programa.id,
      nivel: nivel.descripcion || '',
      nombrePrograma: programa.nombre || '',
      acuerdoRvoe: programa.acuerdoRvoe || '',
      fechaCreacion: formatFecha(programa.fechaSurteEfecto),
      municipio: municipio.nombre || '',
      vigencia: formatFecha(programa.vigencia),
    };
  });

  return data;
};

module.exports = {
  findRvoePublic,
};
