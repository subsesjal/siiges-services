const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSTITUCION_DESTINO_TABLE } = require('./institucionDestino');
const { PROGRAMA_TABLE } = require('./programa');

const INSTITUCION_DESTINO_PROGRAMA_TABLE = 'instituciones_destino_programas';

const InstitucionDestinoProgramaSchema = {
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
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  institucionDestinoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'institucion_destino_id',
    references: {
      model: INSTITUCION_DESTINO_TABLE,
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

class InstitucionDestinoPrograma extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.InstitucionDestino, { as: 'institucionDestino' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSTITUCION_DESTINO_PROGRAMA_TABLE,
      modelName: 'InstitucionDestinoPrograma',
      timestamps: false,
    };
  }
}

module.exports = {
  INSTITUCION_DESTINO_PROGRAMA_TABLE,
  InstitucionDestinoProgramaSchema,
  InstitucionDestinoPrograma,
};
