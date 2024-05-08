const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_CERTIFICADO_TABLE = 'estatus_certificado';

const estatusCertificadoSchema = {
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

class estatusCertificado extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_CERTIFICADO_TABLE,
      modelName: 'estatusCertificado',
      timestamps: false,
    };
  }
}

module.exports = { ESTATUS_CERTIFICADO_TABLE, estatusCertificadoSchema, estatusCertificado };
