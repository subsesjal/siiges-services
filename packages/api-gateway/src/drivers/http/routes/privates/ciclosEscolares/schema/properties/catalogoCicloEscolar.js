const catalogoCicloEscolar = {
  nombre: { type: 'string' },
  descripcion: { type: 'string' },
  tipo: { type: 'integer' },
  ciclosActivos: { type: 'boolean' },
};

const updateCatalogoCicloEscolarBody = {
  tipo: { type: 'integer', enum: [1, 2] },
  ciclosActivos: { type: 'boolean' },
};

module.exports = { catalogoCicloEscolar, updateCatalogoCicloEscolarBody };
