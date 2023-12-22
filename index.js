const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req,res)=>{
    res.send("Todo-Ph is running")
})

app.listen(port, ()=>{
    console.log("Todo-PH runnig on port ", port);
})