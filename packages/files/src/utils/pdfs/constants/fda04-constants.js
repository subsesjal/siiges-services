const tablaDomicilio = (solicitud) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '2. DOMICILIO DE LA INSTITUCIÓN', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'CALLE Y NÚMERO', medida: 121.4, color: 'gris' },
      { texto: 'COLONIA', medida: 60.66, color: 'gris' },
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
      { texto: 'CÓDIGO POSTAL', medida: 60.66, color: 'gris' },
      { texto: 'DELEGACIÓN O MUNICIPIO', medida: 60.66, color: 'gris' },
      { texto: 'ENTIDAD FEDERATIVA', medida: 60.66, color: 'gris' },
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
      { texto: 'NÚMERO TELEFÓNICO', medida: 60.66, color: 'gris' },
      { texto: 'REDES SOCIALES', medida: 60.66, color: 'gris' },
      { texto: 'CORREO ELECTRÓNICO', medida: 60.66, color: 'gris' },
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
const tablaDatosPlan = (solicitud, textoCiclos, modalidadTipo) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '1. DATOS DEL PLAN DE ESTUDIOS', medida: 182, color: 'gris' },
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
      { texto: '', medida: 91, color: 'blanco' }, // Debes llenar este valor dinamicamente
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
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];

const tablaHigiene = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '4. HIGIENE DEL PLANTEL', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'CONCEPTO', medida: 91, color: 'gris' },
      { texto: 'DESCRIPCIÓN', medida: 91, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'Sanitarios',
        medida: 91,
        color: 'blanco',
        bold: true,
        acomodoLetra: 'left',
      },
      {
        texto: '',
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
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'CESTOS DE BASURA EN EL PLANTEL', medida: 91, color: 'blanco' },
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'BUTACAS', medida: 91, color: 'blanco' },
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'VENTANAS', medida: 91, color: 'blanco' },
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'VENTILACIÓN', medida: 91, color: 'blanco' },
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];

const generateInfraestructuraRows = (infraestructuras, typeToAdd) => {
  let additionalRows = [];

  if (typeToAdd === 'aulas') {
    additionalRows = infraestructuras.map((infraestructura, index) => ({
      nombre: infraestructura ? infraestructura.nombre || `AULA ${index + 1}` : `AULA ${index + 1}`,
      capacidad: infraestructura && infraestructura.capacidad ? infraestructura.capacidad.toString() : '',
      metros: infraestructura && infraestructura.metros ? infraestructura.metros.toString() : '',
      recursos: infraestructura && infraestructura.recursos ? infraestructura.recursos : '',
      ubicacion: infraestructura && infraestructura.ubicacion ? infraestructura.ubicacion : '',
    }));
  } else if (typeToAdd === 'labs') {
    additionalRows = [
      { nombre: 'LABORATORIO FÍSICO', tamano: 8 },
      { nombre: 'LABORATORIO VIRTUAL', tamano: 8 },
      { nombre: 'TALLER FÍSICO' },
      { nombre: 'TALLER VIRTUAL' },
    ];
  } else if (typeToAdd === 'computo') {
    additionalRows = [
      { nombre: 'LABORATORIO 1', tamano: 8 },
      { nombre: 'LABORATORIO 2', tamano: 8 },
    ];
  } else if (typeToAdd === 'biblioteca') {
    additionalRows = [
      { nombre: 'BIBLIOTECA FÍSICA' },
      { nombre: 'BIBLIOTECA VIRTUAL' },
    ];
  }

  return additionalRows.map((infraestructura) => {
    // Calcular altura dinámicamente según el contenido de recursos y asignaturas
    const contenidoRecursos = infraestructura.recursos || '';
    const contenidoAsignaturas = infraestructura.asignaturas || '';

    // Ajustar tamaño de letra basado en la longitud del contenido
    let tamanoLetraRecursos = 10; // Tamaño de letra por defecto
    let tamanoLetraAsignaturas = 10; // Tamaño de letra por defecto

    if (contenidoRecursos.length > 60) {
      // Calcular tamaño de letra para que quepa en la celda
      // eslint-disable-next-line no-mixed-operators
      tamanoLetraRecursos = Math.floor(30.33 * 10 / contenidoRecursos.length);
    }

    if (contenidoAsignaturas.length > 60) {
      // Calcular tamaño de letra para que quepa en la celda
      // eslint-disable-next-line no-mixed-operators
      tamanoLetraAsignaturas = Math.floor(30.33 * 10 / contenidoAsignaturas.length);
    }

    return {
      tipo: 'fila',
      contenido: [
        {
          texto: infraestructura.nombre || '',
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'left',
          tamano: infraestructura.tamano || 10, // Si no se especifica tamano, usar 10 por defecto
        },
        {
          texto: infraestructura.capacidad || '',
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'center',
        },
        {
          texto: infraestructura.metros || '',
          medida: 30.33,
          color: 'blanco',
          acomodoLetra: 'center',
        },
        {
          texto: contenidoRecursos,
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
          texto: contenidoAsignaturas,
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
      { texto: '5. INFRAESTRUCTURA PARA EL PROGRAMA', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'ESPACIOS Y EQUIPAMIENTOS', medida: 182, color: 'gris' },
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
        color: 'gris',
        bold: true,
        tamano: 8,
        acomodoLetra: 'center',
      },
      {
        texto: ' CAPACIDAD PROMEDIO  (No. DE ALUMNOS)',
        medida: 30.33,
        color: 'gris',
        bold: true,
        acomodoLetra: 'left',
      },
      { texto: 'METROS', medida: 30.33, color: 'gris' },
      {
        texto: 'RECURSOS MATERIALES',
        medida: 30.33,
        color: 'gris',
        bold: true,
        acomodoLetra: 'left',
      },
      { texto: 'UBICACIÓN', medida: 30.33, color: 'gris' },
      {
        texto: 'ASIGNATURAS QUE  ATIENDE',
        medida: 30.33,
        color: 'gris',
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
        color: 'gris',
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
        color: 'gris',
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
        color: 'gris',
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
        color: 'gris',
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
      },
    ],
    altura: 10,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'NOMBRE DE LA INSTITUCIÓN', medida: 91, color: 'gris' },
      {
        texto: 'TIEMPO APROXIMADO REQUERIDO PARA LLEGAR A LA ESCUELA  (EN MINUTOS)',
        medida: 91,
        color: 'gris',
        acomodoLetra: 'left',
      },
    ],
    repetirVeces: 1,
    altura: 8.7,
  },
  // Iteración sobre las instituciones
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
