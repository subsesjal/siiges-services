const formacion = {
  nivelId: { type: 'integer' },
  nombre: { type: 'string' },
  institucion: { type: 'string' },
  descripcion: { type: 'string' },
  fechaGraduado: { type: 'string', format: 'date-time' },
};

module.exports = { formacion };
