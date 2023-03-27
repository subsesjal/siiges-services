const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');
const { HIGIENE_TABLE } = require('./higiene');

const PLANTELHIGIENE_TABLE = 'PlantelHigiene';

const PlantelHigieneSchema = {
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
    references: {
      model: PLANTEL_TABLE,
      key: 'id',
    },
  },
  higieneId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'higiene_id',
    references: {
      model: HIGIENE_TABLE,
      key: 'id',
    },
  },
  cantidad: {
    type: DataTypes.STRING,
    field: 'cantidad',
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

class PlantelHigiene extends Model {
  static associate(models) {
    this.belongsTo(models.plantel, { as: 'plantel' });
    this.belongsTo(models.higiene, { as: 'higiene' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLANTELHIGIENE_TABLE,
      modelName: 'PlantelHigiene',
      timestamps: false,
    };
  }
}

module.exports = { PLANTELHIGIENE_TABLE, PlantelHigieneSchema, PlantelHigiene };
