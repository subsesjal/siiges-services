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
    type: DataTypes.STRING,
    field: 'primer_nombre',
  },
  segundoNombre: {
    type: DataTypes.STRING,
    field: 'segundo_nombre',
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    field: 'apellido_paterno',
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
    field: 'apellido_materno',
  },
  curpFirmante: {
    type: DataTypes.STRING,
    field: 'curp_firmante',
  },
  cargo: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'cargo',
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
