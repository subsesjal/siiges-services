const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLAN_MAESTRO_TABLE } = require('./planMaestro');

const PLANEACION_TABLE = 'planeaciones';

const PlaneacionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  planMaestroId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'plan_maestro_id',
    references: {
      model: PLAN_MAESTRO_TABLE,
      key: 'id',
    },
  },
  nombre: {
    type: DataTypes.STRING,
  },
  cargo: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  extension: {
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

class Planeacion extends Model {
  static associate(models) {
    this.belongsTo(models.PlanMaestro, { as: 'planMaestro' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLANEACION_TABLE,
      modelName: 'Planeacion',
      timestamps: false,
    };
  }
}

module.exports = {
  PLANEACION_TABLE,
  PlaneacionSchema,
  Planeacion,
};
