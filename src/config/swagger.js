const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Usuários',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários desenvolvida para o desafio técnico',
      contact: {
        name: 'José Dagmar F. S. Sobrinho',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor Local',
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/app.js'], // caminho para a documentação da API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
