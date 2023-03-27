const { Model, DataTypes, Sequelize } = require('sequelize');

const SECCION_TABLE = 'secciones';

const SeccionSchema = {
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
    allowNull: false,
    type: DataTypes.STRING,
  },
  modulo: {
    allowNull: false,
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

class Seccion extends Model {
  static associate(models) {
    this.hasMany(models.SolicitudSeccion, { as: 'solicitudesSecciones', foreignKey: 'seccionId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SECCION_TABLE,
      modelName: 'Seccion',
      timestamps: false,
    };
  }
}

module.exports = { SECCION_TABLE, SeccionSchema, Seccion };
