const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSTITUCION_TABLE } = require('./institucion');
const { PERSONA_TABLE } = require('./persona');

const RECTOR_TABLE = 'rector';

const RectorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  institucionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'institucion_id',
    unique: true,
    references: {
      model: INSTITUCION_TABLE,
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

class Rector extends Model {
  static associate(models) {
    this.belongsTo(models.Institucion, { as: 'institucion' });
    this.belongsTo(models.Persona, { as: 'persona' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECTOR_TABLE,
      modelName: 'Rector',
      timestamps: false,
    };
  }
}

module.exports = { RECTOR_TABLE, RectorSchema, Rector };
