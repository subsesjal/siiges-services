jest.mock('../src/adapters/db/files.db.adapters', () => ({
  deleteFileQuery: jest.fn(),
  updateFileQuery: jest.fn(),
  createFileQuery: jest.fn(),
  findOneFileQuery: jest.fn(),
  findAllFileQuery: jest.fn(),
}));

jest.mock('../src/adapters/db/document-type.db.adapters', () => ({
  findOneQueryDocumentType: jest.fn(),
}));

jest.mock('../src/adapters/db/entity-type.db.adapters', () => ({
  findOneQueryEntityType: jest.fn(),
}));

jest.mock('@siiges-services/shared', () => {
  const originalModule = jest.requireActual('@siiges-services/shared');
  return {
    ...originalModule,
    dotenv: {
      getEnvironmentVar: jest.fn(),
    },
  };
});

jest.mock('@hapi/boom', () => ({
  notFound: jest.fn().mockImplementation(() => { throw Error; }),
}));
