const express = require('express');

const  app = express();

app.use((req,res)=>{
    res.send("app done")
})

app.use("/hello",(req,res)=>{
    res.send("hello called")
})

app.listen(7000);