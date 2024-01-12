const { Model, DataTypes, Sequelize } = require('sequelize');
const { DATO_DEL_PROYECTO_TABLE } = require('./datosDelProyecto');

const ESPACIO_DE_EQIPAMIENTO_TABLE = 'espacios_de_equipamento';

const EspacioDeEquipamientoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  datosDelProyectoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'datos_del_proyecto_id',
    references: {
      model: DATO_DEL_PROYECTO_TABLE,
      key: 'id',
    },
  },
  nombre: {
    type: DataTypes.STRING,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  metrosCuadrados: {
    type: DataTypes.INTEGER,
    field: 'metros_cuadrados',
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

class EspacioDeEquipamento extends Model {
  static associate(models) {
    this.belongsTo(models.DatosDelProyecto, { as: 'datosDelProyecto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESPACIO_DE_EQIPAMIENTO_TABLE,
      modelName: 'EspacioDeEquipamento',
      timestamps: false,
    };
  }
}

module.exports = {
  ESPACIO_DE_EQIPAMIENTO_TABLE,
  EspacioDeEquipamientoSchema,
  EspacioDeEquipamento,
};
