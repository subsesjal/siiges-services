const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLAN_MAESTRO_TABLE } = require('./planMaestro');
const { CONTRATO_TABLE } = require('./contrato');

const PROYECTO_TABLE = 'proyectos';

const ProyectoSchema = {
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
  contratoId: {
    field: 'contrato_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CONTRATO_TABLE,
      key: 'id',
    },
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  montoAutorizado: {
    type: DataTypes.INTEGER,
    field: 'monto_autorizado',
  },
  montoContratado: {
    type: DataTypes.INTEGER,
    field: 'monto_contratado',
  },
  montoNoContratado: {
    type: DataTypes.INTEGER,
    field: 'monto_no_contratado',
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

class Proyecto extends Model {
  static associate(models) {
    this.belongsTo(models.PlanMaestro, { as: 'planMaestro' });
    this.hasMany(models.ProyectoEspacio, {
      as: 'proyectoEspacio',
      foreignKey: 'proyectoId',
    });
    this.belongsTo(models.Contrato, { as: 'contrato', foreignKey: 'contratoId' });
    this.hasMany(models.ProyectoTipoProyecto, { as: 'proyectoTipoProyecto', foreignKey: 'proyectoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROYECTO_TABLE,
      modelName: 'Proyecto',
      timestamps: false,
    };
  }
}

module.exports = {
  PROYECTO_TABLE,
  ProyectoSchema,
  Proyecto,
};
