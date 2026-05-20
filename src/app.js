const express = require('express');

/*Require all the routes here*/
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());

/*Using all the routes here*/
app.use('/api/auth', authRouter);

module.exports = app;