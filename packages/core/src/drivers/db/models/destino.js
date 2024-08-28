const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_INSTITUCION_TABLE } = require('./tipoInstitucion');
const { PROGRAMA_TABLE } = require('./programa');

const INSTITUCION_DESTINO_TABLE = 'instituciones_destino';

const InstitucionDestinoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipointitucionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipointitucion_id',
    references: {
      model: TIPO_INSTITUCION_TABLE,
      key: 'id',
    },
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
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  RVOE: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  nombreCarrera: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_carrera',
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

class InstitucionDestino extends Model {
  static associate(models) {
    this.belongsTo(models.TipoInstitucion, { as: 'tipointitucion' });
    this.belongsTo(models.Programa, { as: 'programa' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSTITUCION_DESTINO_TABLE,
      modelName: 'InstitucionDestino',
      timestamps: false,
    };
  }
}

module.exports = {
  INSTITUCION_DESTINO_TABLE,
  InstitucionDestinoSchema,
  InstitucionDestino,
};
