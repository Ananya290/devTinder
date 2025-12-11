const mongoose = require('mongoose')

const uri = "mongodb+srv://ananyashuklass290_db_user:lrlq2W9f5j09q7k6@cluster0.0irk1ji.mongodb.net/devTinderDec?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async() => {
 await mongoose.connect(uri);
} 
 
module.exports = connectDB;