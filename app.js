const express = require('express');
const app = express();
const fetch = require('node-fetch');
const file = 'views/graphData.csv';
const fs = require('fs');
const csv = require('fast-csv');
var EA;
var request = require('request');

fs.truncate(file, 0, function(){})

fs.appendFile(file, 'id, value\n', function (err) {
   if (err) throw err;
 });

var options = {
   url: "https://api.github.com/orgs/electronicarts/repos",
   headers: {
     'User-Agent': 'request'
   }
 };
          /* For reading json data from api*/
request(options,"https://api.github.com/orgs/electronicarts/repos", function (error, response, body) {
     parse(body);
 });

function parse(body){
  var repos = JSON.parse(body);
  var keys;
  var str;
  fs.appendFile(file, "EA,\n", function (err) {
    if (err) throw err;
  });

  // for every repo
  for(var i = 0; i < repos.length; i++) {
    str = "EA." + repos[i].name + ",\n";
    fs.appendFile(file, str, function (err) {
      if (err) throw err;
    });
    keys = Object.keys(repos[i]);
    var string = JSON.stringify(repos[i]);
    var val = JSON.parse(string);

    // for elements in a repo
    for(var k = 0; k < 20; k++){
      str = "EA." + repos[i].name + "." + keys[k] + ",\n";
      fs.appendFile(file, str, function (err) {
        if (err) throw err;
      });
      str =  "EA." + repos[i].name + "." + keys[k] + "." +val[keys[k]] + ",1\n";
      fs.appendFile(file, str, function (err) {
        if (err) throw err;
      });
    }
  }
}

        /* when reading json data from file*/
//  fs.readFile('views/org.json', 'utf8', function (err,data) {
    // var repos = JSON.parse(EA);
    // var keys;
    // var str;
    // // for every repo
    // for(var i = 0; i < repos.length; i++) {
    //   str = "EA." + repos[i].name + ",\n";
    //   fs.appendFile(file, str, function (err) {
    //     if (err) throw err;
    //   });
    //   keys = Object.keys(repos[i]);
    //   var string = JSON.stringify(repos[i]);
    //   var val = JSON.parse(string);
    //   // for elements in a repo
    //   for(var k = 0; k < 5; k++){
    //     str = "EA." + repos[i].name + "." + keys[k] + ",\n";
    //     fs.appendFile(file, str, function (err) {
    //       if (err) throw err;
    //     });
    //     str =  "EA." + repos[i].name + "." + keys[k] + "." +val[keys[k]] + ",1\n";
    //     fs.appendFile(file, str, function (err) {
    //       if (err) throw err;
    //     });
    //   }
    // }
//});

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
