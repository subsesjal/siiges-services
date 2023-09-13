const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');
const { SEGURIDAD_SISTEMA_TABLE } = require('./seguridadSistema');

const PLANTEL_SEGURIDAD_SISTEMA_TABLE = 'planteles_seguridad_sistemas';

const PlantelSeguridadSistemaSchema = {
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
  seguridadSistemaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'seguridad_sistema_id',
    references: {
      model: SEGURIDAD_SISTEMA_TABLE,
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

class PlantelSeguridadSistema extends Model {
  static associate(models) {
    this.belongsTo(models.Plantel, { as: 'plantel' });
    this.belongsTo(models.SeguridadSistema, { as: 'seguridadSistema' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLANTEL_SEGURIDAD_SISTEMA_TABLE,
      modelName: 'PlantelSeguridadSistema',
      timestamps: false,
    };
  }
}
module.exports = {
  PLANTEL_SEGURIDAD_SISTEMA_TABLE,
  PlantelSeguridadSistemaSchema,
  PlantelSeguridadSistema,
};
