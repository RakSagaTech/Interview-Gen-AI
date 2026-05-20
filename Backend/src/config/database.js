const mongoose = require('mongoose');


async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database Successfully");
  }catch(err){
    console.log('Database Connection Error: ', err)
  }
}

module.exports = connectDB;