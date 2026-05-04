// Global Error Handling for Vercel debugging
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 UNHANDLED REJECTION:', reason);
});

import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env only if not in production
if (process.env.NODE_ENV !== 'production') {
  try {
    dotenv.config();
  } catch (e) {
    console.log('No local .env file found');
  }
}


import express from "express"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.config.js'
import bootStrap from "./src/app.controller.js"

const app = express()
const port = process.env.PORT || 3000

// Swagger Documentation
if (swaggerSpec && Object.keys(swaggerSpec).length > 0) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'E-Commerce API Docs'
  }))
}


// Bootstrap (Synchronous route registration)
bootStrap(app, express)

// Only start the server if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${port}`)
    console.log(`📚 API Docs: http://localhost:${port}/api-docs`)
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  })
} else {
  console.log(`🚀 App initialized for Vercel serverless environment`)
}

export default app;
