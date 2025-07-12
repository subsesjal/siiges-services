const { Op } = require('sequelize');

function formatearFecha(fechaString) {
  if (!fechaString) return '';

  const fecha = new Date(fechaString);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

const reportFolioDocumentoAlumno = (
  reportFolioDocumentoAlumnoQuery,
) => async (query = {}) => {
  const TIPO_DOCUMENTO = {
    titulo: 1,
    certificado: 2,
  };

  const include = [
    {
      association: 'alumno',
      include: [
        { association: 'persona' },
        {
          association: 'validacion',
          include: [
            { association: 'nivel' },
            { association: 'estado' },
          ],
        },
        { association: 'programa' },
      ],
    },
    {
      association: 'libro',
      where: {
        nombre: {
          [Op.eq]: query.libro,
        },
        tipoDocumentoId: {
          [Op.eq]: TIPO_DOCUMENTO[query.tipoDocumento],
        },
      },
    },
    {
      association: 'foja',
      where: {
        nombre: {
          [Op.between]: [query.fojaInicio, query.fojaFin],
        },
      },
    },
    {
      association: 'solicitudFolioAlumno',
      include: [{ association: 'fundamentoServicioSocial' }],
    },
  ];

  const solicitudes = await reportFolioDocumentoAlumnoQuery(
    { tipoDocumentoId: TIPO_DOCUMENTO[query.tipoDocumento] },
    {
      include,
      strict: true,
    },
  );

  const mapped = solicitudes.map((item) => ({
    id: item.id,
    CURP: item?.alumno?.persona?.curp,
    Nombre: item.alumno?.persona?.nombre,
    Apellido_Paterno: item.alumno?.persona?.apellidoPaterno,
    Apellido_Materno: item.alumno?.persona?.apellidoMaterno,
    Correo_Electronico: item.alumno?.persona?.correoPrimario,
    Nombre_Carrera: item.alumno?.programa?.nombre,
    Fecha_Inicio: formatearFecha(item?.solicitudFolioAlumno?.fechaInicio),
    Fecha_Terminacion: formatearFecha(item?.solicitudFolioAlumno?.fechaTerminacion),
    Institucion_Procedencia: item.alumno?.validacion?.nombreInstitucionEmisora,
    Nivel_Estudio_Nombre: item.alumno?.validacion?.nivel?.nombre,
    Estado_Nombre: item.alumno?.validacion?.estado?.nombre,
    Antecedentes_Fecha_Inicio: formatearFecha(item.alumno?.validacion?.fechaInicioAntecedente),
    Antecedentes_Fecha_Terminacion: formatearFecha(item.alumno?.validacion?.fechaFinAntecedente),
    Numero_Cedula: item.alumno?.validacion?.cedulaProfesional,
    Fecha_Expedicion: formatearFecha(item?.solicitudFolioAlumno?.fechaExpedicion),
    Folio: item?.folioDocumento,
    Fecha_Examen_Profesional: formatearFecha(item?.solicitudFolioAlumno?.fechaExamenProfesional),
    Cumplio_Servicio_Social: item?.solicitudFolioAlumno?.cumplioServicioSocial ? 'Si' : 'No',
    Fundamento_Legal_Servicio_Social: item?.solicitudFolioAlumno?.fundamentoServicioSocial?.nombre,
  }));

  return mapped;
};

module.exports = reportFolioDocumentoAlumno;
