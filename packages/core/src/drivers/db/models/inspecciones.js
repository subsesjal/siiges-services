const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCIONES_TABLE = 'inspecciones';

const inspeccionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programa_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  estatus_inspeccion_id: {
    type: DataTypes.INTEGER,
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  fecha_asignada: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  resultado: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  folio: {
    allowNull: false,
    type: DataTypes.INTEGER,
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

class inspeccion extends Model {
  static associate(models) {
    this.hasMany(models.inspecciones, { as: 'inspecciones', foreignKey: 'inspeccionesId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_TABLE,
      modelName: 'inspecciones',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCIONES_TABLE, inspeccionesSchema, inspeccion };
