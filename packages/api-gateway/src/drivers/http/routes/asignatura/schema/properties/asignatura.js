// Asignatura
const asignatura = {
  Id: { type: 'integer' },
  programaId: { type: 'integer' },
  nombre: { type: 'string' },
  academia: { type: 'string' },
  consecutivo: { type: 'integer' },
  area: { type: 'integer' },
  clave: { type: 'string' },
  seriacion: { type: 'string' },
  objetivo: { type: 'string' },
  temas: { type: 'string' },
  actividades: { type: 'string' },
  modelo_instruccional: { type: 'string' },
  horas_docente: { type: 'integer' },
  horas_independiente: { type: 'integer' },
  minimo_horas: { type: 'integer' },
  minimo_creditos: { type: 'integer' },
  creditos: { type: 'string' },
  tipo: { type: 'integer' },
  grado: { type: 'integer' },
  fecha_autorizacion: { type: 'datetime' },
};

module.exports = { asignatura };
