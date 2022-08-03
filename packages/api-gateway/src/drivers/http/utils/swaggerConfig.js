const swaggerObject = {
  routePrefix: '/doc',
  swagger: {
    info: {
      title: 'SIIGES 2.0 documentation',
      description: 'SIIGES 2.0 swagger API',
      version: '0.0.1',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {},
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
    defaultModelRendering: 'model',
    operationsSorter: 'method',
  },
  uiHooks: {
    onRequest(request, reply, next) {
      next();
    },
    preHandler(request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
};

module.exports = swaggerObject;
