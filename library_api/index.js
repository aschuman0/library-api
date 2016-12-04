var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var restful = require('node-restful');
var isbn = require('node-isbn');
var assert = require('assert');
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
function formatIsbnReturn(bookFromIsbn, inputIsbn) {
    assert(!null, bookFromIsbn, 'invalid book object.');

    if(bookFromIsbn.title) {
        var title = bookFromIsbn.title;
    } else {
        var title = null;
    }

    if(bookFromIsbn.description) {
        var description = bookFromIsbn.description;
    } else {
        var description = null;
    }

    if(bookFromIsbn.publishedDate) {
        var publishedDate = bookFromIsbn.publishedDate;
    } else {
        var publishedDate = null;
    }

    if(bookFromIsbn.publisher) {
        var publisher = bookFromIsbn.publisher;
    } else {
        var publisher = null;
    }

    if(bookFromIsbn.authors) {
        var authors = bookFromIsbn.authors;
    } else {
        var authors = null;
    }

    if(bookFromIsbn.pageCount) {
        var pageCount = bookFromIsbn.pageCount;
    } else {
        var pageCount = null;
    }

    var isbn = inputIsbn;

    if(bookFromIsbn.infoLink) {
        var infoUrl = bookFromIsbn.infoLink;
    } else {
        var infoUrl = null;
    }

    if(bookFromIsbn.imageLinks.smallThumbnail) {
        var smallThumbUrl = bookFromIsbn.imageLinks.smallThumbnail;
    } else {
        var smallThumbUrl = null;
    }

    if(bookFromIsbn.imageLinks.thumbnail) {
        var thumbUrl = bookFromIsbn.imageLinks.thumbnail;
    } else {
        var thumbUrl = null;
    }

    var bookReturn = {
        'title': title,
        'description': description,
        'publishedDate': publishedDate,
        'publisher': publisher,
        'authors': authors,
        'pageCount': pageCount,
        'isbn': isbn,
        'infoUrl': infoUrl,
        'imageUrls': {
            'smThumb': smallThumbUrl,
            'thumb': thumbUrl
        }
    }
    return bookReturn;
}

app.post(apiBaseUrl + '/books/isbn_lookup/', function(req, res) {
    if(req.body.isbn) {
        isbn.resolve(req.body.isbn, function(err, book) {
            if (err) {
                res.statusCode = 404;
                res.send('ISBN ' + req.body.isbn + ' not found.');
            } else {
                res.send(formatIsbnReturn(book, req.body.isbn));
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
mongoose.connect(dbBaseUrl + '/books', function(err, db) {
    assert.equal(null, err);
    console.log('Connected to database without error.')
});

var bookSchema = mongoose.Schema({
    title: String,
    author: Array,
    publisher: String,
    publish_date: String,
    description: String,
    pages: Number,
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
