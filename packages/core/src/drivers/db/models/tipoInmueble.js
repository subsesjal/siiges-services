const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_INMUEBLE_TABLE = 'tipo_inmuebles';

const TipoInmuebleSchema = {
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

class TipoInmueble extends Model {
  static associate(models) {
    this.hasOne(models.Plantel, {
      as: 'plantel',
      foreignKey: 'tipoInmuebleId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_INMUEBLE_TABLE,
      modelName: 'TipoInmueble',
      timestamps: false,
    };
  }
}

module.exports = { TIPO_INMUEBLE_TABLE, TipoInmuebleSchema, TipoInmueble };
