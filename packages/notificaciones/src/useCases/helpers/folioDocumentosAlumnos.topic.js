const generateMapFoliosAlumnos = (dataParsed) => {
  const { foliosAlumnos } = dataParsed;
  const mapFolios = foliosAlumnos.map((folioAlumno) => {
    const { alumno, folioDocumentoAlumno } = folioAlumno;
    return `<tr><td>${alumno?.persona?.nombre} ${alumno?.persona?.apellidoPaterno} ${alumno?.persona?.apellidoMaterno}</td><td>${folioDocumentoAlumno?.folioDocumento}</td></tr>`;
  });
  const newDataParsed = dataParsed;
  newDataParsed.foliosAlumnos = mapFolios.join('');
  return newDataParsed;
};

module.exports = { generateMapFoliosAlumnos };
