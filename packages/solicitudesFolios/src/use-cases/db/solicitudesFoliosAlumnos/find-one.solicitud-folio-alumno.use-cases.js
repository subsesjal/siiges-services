const { checkers } = require('@siiges-services/shared');

const findOneSolicitudFolioAlumno = (findOneSolicitudFolioAlumnoQuery) => async ({ id }) => {
  const include = [
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

  const alumno = await findOneSolicitudFolioAlumnoQuery({ id }, { include });
  checkers.throwErrorIfDataIsFalsy(alumno, 'solicitudes-folios-alumnos', id);

  return alumno;
};

module.exports = findOneSolicitudFolioAlumno;
