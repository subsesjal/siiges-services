const tablaDomicilio = (solicitud) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '2. DOMICILIO DE LA INSTITUCIÓN', medida: 182, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'CALLE Y NÚMERO', medida: 121.4, color: 'naranja' },
      { texto: 'COLONIA', medida: 60.66, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: solicitud.programa.plantel.domicilio.calle, medida: 121.4, color: 'blanco' },
      { texto: solicitud.programa.plantel.domicilio.colonia, medida: 60.66, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'CÓDIGO POSTAL', medida: 60.66, color: 'naranja' },
      { texto: 'DELEGACIÓN O MUNICIPIO', medida: 60.66, color: 'naranja' },
      { texto: 'ENTIDAD FEDERATIVA', medida: 60.66, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: solicitud.programa.plantel.domicilio.codigoPostal.toString(), medida: 60.66, color: 'blanco' },
      { texto: solicitud.programa.plantel.domicilio.municipio.nombre, medida: 60.66, color: 'blanco' },
      { texto: solicitud.programa.plantel.domicilio.estado.nombre, medida: 60.66, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'NÚMERO TELEFÓNICO', medida: 60.66, color: 'naranja' },
      { texto: 'REDES SOCIALES', medida: 60.66, color: 'naranja' },
      { texto: 'CORREO ELECTRÓNICO', medida: 60.66, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: solicitud.programa.plantel.telefono1, medida: 60.66, color: 'blanco' },
      { texto: solicitud.programa.plantel.redesSociales == null ? 'sin dato' : solicitud.programa.plantel.redesSociales, medida: 60.66, color: 'blanco' },
      { texto: solicitud.programa.plantel.correo1, medida: 60.66, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];

const ciclos = {
  1: 'Semestral',
  2: 'Cuatrimestral',
  3: 'Anual',
  4: 'Semestral curriculum flexible',
  5: 'Cuatrimestral curriculum flexible',
};

const tablaDatosPlan = (solicitud, textoCiclos, modalidadTipo) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '1. DATOS DEL PLAN DE ESTUDIOS', medida: 182, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'NOMBRE DE LA INSTITUCIÓN', medida: 91, color: 'blanco' },
      { texto: solicitud.programa.plantel.institucion.nombre || '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'TIPO Y NOMBRE DEL PLAN DE ESTUDIOS', medida: 91, color: 'blanco' },
      {
        texto: `${ciclos[solicitud.programa.cicloId] || ''} ${solicitud.programa.nombre || ''}`,
        medida: 91,
        color: 'blanco',
      },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'MODALIDAD', medida: 91, color: 'blanco' },
      { texto: modalidadTipo || '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'DURACIÓN DEL PROGRAMA', medida: 91, color: 'blanco' },
      { texto: `${solicitud.programa.duracionPeriodos} ${textoCiclos}`, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'NOMBRE COMPLETO DE LA PERSONA FÍSICA O JURÍDICA',
        medida: 91,
        color: 'blanco',
        bold: true,
        acomodoLetra: 'center',
      },
      { texto: `${solicitud.usuario?.persona?.nombre} ${solicitud.usuario?.persona?.apellidoPaterno} ${solicitud.usuario?.persona?.apellidoMaterno}`, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];

const higieneMap = {
  1: 'Alumnos (varón)',
  2: 'Alumnas (mujer)',
  3: 'Administrativos (hombre)',
  4: 'Administrativas (mujer)',
  5: 'Personas encargadas de la limpieza',
  6: 'Cestos de basura',
  7: 'Número de aulas en el plantel',
  8: 'Butacas por aula',
  9: 'Ventanas que pueden abrirse por aula',
  10: 'Ventiladores en el plantel',
  11: 'Aires acondicionados en el plantel',
};

const tablaHigiene = (solicitud) => {
  const higienes = solicitud.programa.plantel.plantelHigienes || [];

  const getCantidad = (id) => {
    const hig = higienes.find((h) => h.higieneId === id);
    return hig?.cantidad != null ? hig.cantidad : '0';
  };

  const sanitariosTexto = [
    'Estudiantes\n',
    `  Alumnos: ${getCantidad(1)}`,
    `  Alumnas: ${getCantidad(2)}`,
    '',
    'Personal docente y administrativo\n',
    `  Hombres: ${getCantidad(3)}`,
    `  Mujeres: ${getCantidad(4)}`,
  ].join('\n');

  return [
    {
      tipo: 'fila',
      contenido: [
        { texto: '4. HIGIENE DEL PLANTEL', medida: 182, color: 'naranja' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'CONCEPTO', medida: 91, color: 'naranja' },
        { texto: 'DESCRIPCIÓN', medida: 91, color: 'naranja' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        {
          texto: 'SANITARIOS',
          medida: 91,
          color: 'blanco',
          bold: true,
        },
        {
          texto: sanitariosTexto,
          medida: 91,
          color: 'blanco',
          acomodoLetra: 'left',
        },
      ],
      altura: 40,
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'PERSONAL DE LIMPIEZA DEL PLANTEL', medida: 91, color: 'blanco' },
        { texto: `${getCantidad(5)}`, medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'CESTOS DE BASURA EN EL PLANTEL', medida: 91, color: 'blanco' },
        { texto: `${getCantidad(6)}`, medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'AULAS', medida: 91, color: 'blanco' },
        { texto: `${getCantidad(7)}`, medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'BUTACAS', medida: 91, color: 'blanco' },
        { texto: `${getCantidad(8)}`, medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'VENTANAS', medida: 91, color: 'blanco' },
        { texto: `${getCantidad(9)}`, medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'VENTILACIÓN', medida: 91, color: 'blanco' },
        {
          texto: [10, 11]
            .map((id) => {
              const cantidad = getCantidad(id);
              return cantidad ? `${higieneMap[id]}: ${cantidad}` : '';
            })
            .filter(Boolean)
            .join('\n'),
          medida: 91,
          color: 'blanco',
        },
      ],
      repetirVeces: 1,
    },
  ];
};

const generateInfraestructuraRows = (infraestructuras, typeToAdd) => {
  const aulasIds = [1, 2, 3, 14];
  const labsIds = [4, 5, 6, 7, 11, 12, 13];
  const computoIds = [8];
  const bibliotecaIds = [9, 10];

  let filtered = [];

  if (typeToAdd === 'aulas') {
    filtered = infraestructuras.filter((inf) => aulasIds.includes(inf.tipoInstalacionId));
  } else if (typeToAdd === 'labs') {
    filtered = infraestructuras.filter((inf) => labsIds.includes(inf.tipoInstalacionId));
  } else if (typeToAdd === 'computo') {
    filtered = infraestructuras.filter((inf) => computoIds.includes(inf.tipoInstalacionId));
  } else if (typeToAdd === 'biblioteca') {
    filtered = infraestructuras.filter((inf) => bibliotecaIds.includes(inf.tipoInstalacionId));
  }

  return filtered.map((infraestructura, index) => {
    const asignaturas = infraestructura.asignaturasInfraestructura || [];

    const asignaturasStr = asignaturas
      .map((a) => a?.asignatura?.clave || '')
      .filter(Boolean)
      .join('\n');

    const recursos = infraestructura.recursos || '';
    let tamanoLetraRecursos = 10;
    if (recursos.length > 60) {
      tamanoLetraRecursos = Math.floor((30.33 * 10) / recursos.length);
    }

    let tamanoLetraAsignaturas = 10;
    if (asignaturasStr.length > 60) {
      tamanoLetraAsignaturas = Math.floor((30.33 * 10) / asignaturasStr.length);
    }

    return {
      tipo: 'fila',
      contenido: [
        {
          texto: infraestructura.nombre || `Instalación ${index + 1}`,
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'left',
          tamano: infraestructura.tamano || 10,
        },
        {
          texto: infraestructura.capacidad?.toString() || '',
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'center',
        },
        {
          texto: infraestructura.metros?.toString() || '',
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'center',
        },
        {
          texto: recursos,
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'left',
          tamano: tamanoLetraRecursos,
        },
        {
          texto: infraestructura.ubicacion || '',
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'center',
        },
        {
          texto: asignaturasStr,
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'left',
          tamano: tamanoLetraAsignaturas,
        },
      ],
      repetirVeces: 1,
    };
  });
};

const tablaInfraestructuraPrograma = (solicitud) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '5. INFRAESTRUCTURA PARA EL PROGRAMA', medida: 182, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'ESPACIOS Y EQUIPAMIENTOS', medida: 182, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    altura: 9.8,
    contenido: [
      {
        texto: 'INSTALACIONES',
        medida: 30.33,
        color: 'naranja',
        bold: true,
        tamano: 8,
        acomodoLetra: 'center',
      },
      {
        texto: 'CAPACIDAD PROMEDIO (No. DE ALUMNOS)',
        medida: 30.33,
        color: 'naranja',
        bold: true,
        acomodoLetra: 'left',
      },
      { texto: 'METROS', medida: 30.33, color: 'naranja' },
      {
        texto: 'RECURSOS MATERIALES',
        medida: 30.33,
        color: 'naranja',
        bold: true,
        acomodoLetra: 'left',
      },
      { texto: 'UBICACIÓN', medida: 30.33, color: 'naranja' },
      {
        texto: 'ASIGNATURAS QUE ATIENDE',
        medida: 30.33,
        color: 'naranja',
        bold: true,
        tamano: 9,
        acomodoLetra: 'left',
      },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'AULAS',
        medida: 182,
        color: 'naranja',
        bold: true,
        acomodoLetra: 'left',
      },
    ],
    repetirVeces: 1,
  },
  ...generateInfraestructuraRows(solicitud.programa.plantel.infraestructuras, 'aulas'),
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'LABORATORIOS Y TALLERES',
        medida: 182,
        color: 'naranja',
        bold: true,
        acomodoLetra: 'left',
      },
    ],
    repetirVeces: 1,
  },
  ...generateInfraestructuraRows(solicitud.programa.plantel.infraestructuras, 'labs'),
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'LABORATORIO DE CÓMPUTO',
        medida: 182,
        color: 'naranja',
        bold: true,
        acomodoLetra: 'left',
      },
    ],
    repetirVeces: 1,
  },
  ...generateInfraestructuraRows(solicitud.programa.plantel.infraestructuras, 'computo'),
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'BIBLIOTECA FÍSICA Y VIRTUAL',
        medida: 182,
        color: 'naranja',
        bold: true,
        acomodoLetra: 'left',
      },
    ],
    repetirVeces: 1,
  },
  ...generateInfraestructuraRows(solicitud.programa.plantel.infraestructuras, 'biblioteca'),
];

const tablaRelacionInstituciones = (solicitud) => [
  {
    tipo: 'fila',
    contenido: [
      {
        texto: '6. RELACIÓN DE INSTITUCIONES DE SALUD ALEDAÑAS, SERVICIOS DE AMBULANCIA U OTROS SERVICIOS DE EMERGENCIA A  LOS CUALES RECURRIRÁ LA INSTITUCIÓN EN CASO DE ALGUNA CONTINGENCIA',
        acomodoLetra: 'left',
        medida: 182,
        color: 'naranja',
      },
    ],
    altura: 10,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'NOMBRE DE LA INSTITUCIÓN', medida: 91, color: 'naranja' },
      {
        texto: 'TIEMPO APROXIMADO REQUERIDO PARA LLEGAR A LA ESCUELA  (EN MINUTOS)',
        medida: 91,
        color: 'naranja',
        acomodoLetra: 'left',
      },
    ],
    repetirVeces: 1,
    altura: 8.7,
  },
  ...solicitud.programa.plantel.saludInstituciones.map((institucion) => ({
    tipo: 'fila',
    contenido: [
      { texto: institucion.nombre, medida: 91, color: 'blanco' },
      { texto: institucion.tiempo, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  })),
];

module.exports = {
  tablaDomicilio,
  tablaHigiene,
  tablaInfraestructuraPrograma,
  tablaRelacionInstituciones,
  tablaDatosPlan,
};
