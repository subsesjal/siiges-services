const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_INSPECCIONES_TABLE = 'estatus_inspecciones';

const estatusInspeccionesSchema = {
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

class estatusinspecciones extends Model {
  static associate(models) {
    this.hasMany(models.estatusInspecciones, { as: 'estatusinspecciones', foreignKey: 'estatusinspeccionesId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_INSPECCIONES_TABLE,
      modelName: 'estatusInspeccionesSchema',
      timestamps: false,
    };
  }
}

module.exports = { ESTATUS_INSPECCIONES_TABLE, estatusInspeccionesSchema, estatusinspecciones };
