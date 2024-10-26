const parseDataField = async (request, reply) => {
  try {
    const dataField = request.body.DATA;

    if (dataField && typeof dataField.value === 'string') {
      const parsedData = JSON.parse(dataField.value);
      request.body = { ...request.body, ...parsedData };
    } else {
      return reply
        .status(400)
        .send({ message: 'Campo DATA es requerido y debe ser un string JSON.' });
    }
    return true;
  } catch (error) {
    return reply
      .status(400)
      .send({ message: 'Error al parsear los datos JSON en el campo DATA route.' });
  }
};

module.exports = { parseDataField };
