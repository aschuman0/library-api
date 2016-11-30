# library-api
A simple RESTful API for looking up, storing and retreiving book information.

## Endpoint Map

### GET /books
Get a list of all book objects with associated ids and all information 

### GET /books/id 
Get a particular book object by id

### POST /books

Add a book object to the database. 

Example Request

```json
{}
```

### POST /books/isbn_lookup 
Returns book object. Requires isbn to be passed in data.

Example Request

```json
{
    "isbn": "0679747672"
}
```

Example Response

```json
{
  "title": "The great fires",
  "publishedDate": "1995",
  "authors": [
    "Gilbert, Jack"
  ],
  "description": "poems, 1982-1992",
  "industryIdentifiers": [],
  "pageCount": 90,
  "printType": "BOOK",
  "categories": [],
  "imageLinks": {},
  "previewLink": "https://openlibrary.org/books/OL22931456M/The_great_fires",
  "infoLink": "https://openlibrary.org/books/OL22931456M/The_great_fires",
  "publisher": "A.A. Knopf",
  "language": "en"
}
```
Note: This object is _not_ added to the database.

### PUT /books/:id 
Modify a book record by id.

Example Request

```json
{}
```

### DELETE /books/:id 

Remove a book record from the database by id

## Book Object

```json
{
    "id":"id",
    "title": "Book Title",
    "description": "Could be a lot of information about this book, could be a little. Hard to say.",
    "publishedDate": "2001",
    "publisher": "Fancy House",
    "authors" : [
        "Last, First",
        "First Middle Last"
    ],
    "pageCount": 256,
    "infoURL": "http://valid.url/with/path",
    "imageURLs": {
        "smThumb": "http://valid.url/to/sm/thumb.jpg",
        "thumb": "http://valid.url/to/thumb.jpg"
    }
}
```
All feilds required. `infoURL` and `imageURLs` may have `null` values.

## TODO