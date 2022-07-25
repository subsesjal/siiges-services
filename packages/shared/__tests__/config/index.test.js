// Internal dependencies
const config = require('../../config');

const configObject = {
  envVars: {
    node: {
      env: expect.any(String),
    },
  },
};

describe('given a programmer who need to import config modules', () => {
  describe('when they import in their file', () => {
    test('then it should have the right structure', () => {
      expect(config).toEqual(
        expect.objectContaining(configObject),
      );
    });
  });
});
