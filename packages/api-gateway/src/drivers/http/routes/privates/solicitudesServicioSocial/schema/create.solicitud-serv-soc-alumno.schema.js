const { solicitudServicioSocialAlumno } = require('./properties/solicitudServicioSocialAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { grado } = require('../../grupos/schema/properties/grado');
const { modalidadServicioSocial } = require('./properties/modalidadServicioSocial');
const { sectorServicioSocial } = require('./properties/sectorServicioSocial');
const { ejeServicioSocial } = require('./properties/ejeServicioSocial');
const { dimensionServicioSocial } = require('./properties/dimensionServicioSocial');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudServSocAlumnoSchema = {
  tags: ['Solicitudes Servicio Social Alumno'],
  description:
      'Crea un registro para asignar un alumno a una solicitud de Servicio Social. Se debe enviar el id de la solicitud en el params. De body debe ir el id del alumno, grado, modalidad, sector, dimensión, eje, lugar receptor y las fechas de inicio y término.',
  params: {
    type: 'object',
    properties: {
      solicitudServicioSocialId: { type: 'integer' },
    },
    required: ['solicitudServicioSocialId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitudServicioSocialAlumno,
    },
    required: [
      'alumnoId',
      'gradoId',
      'modalidadServicioSocialId',
      'sectorServicioSocialId',
      'ejeServicioSocialId',
      'lugarReceptor',
      'fechaInicio',
      'fechaTermino',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          properties: {
            ...solicitudServicioSocialAlumno,
            ...responseProperties,
            alumno: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...alumno,
                ...responseProperties,
              },
            },
            grado: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...grado,
                ...responseProperties,
              },
            },
            modalidadServicioSocial: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...modalidadServicioSocial,
                ...responseProperties,
              },
            },
            sectorServicioSocial: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...sectorServicioSocial,
                ...responseProperties,
              },
            },
            ejeServicioSocial: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...ejeServicioSocial,
                ...responseProperties,
                dimensionServicioSocial: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...dimensionServicioSocial,
                    ...responseProperties,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createSolicitudServSocAlumnoSchema;
