const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');
const { ROL_TABLE } = require('./rol');

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  rolId: {
    field: 'rol_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ROL_TABLE,
      key: 'id',
    },
  },
  personaId: {
    field: 'persona_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PERSONA_TABLE,
      key: 'id',
    },
  },
  usuario: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  correo: {
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

class Usuario extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
    this.belongsTo(models.Rol, { as: 'rol' });
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
