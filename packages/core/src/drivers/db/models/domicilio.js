const { Model, DataTypes, Sequelize } = require('sequelize');
const { ESTADO_TABLE } = require('./estado');
const { MUNICIPIO_TABLE } = require('./municipio');

const DOMICILIO_TABLE = 'domicilios';

const DomicilioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  municipioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'municipio_id',
    references: {
      model: MUNICIPIO_TABLE,
      key: 'id',
    },
  },
  estadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estado_id',
    references: {
      model: ESTADO_TABLE,
      key: 'id',
    },
  },
  calle: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  numeroExterior: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'numero_exterior',
  },
  numeroInterior: {
    type: DataTypes.STRING,
    field: 'numero_interior',
  },
  colonia: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  codigoPostal: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'codigo_postal',
  },
  latitud: {
    type: DataTypes.STRING,
  },
  longitud: {
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

class Domicilio extends Model {
  static associate(models) {
    this.belongsTo(models.Municipio, { as: 'municipio' });
    this.belongsTo(models.Estado, { as: 'estado' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DOMICILIO_TABLE,
      modelName: 'Domicilio',
      timestamps: false,
    };
  }
}

module.exports = { DOMICILIO_TABLE, DomicilioSchema, Domicilio };
