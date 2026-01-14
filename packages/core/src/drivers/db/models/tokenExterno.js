const { Model, DataTypes, Sequelize } = require('sequelize');

const TOKEN_EXTERNO_TABLE = 'tokens_externos';

const TokenExternoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  servicio: {
    allowNull: false,
    type: DataTypes.STRING,
    comment: 'Identificador del servicio externo (ej: firma_certificado)',
  },
  accessToken: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'access_token',
    comment: 'Token de acceso del servicio externo',
  },
  tokenType: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'token_type',
    defaultValue: 'bearer',
  },
  expiresIn: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'expires_in',
    comment: 'Tiempo de expiración del token',
  },
  fechaObtencion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_obtencion',
    defaultValue: Sequelize.NOW,
  },
  fechaExpiracion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_expiracion',
  },
  activo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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

class TokenExterno extends Model {
  static associate() {
    // No tiene relaciones con otras tablas
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TOKEN_EXTERNO_TABLE,
      modelName: 'TokenExterno',
      timestamps: false,
    };
  }
}

module.exports = { TOKEN_EXTERNO_TABLE, TokenExternoSchema, TokenExterno };
