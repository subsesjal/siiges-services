// Asignaturas
const asignaturas = {
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
  modeloinstitucional: { type: 'string' },
  horadocente: { type: 'integer' },
  horasindependiente: { type: 'integer' },
  minimohoras: { type: 'integer' },
  minimocreditos: { type: 'integer' },
  creditos: { type: 'integer' },
  tipo: { type: 'integer' },
  grado: { type: 'string' },
  fechaautorizacion: { type: 'string', format: 'date-time' },
};

module.exports = { asignaturas };
