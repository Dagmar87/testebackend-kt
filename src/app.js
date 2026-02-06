const express = require('express');
const userRoutes = require('./routes/users.routes');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(userRoutes);

// Tratamento de erros global
app.use(errorHandler);

module.exports = app;