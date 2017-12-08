const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const github = require('octonode');
const path = require('path');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const client = github.client();
const fetch = require('node-fetch');
const file = 'views/flare.csv';
const fs = require('fs');
const csv = require('fast-csv');

var obj = require('./views/user.json');
console.log(obj.login);

fs.readFile('views/followers.json', 'utf8', function (err,data) {
    data = JSON.parse(data);
    console.log(data.length);
    for(var i = 0; i < data.length; i++) {
        console.log(data[i].login);
    }
});

fs.truncate(file, 0, function(){console.log('csv file created')})
fs.appendFile(file, 'id, value\n', function (err) {
   if (err) throw err;
 });
// fs.appendFile(file, 'flare.vis.Visualization,16540\n', function (err) {
//   if (err) throw err;
// });

 fs.appendFile(file, 'flare.vis.Visualization,16540\n', function (err) {
   if (err) throw err;
 });

// fs.createReadStream(file)
//   .pipe(csv())
//   .on('data', function(data){
//     console.log(data);
//   })
//   .on('end', function(data){
//     console.log('finished!');
//   })

// fetch('https://api.github.com/users/scarmo')
//     .then(function(res) {
//         return res.json();
//     }).then(function(json) {
//         console.log(json);
//     });

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
