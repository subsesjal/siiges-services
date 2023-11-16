const { Model, DataTypes, Sequelize } = require('sequelize');
const { CICLO_TABLE } = require('./ciclo');

const { NIVEL_TABLE } = require('./nivel');
const { SOLICITUD_TABLE } = require('./solicitud');
const { MODALIDAD_TABLE } = require('./modalidad');
const { PLANTEL_TABLE } = require('./plantel');

const PROGRAMA_TABLE = 'programas';

const ProgramaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  cicloId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'ciclo_id',
    references: {
      model: CICLO_TABLE,
      key: 'id',
    },
  },
  nivelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'nivel_id',
    references: {
      model: NIVEL_TABLE,
      key: 'id',
    },
  },
  solicitudId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_id',
    references: {
      model: SOLICITUD_TABLE,
      key: 'id',
    },
  },
  modalidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'modalidad_id',
    references: {
      model: MODALIDAD_TABLE,
      key: 'id',
    },
  },
  plantelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'plantel_id',
    references: {
      model: PLANTEL_TABLE,
      key: 'id',
    },
  },
  duracionPeriodos: {
    type: DataTypes.STRING,
    field: 'duracion_periodos',
  },
  objetivos: {
    type: DataTypes.STRING,
  },
  antecedentes: {
    type: DataTypes.TEXT,
  },
  creditos: {
    type: DataTypes.STRING,
  },
  minimoHorasOptativas: {
    type: DataTypes.INTEGER,
    field: 'minimo_horas_optativas',
  },
  minimoCreditosOptativas: {
    type: DataTypes.STRING,
    field: 'minimo_creditos_optativas',
  },
  vigencia: {
    type: DataTypes.DATE,
  },
  fechaSurteEfecto: {
    type: DataTypes.DATE,
    field: 'fecha_surte_efecto',
  },
  acuerdoRvoe: {
    type: DataTypes.STRING,
    field: 'acuerdo_rvoe',
  },
  nombre: {
    type: DataTypes.STRING,
  },
  tipo: {
    type: DataTypes.INTEGER,
  },
  actualizacion: {
    type: DataTypes.TEXT,
  },
  seguimientoEgresados: {
    type: DataTypes.TEXT,
    field: 'seguimiento_egresados',
  },
  conveniosVinculacion: {
    type: DataTypes.TEXT,
    field: 'convenios_vinculacion',
  },
  fuentesInformacion: {
    type: DataTypes.TEXT,
    field: 'fuentes_informacion',
  },
  estudioOfertaDemanda: {
    type: DataTypes.TEXT,
    field: 'estudio_oferta_demanda',
  },
  lineasGeneracionAplicacionConocimiento: {
    type: DataTypes.TEXT,
    field: 'lineas_generacion_aplicacion_conocimiento',
  },
  necesidadProfesional: {
    type: DataTypes.TEXT,
    field: 'necesidad_profesional',
  },
  necesidadInstitucional: {
    type: DataTypes.TEXT,
    field: 'necesidad_institucional',
  },
  necesidadSocial: {
    type: DataTypes.TEXT,
    field: 'necesidad_social',
  },
  recursosOperacion: {
    type: DataTypes.TEXT,
    field: 'recursos_operacion',
  },
  antecedenteAcademico: {
    type: DataTypes.TEXT,
    field: 'antecedente_academico',
  },
  perfilIngresoConocimientos: {
    type: DataTypes.TEXT,
    field: 'perfil_ingreso_conocimientos',
  },
  perfilIngresoHabilidades: {
    type: DataTypes.TEXT,
    field: 'perfil_ingreso_habilidades',
  },
  perfilIngresoActitudes: {
    type: DataTypes.TEXT,
    field: 'perfil_ingreso_actitudes',
  },
  perfilEgresoConocimientos: {
    type: DataTypes.TEXT,
    field: 'perfil_egreso_conocimientos',
  },
  perfilEgresoHabilidades: {
    type: DataTypes.TEXT,
    field: 'perfil_egreso_habilidades',
  },
  perfilEgresoActitudes: {
    type: DataTypes.TEXT,
    field: 'perfil_egreso_actitudes',
  },
  metodosInduccion: {
    type: DataTypes.TEXT,
    field: 'metodos_induccion',
  },
  procesoSeleccion: {
    type: DataTypes.TEXT,
    field: 'proceso_seleccion',
  },
  mapaCurricular: {
    type: DataTypes.TEXT,
    field: 'mapa_curricular',
  },
  flexibilidadCurricular: {
    type: DataTypes.TEXT,
    field: 'flexibilidad_curricular',
  },
  objetivoGeneral: {
    type: DataTypes.TEXT,
    field: 'objetivo_general',
  },
  objetivosParticulares: {
    type: DataTypes.TEXT,
    field: 'objetivos_particulares',
  },
  calificacionMinima: {
    type: DataTypes.INTEGER,
    field: 'calificacion_minima',
  },
  calificacionMaxima: {
    type: DataTypes.INTEGER,
    field: 'calificacion_maxima',
  },
  calificacionAprobatoria: {
    type: DataTypes.INTEGER,
    field: 'calificacion_aprobatoria',
  },
  calificacionDecimal: {
    type: DataTypes.BOOLEAN,
    field: 'calificacion_decimal',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class Programa extends Model {
  static associate(models) {
    this.belongsTo(models.Ciclo, { as: 'ciclo' });
    this.belongsTo(models.Nivel, { as: 'nivel' });
    this.belongsTo(models.Solicitud, { as: 'solicitud' });
    this.belongsTo(models.Modalidad, { as: 'modalidad' });
    this.belongsTo(models.Plantel, { as: 'plantel' });
    this.hasMany(models.ProgramaTurno, { as: 'programaTurnos', foreignKey: 'programaId' });
    this.hasMany(models.Asignatura, { as: 'asignaturas', foreignKey: 'programaId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROGRAMA_TABLE,
      modelName: 'Programa',
      timestamps: false,
    };
  }
}
module.exports = { PROGRAMA_TABLE, ProgramaSchema, Programa };
