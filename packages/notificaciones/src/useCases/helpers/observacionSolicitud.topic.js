const generateMapObservaciones = (dataParsed) => {
  const { observacion, ...newDataParsed } = dataParsed;
  const mapObservaciones = observacion.map((dato) => {
    const { nombre, observaciones } = dato;
    return `<tr><td style="border: 1px solid #ddd;padding: 8px;">${nombre}</td><td style="border: 1px solid #ddd;padding: 8px;">${observaciones}</td></tr>`;
  });

  newDataParsed.observacion = mapObservaciones.join('');

  return newDataParsed;
};

module.exports = { generateMapObservaciones };
