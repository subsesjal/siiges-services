const { Model, DataTypes, Sequelize } = require('sequelize');
const { MIXTA_NOESCOLARIZADA_TABLE } = require('./mixtaNoEscolarizadas');

const ESPEJO_TABLE = 'espejos';

const EspejoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  mixtaNoescolarizadaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'mixta_noescolarizada_id',
    references: {
      model: MIXTA_NOESCOLARIZADA_TABLE,
      key: 'id',
    },
  },
  proveedor: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  anchoBanda: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'ancho_banda',
  },
  ubicacion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  periodicidad: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  urlEspejo: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'url_espejo',
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

class Espejo extends Model {
  static associate(models) {
    this.belongsTo(models.MixtaNoescolarizada, { as: 'mixtaNoescolarizada' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESPEJO_TABLE,
      modelName: 'Espejo',
      timestamps: false,
    };
  }
}

module.exports = { ESPEJO_TABLE, EspejoSchema, Espejo };
