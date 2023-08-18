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
    host: process.env.SWAGGER_HOST,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {},
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'api_key',
        in: 'header',
        description: 'Enter your Apikey in the format: <api_key>',
      },
      token: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter your bearer token in the format: Bearer <jwt>',
      },
    },
    security: [{
      apiKey: [],
      token: [],
    }],
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
