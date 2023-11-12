//  import packages
const express = require("express");
const path = require("path");

// apply express to app
const app = express();

//  get all files 
app.use("/client",express.static(path.resolve(__dirname,"client")));

//  manage requsts and responses

app.get('/*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','index.html'))
});

//  create port for app listen

app.listen(process.env.PORT || 5000,()=> console.log("server is Runing ..."));