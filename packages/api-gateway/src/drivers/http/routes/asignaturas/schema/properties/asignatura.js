// Asignatura
const asignatura = {
  infraestructuraId: { type: 'integer' },
  docenteId: { type: 'integer' },
  programaId: { type: 'integer' },
  academia: { type: 'string' },
  consecutivo: { type: 'integer' },
  area: { type: 'integer' },
  nombre: { type: 'string' },
  clave: { type: 'string' },
  seriacion: { type: 'string' },
  objetivo: { type: 'string' },
  temas: { type: 'string' },
  actividades: { type: 'string' },
  modeloInstitucional: { type: 'string' },
  horasDocente: { type: 'integer' },
  horasIndependiente: { type: 'integer' },
  minimoHoras: { type: 'integer' },
  minimoCreditos: { type: 'integer' },
  creditos: { type: 'integer' },
  tipo: { type: 'integer' },
  grado: { type: 'string' },
  fechaAutorizacion: { type: 'string', format: 'date-time' },
};

module.exports = { asignatura };
