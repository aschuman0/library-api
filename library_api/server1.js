var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    isbn = require('node-isbn'),
    mongoose = restful.mongoose;
var app = express();
 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
 
mongoose.connect("mongodb://localhost/books");

var bookSchema = mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    description: String,
    pages: Number,
    language: String,
    isbn: String,
    thumb_url: String,
    thumb_url_sm: String,
    info_url: String,
},{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    }
});
 
var Books = app.resource = restful.model('book', bookSchema)
  .methods(['get', 'post', 'put', 'delete']);
 
Books.register(app, '/books');
 
app.listen(3000);