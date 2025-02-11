const { Model, DataTypes, Sequelize } = require('sequelize');
const ESTATUS_ALUMNO_BECA_TABLE = 'estatus_alumnos_becas'; 

const EstatusAlumnoBecaSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre',
    },
    descripcion: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'descripcion',
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
class EstatusAlumnosBecas extends Model {
    static associate() {
      }
    
      static config(sequelize) {
        return {
          sequelize,
          tableName: ESTATUS_ALUMNO_BECA_TABLE,
          modelName: 'EstatusAlumnosBecas',
          timestamps: false,
        };
      }
}
module.exports = {ESTATUS_ALUMNO_BECA_TABLE, EstatusAlumnoBecaSchema, EstatusAlumnosBecas}