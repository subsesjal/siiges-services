// programa

const programa = {
  id: { type: 'integer' },
  nombre: { type: 'string' },
  acuerdoRvoe: { type: 'string' },
  descripcion: { type: 'string' },
  perfilEgresoConocimientos: { type: 'string' },
  perfilEgresoHabilidades: { type: 'string' },
  perfilEgresoActitudes: { type: 'string' },
  permisoAlumno: { type: 'boolean' },
};

module.exports = { programa };
