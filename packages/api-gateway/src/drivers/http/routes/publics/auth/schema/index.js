const { loginSchema } = require('./loginSchema');
const { registerSchema } = require('./registerSchema');
const { tokenRecoveryPasswordSchema } = require('./tokenRecoveryPasswordSchema');
const { changePasswordByMailSchema } = require('./changePasswordByMailSchema');
const { changePasswordByUserIdSchema } = require('./changePasswordByUserIdSchema');

module.exports = {
  loginSchema,
  registerSchema,
  tokenRecoveryPasswordSchema,
  changePasswordByMailSchema,
  changePasswordByUserIdSchema,
};
