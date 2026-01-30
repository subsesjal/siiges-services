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

  const TIPO_DOCUMENTO_NOMBRE = {
    titulo: 'Título',
    certificado: 'Certificado',
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
        {
          association: 'programa',
          include: [{ association: 'nivel' }],
        },
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
      include: [
        {
          association: 'fundamentoServicioSocial',
        },
        {
          association: 'solicitudFolio',
          include: [{ association: 'tipoSolicitudFolio' }],
        },
      ],
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
    Solicitud_Folio_Alumno_Id: item?.solicitudFolioAlumno?.id,
    CURP: item?.alumno?.persona?.curp,
    Nombre: item.alumno?.persona?.nombre,
    Apellido_Paterno: item.alumno?.persona?.apellidoPaterno,
    Apellido_Materno: item.alumno?.persona?.apellidoMaterno,
    Correo_Electronico: item.alumno?.persona?.correoPrimario,
    Nombre_Carrera: item.alumno?.programa?.nombre,
    Fecha_Inicio: formatearFecha(item?.solicitudFolioAlumno?.fechaInicio),
    Fecha_Terminacion: formatearFecha(item?.solicitudFolioAlumno?.fechaTerminacion),
    Fecha_Elaboracion: formatearFecha(item?.solicitudFolioAlumno?.fechaElaboracion),
    Fecha_Registro: formatearFecha(item?.createdAt),
    Institucion_Procedencia: item.alumno?.validacion?.nombreInstitucionEmisora,
    Nivel_Estudio_Nombre: item.alumno?.programa?.nivel?.descripcion,
    Estado_Nombre: item.alumno?.validacion?.estado?.nombre,
    Antecedentes_Fecha_Inicio: formatearFecha(item.alumno?.validacion?.fechaInicioAntecedente),
    Antecedentes_Fecha_Terminacion: formatearFecha(item.alumno?.validacion?.fechaFinAntecedente),
    Numero_Cedula: item.alumno?.validacion?.cedulaProfesional,
    Fecha_Expedicion: formatearFecha(item?.solicitudFolioAlumno?.fechaExpedicion),
    Folio_Institucion: '',
    Folio_Documento: item?.folioDocumento,
    Foja: item?.foja?.nombre,
    Libro: item?.libro?.nombre,
    RVOE: item?.alumno?.programa?.acuerdoRvoe,
    Tipo_Certificado: item?.solicitudFolioAlumno?.solicitudFolio?.tipoSolicitudFolio?.descripcion,
    Tipo_Documento: TIPO_DOCUMENTO_NOMBRE[query.tipoDocumento] || query.tipoDocumento,
    Fecha_Examen_Profesional: formatearFecha(item?.solicitudFolioAlumno?.fechaExamenProfesional),
    Cumplio_Servicio_Social: item?.solicitudFolioAlumno?.cumplioServicioSocial ? 'Si' : 'No',
    Fundamento_Legal_Servicio_Social: item?.solicitudFolioAlumno?.fundamentoServicioSocial?.nombre,
  }));

  return mapped;
};

module.exports = reportFolioDocumentoAlumno;
