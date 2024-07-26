const { persona } = require('./persona');

const alumno = {
  id: { type: 'integer' },
  persona: {
    type: 'object',
    properties: persona,
  },
};

module.exports = { alumno };
