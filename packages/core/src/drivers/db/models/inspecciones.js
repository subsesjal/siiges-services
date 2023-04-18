const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { ESTATUS_INSPECCIONES_TABLE } = require('./estatusInspecciones');

const INSPECCIONES_TABLE = 'inspecciones';

const InspeccionesSchema = {
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
  estatus_inspeccionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_inspeccion_id',
    references: {
      model: ESTATUS_INSPECCIONES_TABLE,
      key: 'id',
    },
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  fecha_asignada: {
    type: DataTypes.DATE,
  },
  resultado: {
    type: DataTypes.STRING,
  },
  folio: {
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

class Inspecciones extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.estatusinspecciones, { as: 'estatusInspecciones', foreignKey: 'estatusInspeccionesId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_TABLE,
      modelName: 'Inspecciones',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCIONES_TABLE, InspeccionesSchema, Inspecciones };
