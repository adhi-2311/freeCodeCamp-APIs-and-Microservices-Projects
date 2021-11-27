require('dotenv').config();
const express = require('express');
const shortid=require('shortid');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const validUrl = require('valid-url');
const connectDb=require('./views/connection');

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(`${process.cwd()}/public`));

const Db=require('./views/models/model');
connectDb();
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',function(req,res){
  const original=req.body.url;
  if(validUrl.isUri(original)){
    //check if already present
  Db.findOne({original_url:original},function(err,found){
    if(found){
      res.json({
        "original_url":original,
        "short_url":found.short_url
      })
    }
    else {
      const short=shortid.generate();
      res.json({
        "original_url":original,
        "short_url":short
      })
      const newCollection=new Db({
        "original_url":original,
        "short_url":short
      })
      newCollection.save(function(err){
        if(!err){
            res.send("Success!");
        }
        else
        res.send(err);
    });
    }
  })
  }
  else{
    res.json({
      error: 'invalid url'
    });
  }
})

app.get('/api/shorturl/:short',function(req,res){
  const shorturl=req.params.short;
  
  Db.findOne({short_url:shorturl},function(err,found){
    if(found){
      res.redirect(found.original_url)
    }
    else {
      res.send("No article with that title found.");
    }
  })
  
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
