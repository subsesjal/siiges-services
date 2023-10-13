const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');
const { TIPO_INSTALACION_TABLE } = require('./tipoInstalacion');

const INFRAESTRUCTURA_TABLE = 'infraestructuras';

const InfraestructuraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  plantelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'plantel_id',
    references: {
      model: PLANTEL_TABLE,
      key: 'id',
    },
  },
  tipoInstalacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_instalacion_id',
    references: {
      model: TIPO_INSTALACION_TABLE,
      key: 'id',
    },
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ubicacion: {
    type: DataTypes.STRING,
  },
  capacidad: {
    type: DataTypes.INTEGER,
  },
  metros: {
    type: DataTypes.INTEGER,
  },
  recursos: {
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

class Infraestructura extends Model {
  static associate(models) {
    this.belongsTo(models.Plantel, { as: 'plantel' });
    this.belongsTo(models.TipoInstalacion, { as: 'tipoInstalacion' });
    this.hasMany(models.AsignaturaInfraestructura, { as: 'asignaturasInfraestructura', foreignKey: 'infraestructuraId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INFRAESTRUCTURA_TABLE,
      modelName: 'Infraestructura',
      timestamps: false,
    };
  }
}

module.exports = { INFRAESTRUCTURA_TABLE, InfraestructuraSchema, Infraestructura };
