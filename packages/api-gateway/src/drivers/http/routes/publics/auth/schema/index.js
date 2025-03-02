const { loginSchema } = require('./loginSchema');
const { registerSchema } = require('./registerSchema');
const { tokenRecoveryPasswordSchema } = require('./tokenRecoveryPasswordSchema');

module.exports = {
  loginSchema,
  registerSchema,
  tokenRecoveryPasswordSchema,
};
