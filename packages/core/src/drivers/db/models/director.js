const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');
const { PERSONA_TABLE } = require('./persona');

const DIRECTOR_TABLE = 'directores';

const DirectorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  plantelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'plantel_id',
    unique: true,
    references: {
      model: PLANTEL_TABLE,
      key: 'id',
    },
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

class Director extends Model {
  static associate(models) {
    this.belongsTo(models.Plantel, { as: 'plantel' });
    this.belongsTo(models.Persona, { as: 'persona' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DIRECTOR_TABLE,
      modelName: 'Director',
      timestamps: false,
    };
  }
}

module.exports = { DIRECTOR_TABLE, DirectorSchema, Director };
