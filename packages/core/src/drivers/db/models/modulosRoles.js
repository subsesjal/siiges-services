const { Model, DataTypes, Sequelize } = require('sequelize');
const { MODULO_TABLE } = require('./modulos');
const { ROL_TABLE } = require('./rol');

const MODULO_ROL_TABLE = 'modulos_roles';

const ModuloRolSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  moduloId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'modulo_id',
    references: {
      model: MODULO_TABLE,
      key: 'id',
    },
  },
  rolId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'rol_id',
    references: {
      model: ROL_TABLE,
      key: 'id',
    },
  },
  accion: {
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: '1=Ver propios, 2=Ver Todo, 3=Ver detalles, 4=Crear, 5=Editar, 6=Eliminar',
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

class ModuloRol extends Model {
  static associate(models) {
    this.belongsTo(models.Modulo, { as: 'modulo' });
    this.belongsTo(models.Rol, { as: 'rol' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MODULO_ROL_TABLE,
      modelName: 'ModuloRol',
      timestamps: false,
    };
  }
}

module.exports = { MODULO_ROL_TABLE, ModuloRolSchema, ModuloRol };
