const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const github = require('octonode');
const path = require('path');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const client = github.client();
const file = require('./views/flare.json');

var fetch = require('node-fetch');

fetch('https://api.github.com/users/scarmo')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
    });

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.render('home');
})

app.get('/interrogate', (req, res) => {

  res.render('graph');
});

app.use(express.static(__dirname + '/views'));

app.listen(3000);
