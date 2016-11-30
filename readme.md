# library-api
A simple RESTful API for looking up, storing and retreiving book information.

## Endpoint Map

### GET /books
Get a listing of all book objects with associated ids and all information 

### GET /books/id 
Get a particular book by id

### POST /books/isbn_lookup 
Returns JSON object with book information. Requires isbn to be passed in data

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

### POST /books

Add a book to the database. 

Example Request

```json
{}
```

### PUT /books/:id 
Modify a book record by id.

Example Request

```json
{}
```

### DELETE /books/:id 

Remove a book record from the database by id

## TODO