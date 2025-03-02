const loginUser = require('./login.handlers.usuario.adapters');
const { tokenRecoveryPassword } = require('./token-recovery-password.handlers.usuario.adapters');

module.exports = {
  loginUser,
  tokenRecoveryPassword,
};
