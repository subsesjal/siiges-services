const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_CERTIFICADOS_TABLE = 'tipo_certificados';

const TipoCertificadosSchema = {

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

class TipoCertificados extends Model {
  static associate(models) {
    this.hasOne(models.SolicitudFolios, { as: 'solicitudFolios', foreignKey: 'tipoCertificadosId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_CERTIFICADOS_TABLE,
      modelName: 'TipoCertificados',
      timespamps: false,
    };
  }
}

module.exports = {
  TIPO_CERTIFICADOS_TABLE,
  TipoCertificadosSchema,
  TipoCertificados,
};
