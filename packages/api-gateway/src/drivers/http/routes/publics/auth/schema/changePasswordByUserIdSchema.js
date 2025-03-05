const changePasswordByUserIdSchema = {
  tags: ['Usuario'],
  description: 'Change password by link mail.',
  body: {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
      oldPassword: {
        type: 'string',
        minLength: 8,
        maxLength: 25,
        pattern: '^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&./])[A-Za-z0-9@$!%*?&./]{8,25}$',
      },
      newPassword: {
        type: 'string',
        minLength: 8,
        maxLength: 25,
        pattern: '^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&./])[A-Za-z0-9@$!%*?&./]{8,25}$',
      },
    },
    required: ['userId', 'newPassword', 'oldPassword'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
};

module.exports = { changePasswordByUserIdSchema };
