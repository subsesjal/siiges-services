// Suponiendo que VigilanteVigilancia es tu modelo para la tabla 'vigilantes_vigilancias'
const { VigilanteVigilancia } = require('@siiges-services/core/src/drivers/db/models/vigilanteVigilancia');
const { findAllQuery } = require('@siiges-services/core/src/adapters/db/find-all.db.adapter'); // Asegúrate de ajustar la ruta

const findVigilanciasByVigilanteQuery = findAllQuery(VigilanteVigilancia);

module.exports = { findVigilanciasByVigilanteQuery };
