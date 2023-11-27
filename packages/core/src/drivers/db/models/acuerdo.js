const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORGANO_COLEGIADO_TABLE } = require('./organoColegiado');

const ACUERDO_TABLE = 'acuerdos';

const AcuerdoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  organoColegiadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'organo_colegiado_id',
    references: {
      model: ORGANO_COLEGIADO_TABLE,
      key: 'id',
    },
  },
  numero: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  estatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  descripcionSeguimiento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'descripcion_seguimiento',
  },
  fecha: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class Acuerdo extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACUERDO_TABLE,
      modelName: 'Acuerdo',
      timestamps: false,
    };
  }
}

module.exports = { ACUERDO_TABLE, AcuerdoSchema, Acuerdo };
