const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');
const { SOLICITUD_TABLE } = require('./solicitud');

const INFRAESTRUCTURA_TABLE = 'Infraestructura';

const InfraestructuraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  plantelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'Plantel_id',
    references: {
      model: PLANTEL_TABLE,
      key: 'id',
    },
  },
  solicitudId: {
    type: DataTypes.INTEGER,
    field: 'solicitud_id',
    references: {
      model: SOLICITUD_TABLE,
      key: 'id',
    },
  },
  TIPO_INSTALACION_Id: {
    type: DataTypes.INTEGER,
    field: 'infraestructura_id',
    references: {
      model: INFRAESTRUCTURA_TABLE,
      key: 'id',
    },
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ubicacion: {
    type: DataTypes.STRING,
  },
  capacidad: {
    type: DataTypes.INTEGER,
  },
  metros: {
    type: DataTypes.INTEGER,
  },
  recursos: {
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

class Infraestructura extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INFRAESTRUCTURA_TABLE,
      modelName: 'Infraestructura',
      timestamps: false,
    };
  }
}

module.exports = {
  INFRAESTRUCTURA_TABLE,
  InfraestructuraSchema,
  Infraestructura,
  PLANTEL_TABLE,
};
