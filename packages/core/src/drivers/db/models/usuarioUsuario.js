const { Model, DataTypes, Sequelize } = require('sequelize');

const USUARIO_USUARIO_TABLE = 'usuario_usuarios';

const UsuarioUsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  principalId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'principal_id',
  },
  secundarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'secundario_id',
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

class UsuarioUsuario extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_USUARIO_TABLE,
      modelName: 'UsuarioUsuario',
      timestamps: false,
    };
  }
}

module.exports = { USUARIO_USUARIO_TABLE, UsuarioUsuarioSchema, UsuarioUsuario };
