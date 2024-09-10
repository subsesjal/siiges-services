const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');

const EXPERIENCIA_TABLE = 'experiencias';

const ExperienciaSchema = {
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
  tipo: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  funcion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  institucion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  periodo: {
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

class Experiencia extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EXPERIENCIA_TABLE,
      modelName: 'Experiencia',
      timestamps: false,
    };
  }
}

module.exports = { EXPERIENCIA_TABLE, ExperienciaSchema, Experiencia };
