const { checkers } = require('@siiges-services/shared');

const AREA_NAMES = {
  1: 'Formación General',
  2: 'Formación Básica',
  3: 'Formación Disciplinar',
  4: 'Formación Electiva',
  5: 'Formación Técnica',
  6: 'Formación Especializante',
};

const GRADO_NAMES = {
  1: 'Primer cuatrimestre',
  2: 'Segundo cuatrimestre',
  3: 'Tercer cuatrimestre',
  4: 'Cuarto cuatrimestre',
  5: 'Quinto cuatrimestre',
  6: 'Sexto cuatrimestre',
  7: 'Séptimo cuatrimestre',
  8: 'Octavo cuatrimestre',
  9: 'Noveno cuatrimestre',
  10: 'Décimo cuatrimestre',
  11: 'Undecimo cuatrimestre',
  12: 'Duodecimo cuatrimestre',
  13: 'Primer semestre',
  14: 'Segundo semestre',
  15: 'Tercer semestre',
  16: 'Cuarto semestre',
  17: 'Quinto semestre',
  18: 'Sexto semestre',
  19: 'Séptimo semestre',
  20: 'Octavo semestre',
  21: 'Noveno semestre',
  22: 'Décimo semestre',
  23: 'Flexible Cuatrimestral',
  24: 'Flexible Semestral',
  25: 'Optativa',
};

const findOneProgramaRvoe = (
  findOneProgramaQuery,
) => async (identifierObj) => {
  const { rvoe } = identifierObj;

  const include = [
    { association: 'ciclo' },
    { association: 'asignaturas' },
  ];

  const programa = await findOneProgramaQuery(
    { acuerdoRvoe: rvoe },
    {
      include,
      strict: false,
    },
  );

  checkers.throwErrorIfDataIsFalsy(programa, 'programa', rvoe);

  const programaData = programa.toJSON();

  const gradosMap = {};
  (programaData.asignaturas || []).forEach((asignatura) => {
    const { gradoId } = asignatura;
    if (!gradosMap[gradoId]) {
      gradosMap[gradoId] = {
        gradoId,
        nombre: GRADO_NAMES[gradoId] || `Grado ${gradoId}`,
        asignaturas: [],
      };
    }
    gradosMap[gradoId].asignaturas.push({
      ...asignatura,
      area: AREA_NAMES[asignatura.areaId] || '',
    });
  });

  programaData.grados = Object.values(gradosMap).sort((a, b) => a.gradoId - b.gradoId);
  delete programaData.asignaturas;

  return programaData;
};

module.exports = findOneProgramaRvoe;
