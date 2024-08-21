const generateMapObservaciones = (dataParsed) => {
  const { observacion } = dataParsed;
  const mapObservaciones = observacion.map((dato) => {
    const { nombre, observaciones } = dato;
    return `<tr><td style="border: 1px solid #ddd;padding: 8px;">${nombre}</td><td style="border: 1px solid #ddd;padding: 8px;">${observaciones}</td></tr>`;
  });
  const newDataParsed = dataParsed;
  newDataParsed.observacion = mapObservaciones.join('');
};

module.exports = { generateMapObservaciones };
