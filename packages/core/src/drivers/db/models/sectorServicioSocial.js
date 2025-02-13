const { Model, DataTypes, Sequelize } = require('sequelize');

const SECTOR_SERVICIO_SOCIAL_TABLE = 'sectores_servicio_social';

const SectorServicioSocialSchema = {
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

class SectorServicioSocial extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SECTOR_SERVICIO_SOCIAL_TABLE,
      modelName: 'SectorServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  SECTOR_SERVICIO_SOCIAL_TABLE,
  SectorServicioSocialSchema,
  SectorServicioSocial,
};
