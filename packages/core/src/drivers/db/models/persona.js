const { Model, DataTypes, Sequelize } = require('sequelize');
const { DOMICILIO_TABLE } = require('./domicilio');

const PERSONA_TABLE = 'personas';

const PersonaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  domicilioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'domicilio_id',
    references: {
      model: DOMICILIO_TABLE,
      key: 'id',
    },
    defaultValue: 1,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellidoPaterno: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'apellido_paterno',
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
    field: 'apellido_materno',
  },
  fechaNacimiento: {
    type: DataTypes.DATE,
    field: 'fecha_nacimiento',
  },
  sexo: {
    type: DataTypes.STRING,
  },
  nacionalidad: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  celular: {
    type: DataTypes.STRING,
  },
  curp: {
    type: DataTypes.STRING,
  },
  rfc: {
    type: DataTypes.STRING,
  },
  ine: {
    type: DataTypes.STRING,
  },
  fotografia: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'uploads/photos/img-usuario.png',
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

class Persona extends Model {
  static associate(models) {
    this.belongsTo(models.Domicilio, { as: 'domicilio' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSONA_TABLE,
      modelName: 'Persona',
      timestamps: false,
    };
  }
}

module.exports = { PERSONA_TABLE, PersonaSchema, Persona };
