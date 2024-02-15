const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_EGRESO_TABLE } = require('./tipoEgreso');
const { PRESUPUESTO_TABLE } = require('./presupuesto');
const { INSTITUCION_TABLE } = require('./institucion');
const { SESION_TABLE } = require('./sesion');
const { PERIODO_TABLE } = require('./periodo');

const PRESUPUESTO_EGRESO_TABLE = 'presupuestos_egresos';

const PresupuestoEgresoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoEgresoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_egreso_id',
    references: {
      model: TIPO_EGRESO_TABLE,
      key: 'id',
    },
  },
  presupuestoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'presupuesto_id',
    references: {
      model: PRESUPUESTO_TABLE,
      key: 'id',
    },
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

class PresupuestoEgreso extends Model {
  static associate(models) {
    this.belongsTo(models.Sesion, { as: 'sesion' });
    this.belongsTo(models.Periodo, { as: 'periodo' });
    this.belongsTo(models.Presupuesto, { as: 'presupuesto' });
    this.belongsTo(models.TipoEgreso, { as: 'tipoEgreso' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRESUPUESTO_EGRESO_TABLE,
      modelName: 'PresupuestoEgreso',
      timespamps: false,
    };
  }
}

module.exports = {
  PRESUPUESTO_EGRESO_TABLE,
  PresupuestoEgresoSchema,
  PresupuestoEgreso,
};
