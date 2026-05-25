const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

/*Require all the routes here*/
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser());


/*Using all the routes here*/
app.use('/api/auth', authRouter);

module.exports = app;