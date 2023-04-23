const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCION_APARTADO_TABLE = 'inspeccion_apartados';

const InspeccionApartadoSchema = {
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
  tipoApartado: {
    type: DataTypes.STRING,
    field: 'tipo_apartado',
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

class InspeccionApartado extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_APARTADO_TABLE,
      modelName: 'InspeccionApartadoSchema',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_APARTADO_TABLE, InspeccionApartadoSchema, InspeccionApartado };
