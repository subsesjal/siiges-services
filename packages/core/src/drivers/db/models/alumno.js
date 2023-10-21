const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');
const { SITUACION_TABLE } = require('./situacion');
const { PROGRAMA_TABLE } = require('./programa');

const ALUMNO_TABLE = 'alumnos';

const AlumnoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  personaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'persona_id',
    unique: true,
    references: {
      model: PERSONA_TABLE,
      key: 'id',
    },
  },
  situacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'situacion_id',
    references: {
      model: SITUACION_TABLE,
      key: 'id',
    },
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  matricula: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  estatus: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  adeudoMaterias: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'adeudo_materias',
  },
  descripcionEstatus: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'descripcion_estatus',
  },
  archivoCertificado: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'archivo_certificado',
  },
  archivoNacimiento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'archivo_nacimiento',
  },
  archivoCurp: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'archivo_curp',
  },
  estatusCertificado: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'estatus_certificado',
  },
  estatusNacimiento: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'estatus_nacimiento',
  },
  estatusCurp: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'estatus_curp',
  },
  observaciones1: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  observaciones2: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  fechaBaja: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_baja',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class Alumno extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.Persona, { as: 'persona' });
    this.belongsTo(models.Situacion, { as: 'situacion' });
    this.hasMany(models.AlumnoTipoTramite, { as: 'alumnoTipoTramites', foreignKey: 'alumnoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALUMNO_TABLE,
      modelName: 'Alumno',
      timestamps: false,
    };
  }
}

module.exports = { ALUMNO_TABLE, AlumnoSchema, Alumno };
