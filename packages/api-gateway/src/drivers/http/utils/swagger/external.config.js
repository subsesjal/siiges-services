const swaggerObject = {
  routePrefix: '/doc/external',
  openapi: {
    info: {
      title: 'SIIGES 2.0 documentation',
      description: 'SIIGES 2.0 swagger API',
      version: '0.0.1',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    servers: [
      {
        url: 'https://{host}',
        variables: {
          host: {
            default: process.env.SWAGGER_HOST,
          },
        },
      },
      {
        url: 'http://{host}',
        variables: {
          host: {
            default: 'localhost:3000',
          },
        },
      },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'api_key',
          description: 'Enter your Apikey in the format: <api_key>',
        },
        token: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your bearer token in the format: Bearer <jwt>',
        },
      },
      // Add your schemas here
      schemas: {
        // ...
      },
    },
    security: [
      {
        apiKey: [],
      },
      {
        token: [],
      },
    ],
    tags: [ // Asegúrate de definir tus etiquetas aquí
      {
        name: 'Files',
        description: 'Operaciones relacionadas con archivos',
      },
      // ... otras etiquetas
    ],
    paths: {
      //
    },
  },
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
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
