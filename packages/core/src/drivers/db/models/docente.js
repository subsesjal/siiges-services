const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');
const { PROGRAMA_TABLE } = require('./programa');

const DOCENTE_TABLE = 'docentes';

const DocenteSchema = {
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
    references: {
      model: PERSONA_TABLE,
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
  esAceptado: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'es_aceptado',
  },
  tipoDocente: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_docente',
  },
  tipoContratacion: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_contratacion',
  },
  antiguedad: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  experiencias: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  observaciones: {
    allowNull: true,
    type: DataTypes.STRING,
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

class Docente extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
    this.hasMany(models.AsignaturaDocente, { as: 'asignaturasDocentes', foreignKey: 'docenteId' });
    this.hasMany(models.FormacionDocente, { as: 'formacionesDocentes', foreignKey: 'docenteId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCENTE_TABLE,
      modelName: 'Docente',
      timestamps: false,
    };
  }
}

module.exports = { DOCENTE_TABLE, DocenteSchema, Docente };
