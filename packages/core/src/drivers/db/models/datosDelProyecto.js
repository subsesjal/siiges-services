const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLAN_MAESTRO_TABLE } = require('./planMaestro');

const DATO_DEL_PROYECTO_TABLE = 'datos_del_proyecto';

const DatosDelProyectoSchema = {
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
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  montoAutorizado: {
    type: DataTypes.INTEGER,
    field: 'monto_autorizado',
  },
  montoContratado: {
    type: DataTypes.INTEGER,
    field: 'monto_contratado',
  },
  montoEjercido: {
    type: DataTypes.INTEGER,
    field: 'monto_ejercido',
  },
  remanente: {
    type: DataTypes.INTEGER,
  },
  acciones: {
    type: DataTypes.STRING,
  },
  porcentajeDeAvance: {
    type: DataTypes.INTEGER,
    field: 'porcentaje_de_avance',
  },
  fechaRealInicio: {
    type: DataTypes.DATE,
    field: 'fecha_real_inicio',
  },
  fechaRealFin: {
    type: DataTypes.DATE,
    field: 'fecha_real_fin',
  },
  obeservaciones: {
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

class DatosDelProyecto extends Model {
  static associate(models) {
    this.belongsTo(models.PlanMaestro, { as: 'PlanMaestro' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DATO_DEL_PROYECTO_TABLE,
      modelName: 'DatosDelProyecto',
      timestamps: false,
    };
  }
}

module.exports = {
  DATO_DEL_PROYECTO_TABLE,
  DatosDelProyectoSchema,
  DatosDelProyecto,
};
