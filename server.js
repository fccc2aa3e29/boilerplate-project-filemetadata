'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
const multer = require('multer');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

const upload = multer({dest: 'uploads/'});
const del = require('del');

app.post("/api/fileanalyse", upload.single('upfile'), (req, res, next) => {
  if(!req.file) return res.send("error");
  res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
  del.sync(['uploads/**', '!uploads/']);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
