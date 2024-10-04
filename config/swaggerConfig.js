import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Trading Bot API Documentation',
        version: '1.0.0',
        description: 'API documentation for the hypothetical trading bot',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{
        bearerAuth: []
      }],
    },
    apis: ['./routes/*.js'],
  };
  

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
