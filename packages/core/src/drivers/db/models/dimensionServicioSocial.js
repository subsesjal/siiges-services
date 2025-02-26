const { Model, DataTypes, Sequelize } = require('sequelize');

const DIMENSION_SERVICIO_SOCIAL_TABLE = 'dimensiones_servicio_social';

const DimensionServicioSocialSchema = {
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

class DimensionServicioSocial extends Model {
  static associate(models) {
    this.hasMany(models.EjeServicioSocial, { as: 'ejeServicioSocial', foreignKey: 'dimensionServicioSocialId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DIMENSION_SERVICIO_SOCIAL_TABLE,
      modelName: 'DimensionServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  DIMENSION_SERVICIO_SOCIAL_TABLE,
  DimensionServicioSocialSchema,
  DimensionServicioSocial,
};
