const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findRvoePublic(req, reply) {
  try {
    Logger.info('[RVOE Public]: Searching RVOEs');
    const { plantelId } = req.query;

    const programas = await this.administracionAcademicaServices
      .findRvoePublic({ plantelId: Number(plantelId) });

    const data = programas.map((programa) => {
      const plantel = programa.plantel || {};
      const domicilio = plantel.domicilio || {};
      const municipio = domicilio.municipio || {};
      const nivel = programa.nivel || {};

      return {
        id: programa.id,
        nombrePrograma: `${nivel.descripcion || ''} ${programa.nombre || ''}`.trim(),
        acuerdoRvoe: programa.acuerdoRvoe,
        fechaCreacion: programa.fechaSurteEfecto,
        municipio: municipio.nombre || '',
        vigencia: programa.vigencia,
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
