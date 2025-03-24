const { solicitudServicioSocialAlumno } = require('./properties/solicitudServicioSocialAlumno');
const { responseProperties } = require('./properties/responseProperties');

const deleteSolicitudServSocAlumnoSchema = {
  tags: ['Solicitudes Servicio Social'],
  description: 'Este endpoint elimina una solicitud de servicio social Alumno.',
  params: {
    type: 'object',
    properties: {
      solicitudesServicioSocialAlumnoId: { type: 'integer' },
    },
    required: ['solicitudesServicioSocialAlumnoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudServicioSocialAlumno,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deleteSolicitudServSocAlumnoSchema;
