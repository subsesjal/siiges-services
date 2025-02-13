const { Model, DataTypes, Sequelize } = require('sequelize');
const { DIMENSIONES_SERVICIO_SOCIAL_TABLE } = require('./dimensionesServicioSocial');

const EJES_SERVICIO_SOCIAL_TABLE = 'ejes_servicio_social';

const EjesServicioSocialSchema = {
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
      model: DIMENSIONES_SERVICIO_SOCIAL_TABLE,
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

class EjesServicioSocial extends Model {
  static associate(models) {
    this.belongsTo(models.DimensionesServicioSocial, { foreignKey: 'dimension_servicio_social_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EJES_SERVICIO_SOCIAL_TABLE,
      modelName: 'EjesServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  EJES_SERVICIO_SOCIAL_TABLE,
  EjesServicioSocialSchema,
  EjesServicioSocial,
};
