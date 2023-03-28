const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');
const { HIGIENE_TABLE } = require('./higiene');

const PLANTEL_HIGIENE_TABLE = 'plantelhigiene';

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
    allowNull: false,
    type: DataTypes.INTEGER,
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
    this.belongsTo(models.Plantel, { as: 'plantel' });
    this.belongsTo(models.Higiene, { as: 'higiene' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLANTEL_HIGIENE_TABLE,
      modelName: 'PlantelHigiene',
      timestamps: false,
    };
  }
}
module.exports = { PLANTEL_HIGIENE_TABLE, PlantelHigieneSchema, PlantelHigiene };
