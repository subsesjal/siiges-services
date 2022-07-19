const { Model, DataTypes, Sequelize } = require('sequelize');

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  usuario: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  contrasena: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  estatus: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  tokenNotificaciones: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'token_notificaciones',
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

class Usuario extends Model {
  static associate() {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false,
    };
  }
}

module.exports = { USUARIO_TABLE, UsuarioSchema, Usuario };
