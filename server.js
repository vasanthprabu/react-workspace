const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000
console.log(__dirname);
app.use(express.static(__dirname+'/build'))
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
})
const server = http.createServer(app);
server.listen(port,()=>{
    console.log("Server started with port",port);
})