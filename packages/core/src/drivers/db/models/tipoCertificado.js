const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_CERTIFICADO_TABLE = 'tipo_certificado';

const TipoCertificadoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  nombre: {
    allowNull: false,
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

class TipoCertificado extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_CERTIFICADO_TABLE,
      modelName: 'TipoCertificado',
      timestamps: false,
    };
  }
}

module.exports = { TIPO_CERTIFICADO_TABLE, TipoCertificadoSchema, TipoCertificado };