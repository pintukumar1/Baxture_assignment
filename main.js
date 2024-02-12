const express = require('express')
const routes = require('./routes/route');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use((req, res, next) => {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/api', routes);
app.get('/', function(req,res){
    res.send("success");
})

const server = app.listen(process.env.port, ()=> {
    console.log(`Listening you at port ${process.env.port}, Stay Happy!`);
})

server.timeout = 300000;