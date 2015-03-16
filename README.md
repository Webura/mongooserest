# mongooserest
A RESTful API for Mongoose with Express

## Setup


Add the mongooserest middleware in your express:

```
var express = require("express");
var bodyParser = require("body-parser");
var mongooserest = require("mongooserest");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


//...

var app = express();
app.use(bodyParser.json());
app.use('/api', mongooserest(mongoose));
//...

```

Define your mongoose models

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var book = new Schema({
  title: {type: String, required: 'Title is required', index: {unique: true}}
});
var Book = mongoose.model('book', book);
```

## RESTful API


### GET (find)


```
$.JSON('/api/book', function(books){
    console.log(books); // [{title: "Book1", _id: 11111111}, {title: "Book2", _id:22222222}]
});

$.JSON('/api/book/11111111', function(book){
    console.log(book); // {title: "Book1", _id: 11111111}
});

//Special queries
var query = encodeURI(JSON.stringify({title: "book2"}));
$.JSON('/api/book?query=' + query, function(books){
    console.log(books); // [{title: "Book2", _id:22222222}]
});


//For paging large data set
$.JSON('/api/book/count', function(result){
    console.log(result); // {count: 2}
});
$.JSON('/api/book?skip=2&limit=1', function(books){
    console.log(books); // [{title: "Book2", _id:22222222}]
});

```


### POST (insert)

```
$.post('/api/book', {title:'Book3}, function(book){
    console.log(book); // {title: "Book3", _id: 33333333}
});
```

### PUT (update)

```
$.ajax({
    url: '/api/book/33333333',
    type:'PUT'
    data: {title:'Book3a},
    success: function(book){
                console.log(book); // {title: "Book3a", _id: 33333333}
            }
});
```

### DELETE (remove)

```
$.ajax({
    url: '/api/book/33333333',
    type:'DELETE'
    success: function(){
                console.log('deleted');
            }
});
```

