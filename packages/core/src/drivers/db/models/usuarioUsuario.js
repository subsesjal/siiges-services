const { Model, DataTypes, Sequelize } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario');

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
    references: {
      model: USUARIO_TABLE,
      key: 'id',
    },
  },
  secundarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'secundario_id',
    references: {
      model: USUARIO_TABLE,
      key: 'id',
    },
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
  static associate(models) {
    this.belongsTo(models.Usuario, { as: 'principal', foreignKey: 'principalId' });
    this.belongsTo(models.Usuario, { as: 'secundario', foreignKey: 'secundarioId' });
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
