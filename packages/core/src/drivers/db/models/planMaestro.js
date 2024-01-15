const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSTITUCION_TABLE } = require('./institucion');
const { SESION_TABLE } = require('./sesion');
const { PERIODO_TABLE } = require('./periodo');

const PLAN_MAESTRO_TABLE = 'planes_maestros';

const PlanMaestroSchema = {
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
    references: {
      model: INSTITUCION_TABLE,
      key: 'id',
    },
  },
  sesionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'sesion_id',
    references: {
      model: SESION_TABLE,
      key: 'id',
    },
  },
  periodoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'periodo_id',
    references: {
      model: PERIODO_TABLE,
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATE,
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

class PlanMaestro extends Model {
  static associate(models) {
    this.belongsTo(models.Sesion, { as: 'sesion' });
    this.belongsTo(models.Periodo, { as: 'periodo' });
    this.hasOne(models.ObraYMantenimiento, { as: 'obrasYMantenimientos', foreignKey: 'planMaestroId' });
    this.hasOne(models.Planeacion, { as: 'planeaciones', foreignKey: 'planMaestroId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLAN_MAESTRO_TABLE,
      modelName: 'PlanMaestro',
      timestamps: false,
    };
  }
}

module.exports = {
  PLAN_MAESTRO_TABLE,
  PlanMaestroSchema,
  PlanMaestro,
};
