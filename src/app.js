const express = require('express');
const connectDB = require('./config/database');

const  app = express();

connectDB().then(()=>{
    console.log("database connection done succesfully")
app.listen(7000, ()=>{
    console.log("server start....")
});
}).catch(()=>{
    console.log("connection not done succesfully")
})


