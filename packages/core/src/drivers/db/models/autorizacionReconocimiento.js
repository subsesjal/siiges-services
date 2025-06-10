const { Model, DataTypes, Sequelize } = require('sequelize');

const AUTORIZACION_RECONOCIMIENTO_TABLE = 'autorizacion_reconocimientos';

const AutorizacionReconocimientoSchema = {
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

class AutorizacionReconocimiento extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AUTORIZACION_RECONOCIMIENTO_TABLE,
      modelName: 'AutorizacionReconocimiento',
      timestamps: false,
    };
  }
}

module.exports = {
  AUTORIZACION_RECONOCIMIENTO_TABLE,
  AutorizacionReconocimientoSchema,
  AutorizacionReconocimiento,
};
