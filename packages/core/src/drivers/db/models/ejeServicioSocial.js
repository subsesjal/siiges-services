const { Model, DataTypes, Sequelize } = require('sequelize');
const { DIMENSION_SERVICIO_SOCIAL_TABLE } = require('./dimensionServicioSocial');

const EJE_SERVICIO_SOCIAL_TABLE = 'ejes_servicio_social';

const EjeServicioSocialSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  dimensionServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'dimension_servicio_social_id',
    references: {
      model: DIMENSION_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
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

class EjeServicioSocial extends Model {
  static associate(models) {
    this.belongsTo(models.DimensionServicioSocial, { as: 'dimensionServicioSocial' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EJE_SERVICIO_SOCIAL_TABLE,
      modelName: 'EjeServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  EJE_SERVICIO_SOCIAL_TABLE,
  EjeServicioSocialSchema,
  EjeServicioSocial,
};
