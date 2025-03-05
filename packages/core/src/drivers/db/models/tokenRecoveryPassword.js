const { Model, DataTypes, Sequelize } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario');

const TOKEN_RECOVERY_PASSWORD_TABLE = 'token_recovery_password';

const TokenRecoveryPasswordSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  usuarioId: {
    field: 'usuario_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USUARIO_TABLE,
      key: 'id',
    },
  },
  token: {
    type: DataTypes.STRING,
  },
  expiresAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'expires_at',
    defaultValue: null,
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    field: 'is_used',
    allowNull: false,
    defaultValue: false,
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

class TokenRecoveryPassword extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { as: 'usuario' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TOKEN_RECOVERY_PASSWORD_TABLE,
      modelName: 'TokenRecoveryPassword',
      timestamps: false,
    };
  }
}

module.exports = {
  TOKEN_RECOVERY_PASSWORD_TABLE,
  TokenRecoveryPasswordSchema,
  TokenRecoveryPassword,
};
