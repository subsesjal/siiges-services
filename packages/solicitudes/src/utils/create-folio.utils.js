const createFolioSolicitud = (data) => {
  const numeroConsecutivo = data.id.toString();
  const d = new Date();
  const currentYear = d.getFullYear();

  return `${data.nivel.nombre}${currentYear}${numeroConsecutivo.padStart(3, '0')}`;
};

module.exports = {
  createFolioSolicitud,
};
