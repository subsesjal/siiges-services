const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');

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

  es_aceptado: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  tipo_docente: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  tipo_contratacion: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  antiguedad: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  experiencias: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  observaciones: {
    allowNull: false,
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
    this.belongsTo(models.Programa, { as: 'programa' });
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

module.exports = {
  DOCENTE_TABLE,
  DocenteSchema,
  Docente,
  PERSONA_TABLE,

};
