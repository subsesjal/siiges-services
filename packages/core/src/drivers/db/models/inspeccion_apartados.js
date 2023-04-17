const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCION_APARTADOS_TABLE = 'apartado';

const apartadoSchema = {
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

class apartado extends Model {
  static associate(models) {
    this.hasMany(models.inspeccion_apartado, { as: 'apartado', foreignKey: 'apartadoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_APARTADOS_TABLE,
      modelName: 'inspeccion_apartado',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_APARTADOS_TABLE, apartadoSchema, apartado };
