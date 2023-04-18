const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCIONES_APARTADOS_TABLE = 'inspecciones_apartados';

const inspeccionesApartadosSchema = {
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
  tipo_apartado: {
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

class inspeccionApartados extends Model {
  static associate(models) {
    this.hasMany(models.inspeccionesApartado, { as: 'inspeccionesApartado', foreignKey: 'inspeccionesApartadoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_APARTADOS_TABLE,
      modelName: 'inspeccionesApartadosSchema',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCIONES_APARTADOS_TABLE, inspeccionesApartadosSchema, inspeccionApartados };
