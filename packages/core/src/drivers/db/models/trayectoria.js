const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');

const TRAYECTORIA_TABLE = 'trayectorias';

const TrayectoriaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    unique: true,
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  programaSeguimiento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'programa_seguimiento',
  },
  tipoTutoria: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'tipo_tutoria',
  },
  estadisticasTitulacion: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'estadisticas_titulacion',
  },
  funcionTutorial: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'funcion_tutorial',
  },
  modalidadesTitulacion: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'modalidades_titulacion',
  },
  tasaEgreso: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'tasa_egreso',
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

class Trayectoria extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TRAYECTORIA_TABLE,
      modelName: 'Trayectoria',
      timestamps: false,
    };
  }
}

module.exports = { TRAYECTORIA_TABLE, TrayectoriaSchema, Trayectoria };
