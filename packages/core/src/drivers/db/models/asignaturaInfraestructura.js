const { Model, DataTypes, Sequelize } = require('sequelize');
const { ASIGNATURA_TABLE } = require('./asignatura');
const { INFRAESTRUCTURA_TABLE } = require('./infraestructura');

const ASIGNATURA_INFRAESTRUCTURA_TABLE = 'asignaturas_infraestructuras';

const AsignaturaInfraestructuraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  asignaturaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_id',
    references: {
      model: ASIGNATURA_TABLE,
      key: 'id',
    },
  },
  infraestructuraId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'infraestructura_id',
    references: {
      model: INFRAESTRUCTURA_TABLE,
      key: 'id',
    },
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

class AsignaturaInfraestructura extends Model {
  static associate(models) {
    this.belongsTo(models.Asignatura, { as: 'asignatura' });
    this.belongsTo(models.Infraestructura, { as: 'infraestructura' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNATURA_INFRAESTRUCTURA_TABLE,
      modelName: 'AsignaturaInfraestructura',
      timestamps: false,
    };
  }
}

module.exports = {
  ASIGNATURA_INFRAESTRUCTURA_TABLE,
  AsignaturaInfraestructuraSchema,
  AsignaturaInfraestructura,
};
