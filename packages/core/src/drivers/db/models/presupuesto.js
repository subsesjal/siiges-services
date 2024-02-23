const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_PRESUPUESTO_TABLE } = require('./tipoPresupuesto');
const { TIPO_RECURSO_PRESUPUESTO_TABLE } = require('./tipoRecursoPresupuesto');
const { TIPO_EGRESO_TABLE } = require('./tipoEgreso');
const { PRESUPUESTO_EGRESO_TABLE } = require('./presupuestoEgreso');

const PRESUPUESTO_TABLE = 'presupuestos';

const PresupuestoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  presupuestoEgresoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'presupuesto_egreso_id',
    references: {
      model: PRESUPUESTO_EGRESO_TABLE,
      key: 'id',
    },
  },
  tipoRecursoPresupuestoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_recurso_presupuesto_id',
    references: {
      model: TIPO_RECURSO_PRESUPUESTO_TABLE,
      key: 'id',
    },
  },
  tipoPresupuestoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_presupuesto_id',
    references: {
      model: TIPO_PRESUPUESTO_TABLE,
      key: 'id',
    },
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
  cantidad: {
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

class Presupuesto extends Model {
  static associate(models) {
    this.belongsTo(models.PresupuestoEgreso, { as: 'presupuestoEgreso' });
    this.belongsTo(models.TipoRecursoPresupuesto, {
      as: 'tipoRecursoPresupuesto',
    });
    this.belongsTo(models.TipoPresupuesto, {
      as: 'tipoPresupuesto',
    });
    this.belongsTo(models.TipoEgreso, {
      as: 'tipoEgreso',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRESUPUESTO_TABLE,
      modelName: 'Presupuesto',
      timespamps: false,
    };
  }
}

module.exports = {
  PRESUPUESTO_TABLE,
  PresupuestoSchema,
  Presupuesto,
};
