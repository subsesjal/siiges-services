const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

function formatFecha(fecha) {
  if (!fecha) return null;
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split('T')[0];
}

function buildNombrePrograma(descripcion, nombre) {
  const parts = [descripcion, nombre].filter(Boolean);
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

async function findRvoePublic(req, reply) {
  try {
    Logger.info('[RVOE Public]: Searching RVOEs');
    const { plantelId } = req.query;

    const programas = await this.administracionAcademicaServices
      .findRvoePublic({ plantelId: Number(plantelId) });

    if (!programas || programas.length === 0) {
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ data: [] });
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
        nombrePrograma: buildNombrePrograma(nivel.descripcion, programa.nombre),
        acuerdoRvoe: programa.acuerdoRvoe || '',
        fechaCreacion: formatFecha(programa.fechaSurteEfecto),
        municipio: municipio.nombre || '',
        vigencia: formatFecha(programa.vigencia),
      };
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  findRvoePublic,
};
