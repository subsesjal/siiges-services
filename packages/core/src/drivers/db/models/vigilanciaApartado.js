const { Model, DataTypes, Sequelize } = require('sequelize');

const VIGILANCIA_APARTADO_TABLE = 'vigilancia_apartados';

const VigilanciaApartadoSchema = {
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

class VigilanciaApartado extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANCIA_APARTADO_TABLE,
      modelName: 'VigilanciaApartado',
      timestamps: false,
    };
  }
}

module.exports = { VIGILANCIA_APARTADO_TABLE, VigilanciaApartadoSchema, VigilanciaApartado };
