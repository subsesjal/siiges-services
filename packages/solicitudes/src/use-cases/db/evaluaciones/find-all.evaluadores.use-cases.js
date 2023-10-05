const findAllEvaluadores = (findAllEvaluadoresQuery) => async () => {
  const include = [
    { association: 'persona' },
  ];

  const evaluadores = await findAllEvaluadoresQuery(null, { include });

  return evaluadores;
};

module.exports = { findAllEvaluadores };
