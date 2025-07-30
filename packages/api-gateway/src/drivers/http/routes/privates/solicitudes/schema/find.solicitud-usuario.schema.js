const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { municipio } = require('../../usuarios/schema/properties/municipio');

const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesUsuarioSchema = {
  tags: ['Solicitudes'],
  description: 'Return a list of solicitudes by user.',
  params: {
    title: 'findOneSolicitudUserSchema',
    type: 'object',
    properties: {
      usuarioId: { type: 'integer' },
    },
    required: ['usuarioId'],
  },
  // response: {
  //   200: {
  //     type: 'object',
  //     properties: {
  //       data: {
  //         type: 'array',
  //         items: {
  //           type: 'object',
  //           properties: {
  //             id: { type: 'integer' },
  //             ...solicitud,
  //             folio: { type: 'string' },
  //             ...responseProperties,
  //             estatusSolicitud: {
  //               type: 'object',
  //               properties: {
  //                 id: { type: 'integer' },
  //                 ...estatusSolicitud,
  //                 ...responseProperties,
  //               },
  //             },
  //             programa: {
  //               type: 'object',
  //               properties: {
  //                 id: { type: 'integer' },
  //                 ...programa,
  //                 ...responseProperties,
  //                 plantel: {
  //                   type: 'object',
  //                   properties: {
  //                     id: { type: 'integer' },
  //                     ...plantel,
  //                     ...responseProperties,
  //                     domicilio: {
  //                       type: 'object',
  //                       properties: {
  //                         id: { type: 'integer' },
  //                         ...domicilio,
  //                         ...responseProperties,
  //                         municipio: {
  //                           type: 'object',
  //                           properties: {
  //                             id: { type: 'integer' },
  //                             ...municipio,
  //                             ...responseProperties,
  //                           },
  //                         },
  //                         estado: {
  //                           type: 'object',
  //                           properties: {
  //                             id: { type: 'integer' },
  //                             ...estado,
  //                             ...responseProperties,
  //                           },
  //                         },
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
};

module.exports = findAllSolicitudesUsuarioSchema;
