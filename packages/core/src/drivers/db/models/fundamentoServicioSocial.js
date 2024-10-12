const { Model, DataTypes, Sequelize } = require('sequelize');

const FUNDAMENTO_SERVICIO_SOCIAL_TABLE = 'fundamentos_servicio_social';

const FundamentoServicioSocialSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
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

class FundamentoServicioSocial extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FUNDAMENTO_SERVICIO_SOCIAL_TABLE,
      modelName: 'FundamentoServicioSocial',
      timestamps: false,
    };
  }
}
module.exports = {
  FUNDAMENTO_SERVICIO_SOCIAL_TABLE,
  FundamentoServicioSocialSchema,
  FundamentoServicioSocial,
};
