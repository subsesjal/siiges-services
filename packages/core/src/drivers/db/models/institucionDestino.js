const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_INSTITUCION_TABLE } = require('./tipoInstitucion');

const INSTITUCION_DESTINO_TABLE = 'instituciones_destino';

const InstitucionDestinoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoInstitucionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_institucion_id',
    references: {
      model: TIPO_INSTITUCION_TABLE,
      key: 'id',
    },
  },
  nombre: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  acuerdoRvoe: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'acuerdo_rvoe',
  },
  nombreCarrera: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'nombre_carrera',
  },
  nivel: {
    allowNull: true,
    type: DataTypes.STRING,
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
    this.belongsTo(models.TipoInstitucion, { as: 'tipoInstitucion' });
    this.hasOne(models.InstitucionDestinoPrograma, { as: 'institucionDestinoPrograma', foreignKey: 'institucionDestinoId' });
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
