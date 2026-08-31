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

async function findMunicipiosJalisco(req, reply) {
  try {
    Logger.info('[RVOE Public]: Getting municipios de Jalisco');
    const municipios = await this.administracionAcademicaServices
      .findMunicipiosJalisco();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: municipios });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findInstitucionesByMunicipio(req, reply) {
  try {
    Logger.info('[RVOE Public]: Getting instituciones by municipio');
    const { municipioId } = req.query;

    const filters = {};
    if (municipioId) filters.municipioId = Number(municipioId);

    const instituciones = await this.administracionAcademicaServices
      .findInstitucionesByMunicipio(filters);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: instituciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findPlantelesByInstitucion(req, reply) {
  try {
    Logger.info('[RVOE Public]: Getting planteles by institucion');
    const { institucionId, municipioId } = req.query;

    const filters = {};
    if (institucionId) filters.institucionId = Number(institucionId);
    if (municipioId) filters.municipioId = Number(municipioId);

    const planteles = await this.administracionAcademicaServices
      .findPlantelesByInstitucion(filters);

    const data = planteles.map((plantel) => ({
      id: plantel.id,
      claveCentroTrabajo: plantel.claveCentroTrabajo,
      nombreInstitucion: plantel.institucion?.nombre || '',
      calle: plantel.domicilio?.calle || '',
      numeroExterior: plantel.domicilio?.numeroExterior || '',
    }));

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
  findMunicipiosJalisco,
  findInstitucionesByMunicipio,
  findPlantelesByInstitucion,
};
