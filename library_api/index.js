var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var restful = require('node-restful');
var isbn = require('node-isbn');
var mongoose = restful.mongoose;

var app = express();

var apiBaseUrl = '/api/v1';
var dbBaseUrl = 'mongodb://localhost';
var hostname = 'localhost';
var port = 3000;

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(methodOverride());

// isbn lookup and return
app.post(apiBaseUrl + '/books/isbn_lookup/', function(req, res) {
    if(req.body.isbn) {
        isbn.resolve(req.body.isbn, function(err, book) {
            if (err) {
                res.statusCode = 404;
                res.send('ISBN ' + req.body.isbn + ' not found.');
            } else {
                res.send(book);
            }
        });
    } else {
        res.statusCode = 400;
        if(!req.body.isbn) {
            res.send('Request body must include isbn.');
        } else {
            res.send('Bad request.');
        }
    }
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

// create crud endpoints
var Books = app.resource = restful.model('book', bookSchema)
  .methods(['get', 'post', 'put', 'delete']);

Books.register(app, apiBaseUrl + '/books');

// need callback with info on running
app.listen(port, hostname, function(){
    console.log(`Running on http://${hostname}:${port}`);
});
