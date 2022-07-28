const Joi = require('joi');

// Usuario
const usuarioId = Joi.number().integer();
const rolId = Joi.number().integer();
const usuario = Joi.string().alphanum().min(3).max(25);
const correo = Joi.string().email();
const contrasena = Joi.string().min(8).max(25);
const estatus = Joi.number().integer().min(0).max(1);
const actualizado = Joi.boolean();
// Persona
const nombre = Joi.string();
const apellidoPaterno = Joi.string();
const apellidoMaterno = Joi.string();
const fechaNacimiento = Joi.date();
const sexo = Joi.string();
const nacionalidad = Joi.string();
const telefono = Joi.string();
const celular = Joi.string();
const curp = Joi.string().length(18);
const rfc = Joi.string().length(13);
const ine = Joi.string();
const fotografia = Joi.string();

const getUsuarioSchema = {
  description: 'Given a userId, then return a user if it exist in database.',
  params: Joi.object({
    usuarioId: usuarioId.required(),
  }),
};

const createUsuarioSchema = {
  description: 'Given an object with user required data, then save a user in database.',
  body: Joi.object({
    rolId: rolId.required(),
    usuario: usuario.required(),
    correo: correo.required(),
    contrasena: contrasena.required(),
    estatus,
    actualizado: actualizado.required(),
    persona: Joi.object({
      nombre: nombre.when('persona', {
        is: Joi.object(),
        then: nombre.required(),
      }),
      apellidoPaterno: apellidoPaterno.when('persona', {
        is: Joi.object(),
        then: apellidoPaterno.required(),
      }),
      apellidoMaterno,
      fechaNacimiento,
      sexo,
      nacionalidad,
      telefono,
      celular,
      curp,
      rfc,
      ine,
      fotografia,
    }),
  }),
};

const updateUsuarioSchema = {
  description: 'Given an object with user required data and userId, then update user in database.',
  params: Joi.object({
    usuarioId: usuarioId.required(),
  }),
  body: Joi.object({
    rolId,
    correo,
    estatus,
    actualizado,
    persona: Joi.object({
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      sexo,
      nacionalidad,
      telefono,
      celular,
      curp,
      rfc,
      ine,
      fotografia,
    }),
  }),
};

module.exports = {
  getUsuarioSchema,
  createUsuarioSchema,
  updateUsuarioSchema,
};
