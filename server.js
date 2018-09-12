const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

require('dotenv').load();

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


app.get('/', (req, res) => {
    axios.get(process.env.URL_TO_PROXY, {
            headers: {
                ...(process.env.AUTHORIZATION_HEADER ? {Authorization: req.get('Authorization')} : {})
            }
        })
        .then(response => res.send(response.data)) 
        .catch(err => {
            console.log(err.response);
            res.status(err.response.status).send({error: err.response.data}) 
        
        } )
})

app.listen(1234, () => console.log('Example app listening on port 1234!'));
