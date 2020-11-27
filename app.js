const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hey there");
});

app.listen(3000,()=>{
    console.log("Server listening from 3000");
});