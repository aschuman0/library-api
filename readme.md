# library-api
A simple RESTful API for looking up, storing and retreiving book information.

## Endpoint Map

### GET /books
Get a list of all book objects with associated ids and all information 

### GET /books/id
Get a particular book object by id

### POST /books

Add a book object to the database. 

Example Request:

```json
{
  "title": "The Wind-up Bird Chronicle",
  "description": "Superimposes the collapse of a marriage over the investigation into recovered war memories and a man's search for his own identity",
  "publishedDate": "1997",
  "publisher": "Vintage",
  "authors": [
    "Haruki Murakami",
    "Jay Rubin"
  ],
  "pageCount": 607,
  "isbn": "0679775439",
  "infoUrl": "http://books.google.com/books?id=iTt3WN2U8wwC&dq=isbn:0679775439&hl=&source=gbs_api",
  "imageUrls": {
    "smThumb": "http://books.google.com/books/content?id=iTt3WN2U8wwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    "thumb": "http://books.google.com/books/content?id=iTt3WN2U8wwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  }
}
```

### POST /books/isbn_lookup 
Returns book object. Requires isbn to be passed in data.

Example Request:

```json
{
    "isbn": "978-0375701351"
}
```

### PUT /books/id 
Modify a book record by id.

Example Request:

```json
{
  "title": "The Mercy",
  "description": "poems",
  "publishedDate": "1999",
  "publisher": "Alfred A. Knopf",
  "authors": [
    "Philip Levine"
  ],
  "pageCount": 81,
  "isbn": "978-0375701351",
  "infoUrl": "https://openlibrary.org/books/OL381084M/The_mercy",
  "imageUrls": {
    "smThumb": "https://covers.openlibrary.org/b/id/228300-S.jpg",
    "thumb": "https://covers.openlibrary.org/b/id/228300-S.jpg"
  }
}
```

### DELETE /books/id 

Remove a book record from the database by id.

## Book Object

```json
{
    "title": "Book Title",
    "description": "Could be a lot of information about this book, could be a little. Hard to say.",
    "publishedDate": "2001",
    "publisher": "Fancy House",
    "authors" : [
        "Last, First",
        "First Middle Last"
    ],
    "pageCount": 256,
    "isbn": 0679747672,
    "infoURL": "http://valid.url/with/path",
    "imageURLs": {
        "smThumb": "http://valid.url/to/sm/thumb.jpg",
        "thumb": "http://valid.url/to/thumb.jpg"
    }
}
```
All feilds required but may have `null` values.

## TODO