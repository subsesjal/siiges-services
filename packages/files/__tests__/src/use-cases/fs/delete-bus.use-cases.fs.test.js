// External dependencies
const { faker } = require('@faker-js/faker');
const fsp = require('fs/promises');
const { checkers } = require('@siiges-services/shared');
// Internal dependencies
const { deleteBus } = require('../../../../src/useCases/fs');
const { file } = require('../../../../src/adapters/fs');
const { fileData } = require('../../../constants');

jest.mock('fs/promises', () => ({
  unlink: jest.fn(),
}));

const unlinkIfNameIsDefined = jest.spyOn(file, 'unlinkIfNameIsDefined');

describe('Given a file instance', () => {
  test('THEN it should call file.unlikIfNameIsDefined', () => {
    const filePath = faker.system.filePath();

    unlinkIfNameIsDefined.mockImplementationOnce(jest.fn());
    deleteBus(filePath, fileData).then(() => expect(
      unlinkIfNameIsDefined,
    ).toHaveBeenCalledWith(fileData, filePath));
  });

  describe('When nombre propetry exist in currentFile params', () => {
    test('THEN it should call fsp.unlik', () => {
      checkers.isDefined.mockReturnValueOnce(true);
      deleteBus(fileData).then(() => expect(fsp.unlink).toHaveBeenCalled());
    });
  });
});
