const swaggerObject = {
  routePrefix: '/doc/external',
  openapi: {
    info: {
      title: 'SIIGES 2.0 API Externa',
      description: 'Documentación de la API expuesta para integraciones externas con la plataforma SIIGES 2.0.',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Consulta más información sobre la especificación OpenAPI.',
    },
    servers: [
      {
        url: 'https://{host}',
        description: 'Servidor de pruebas',
        variables: {
          host: {
            default: process.env.SWAGGER_HOST,
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
          description: 'Proporcione su API KEY. Formato: `<api_key>`',
        },
        token: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Proporcione un token JWT. Formato: `Bearer <token>`',
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
    tags: [],
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
