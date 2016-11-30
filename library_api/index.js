var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var restful = require('node-restful');
var isbn = require('node-isbn');
var mongoose = restful.mongoose;

var app = express();

let apiBaseUrl = '/api/v1';
let dbBaseUrl = 'mongodb://localhost';
 
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(methodOverride());

// isbn lookup and return

app.post(apiBaseUrl + '/books/isbn_lookup/', function(req, res) {
    var isbnInput = req.body.isbn;

    isbn.resolve(isbnInput, function(err, book) {
        if (err) {
            res.statusCode = 404;
        } else {
            res.send(book);
        }
    });
});

// persistant storage in mongodb

mongoose.connect(dbBaseUrl + '/books');

var bookSchema = mongoose.Schema({
    title: String,
    author: Array,
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

Books.register(app, apiBaseUrl + '/books');

// need callback with info on running
app.listen(3000);
