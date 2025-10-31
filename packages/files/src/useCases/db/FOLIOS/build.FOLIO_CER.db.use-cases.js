const { checkers } = require('@siiges-services/shared');

const buildFileFOLIOCER = (
  findOneSolicitudFolioQuery,
  findSolicitudFolioAlumnoQuery,
  createPhpFile,
) => async (solicitudFolioId, tipoDocumento) => {
  const include = [
    { association: 'tipoSolicitudFolio' },
    { association: 'tipoDocumento' },
    { association: 'estatusSolicitudFolio' },
    {
      association: 'programa',
      include: [
        { association: 'nivel' },
        { association: 'modalidad' },
        { association: 'ciclo' },
        {
          association: 'plantel',
          include: [
            {
              association: 'institucion',
              include: [
                { association: 'ratificacionesNombre' },
                {
                  association: 'rector',
                  include: [{ association: 'persona' }],
                },
              ],
            },
            {
              association: 'domicilio',
              include: [
                { association: 'estado' },
                { association: 'municipio' },
              ],
            },
          ],
        },
      ],
    },
  ];

  const solicitudFolio = await findOneSolicitudFolioQuery(
    { id: solicitudFolioId },
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudFolio', solicitudFolioId);

  const alumnos = await findSolicitudFolioAlumnoQuery(
    { solicitudFolioId },
    {
      include: [
        {
          association: 'folioDocumentoAlumno',
          include: [
            { association: 'foja' },
            { association: 'libro' },
          ],
        },
        {
          association: 'alumno',
          include: [
            { association: 'persona' },
            {
              association: 'programa',
              include: [
                { association: 'nivel' },
                { association: 'modalidad' },
              ],
            },
          ],
        },
      ],
      strict: false,
    },
  );

  const data = solicitudFolio.toJSON();
  data.solicitudFoliosAlumnos = alumnos.map((a) => a.toJSON());

  const file = await createPhpFile(data, tipoDocumento);
  return Buffer.from(file);
};

module.exports = { buildFileFOLIOCER };
