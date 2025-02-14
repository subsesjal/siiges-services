const { Model, DataTypes, Sequelize } = require('sequelize');

const MODALIDAD_SERVICIO_SOCIAL_TABLE = 'modalidades_servicio_social';

const ModalidadServicioSocialSchema = {
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

class ModalidadServicioSocial extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MODALIDAD_SERVICIO_SOCIAL_TABLE,
      modelName: 'ModalidadServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  MODALIDAD_SERVICIO_SOCIAL_TABLE,
  ModalidadServicioSocialSchema,
  ModalidadServicioSocial,
};
