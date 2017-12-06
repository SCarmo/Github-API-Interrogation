const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const github = require('octonode');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
var client = github.client();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.render('home');
})

app.get('/interrogate', (req, res) => {
  res.render('interrogate');
});

app.post('/interrogate',urlencodedParser, (req, res) => {
  client.get('/users/'+req.body.account, {}, function (err, status, body, headers) {
  res.render('github', {account: body});//JSON.stringify(body,null,5)
});
});
app.listen(3000);
