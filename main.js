const express = require('express')
const router = express.Router()
const routes = require('./routes/route');
require('custom-env').env(true)

const app = express()

app.use('/', routes);

app.get('/', function(req,res){
    res.send("success");
})

const server = app.listen(process.env.port, ()=> {
    console.log(`Listening you at port ${process.env.port}, Stay Happy!`);
})

server.timeout = 300000;