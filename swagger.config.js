import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: `
# E-Commerce API Documentation

مرحباً بك في توثيق API الخاص بمتجر E-Commerce الإلكتروني.
      `,
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
      }
    },
    servers: [
      {
        url: 'https://e-commerce-beige-iota.vercel.app',
        description: 'Vercel Server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'نظام المصادقة والتسجيل'
      },
      {
        name: 'Product',
        description: 'إدارة المنتجات'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, './src/Modules/**/*.controller.js'),
    path.join(__dirname, './src/Modules/**/*.validation.js')
  ],
};

let swaggerSpec = {};
try {
  swaggerSpec = swaggerJsdoc(options);
} catch (error) {
  console.error('⚠️ Swagger initialization failed:', error.message);
}

export default swaggerSpec;
