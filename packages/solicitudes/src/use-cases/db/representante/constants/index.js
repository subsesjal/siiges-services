const includeFindOne = ['solicitud', {
  association: 'usuario',
  include: [{
    association: 'persona',
    include: ['domicilio'],
  }],
}];

module.exports = { includeFindOne };
