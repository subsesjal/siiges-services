const { checkers } = require('@siiges-services/shared');

const findOneSolicitudFolioAlumno = (findOneSolicitudFolioAlumnoQuery) => async ({ id }) => {
  const include = [
    {
      association: 'folioDocumentoAlumno',
      attributes: ['folioDocumento'],
    },
    {
      association: 'alumno',
      include: [
        {
          association: 'persona',
          attributes: [
            'nombre',
            'apellidoPaterno',
            'apellidoMaterno',
            'curp',
          ],
        },
        {
          association: 'programa',
          attributes: ['nombre', 'acuerdo_rvoe'],
          include: [
            {
              association: 'nivel',
              attributes: ['nombre'],
            },
            {
              association: 'plantel',
              attributes: ['clave_centro_trabajo'],
              include: [
                {
                  association: 'domicilio',
                  attributes: [
                    'calle',
                    'numero_exterior',
                    'numero_interior',
                    'colonia',
                  ],
                },
                {
                  association: 'institucion',
                  attributes: ['nombre'],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const solicitud = await findOneSolicitudFolioAlumnoQuery(
    { id },
    { include },
  );

  checkers.throwErrorIfDataIsFalsy(
    solicitud,
    'solicitudes-folios-alumnos',
    id,
  );

  return solicitud;
};

module.exports = findOneSolicitudFolioAlumno;
