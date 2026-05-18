const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');

const FIRMANTE_TABLE = 'firmantes';

const FirmanteSchema = {
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
  primerNombre: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'primer_nombre',
    defaultValue: null,
  },
  segundoNombre: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'segundo_nombre',
    defaultValue: null,
  },
  apellidoPaterno: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'apellido_paterno',
    defaultValue: null,
  },
  apellidoMaterno: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'apellido_materno',
    defaultValue: null,
  },
  curpFirmante: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'curp_firmante',
    defaultValue: null,
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

class Firmante extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa', foreignKey: 'programaId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FIRMANTE_TABLE,
      modelName: 'Firmante',
      timestamps: false,
    };
  }
}

module.exports = { FIRMANTE_TABLE, FirmanteSchema, Firmante };
