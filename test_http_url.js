/* simple express server */
var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();
 
  
 //app.use(express.static('/'));
 app.set('view engine', 'html');
 app.engine('html', require('ejs').renderFile);
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 

app.listen(8080);


app.get('/about', function(req, res, next) {
  //console.log(req);
  res.render('about.html');
  //res.sendFile('test.json', { root:  __dirname});
  //var text = fs.readFileSync('test.txt','utf8')
  //  console.log (text)
  
});

app.get('/get', function(req, res, next) {
  //console.log(req);
  //res.render('about.html');
  res.sendFile('test.json', { root:  __dirname});
  //var text = fs.readFileSync('test.txt','utf8')
   console.log("served");
  
});

app.get('/write', function(req, res, next) {
  //console.log(req);
  
  var q = url.parse(req.url, true).query;
  var txt = "{\"id\": " + q.BreweryId + "}";
  
  fs.writeFile("test.json", txt, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
  
  res.redirect('/close');
  
});


app.get('/close', function(req, res, next) {
  res.render('close.html');
});



app.get('*', function(req, res, next) {
  //res.render('error');
});


/* simple web server using http
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  //res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.BreweryId;
  
  fs.writeFile("test.txt", txt, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
  
  
  //res.end(txt);
}).listen(8080);
*/

 