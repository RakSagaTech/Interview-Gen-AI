require('dotenv').config();

const app = require('./src/app');
const { resume, selfDescription, jobDescription } = require('./src/services/temp');
const connectDB = require('./src/config/database');

const generateInterviewReport = require('./src/services/ai.service');

connectDB();
generateInterviewReport({resume, selfDescription, jobDescription})

const PORT = process.env.PORT || 5000;


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})