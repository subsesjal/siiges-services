const { persona, general } = require('./generalSchema');

const personaResponseSchema = {
  type: 'object',
  properties: {
    id: persona.id,
    nombre: persona.nombre,
    apellidoPaterno: persona.apellidoPaterno,
    apellidoMaterno: persona.apellidoMaterno,
    fechaNacimiento: persona.fechaNacimiento,
    sexo: persona.sexo,
    nacionalidad: persona.nacionalidad,
    telefono: persona.telefono,
    celular: persona.celular,
    curp: persona.curp,
    rfc: persona.rfc,
    ine: persona.ine,
    fotografia: persona.fotografia,
    createdAt: general.createdAt,
    updatedAt: general.updatedAt,
    deletedAt: general.deletedAt,
  },
};

module.exports = personaResponseSchema;
