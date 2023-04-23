const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { ESTATUS_INSPECCION_TABLE } = require('./estatusInspeccion');

const INSPECCION_TABLE = 'inspecciones';

const InspeccionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  estatusInspeccionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_inspeccion_id',
    references: {
      model: ESTATUS_INSPECCION_TABLE,
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATE,
  },
  fechaAsignada: {
    type: DataTypes.DATE,
    field: 'fecha_asignada',
  },
  resultado: {
    type: DataTypes.STRING,
  },
  folio: {
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

class Inspeccion extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.EstatusInspeccion, { as: 'estatusInspeccion' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_TABLE,
      modelName: 'Inspeccion',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_TABLE, InspeccionSchema, Inspeccion };
