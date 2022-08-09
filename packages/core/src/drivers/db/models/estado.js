const { Model, DataTypes, Sequelize } = require('sequelize');
const { PAIS_TABLE } = require('./pais');

const ESTADO_TABLE = 'estados';

const EstadoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  paisId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'pais_id',
    references: {
      model: PAIS_TABLE,
      key: 'id',
    },
  },
  nombre: {
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

class Estado extends Model {
  static associate(models) {
    this.belongsTo(models.Pais, { as: 'pais' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTADO_TABLE,
      modelName: 'Estado',
      timestamps: false,
    };
  }
}

module.exports = { ESTADO_TABLE, EstadoSchema, Estado };
