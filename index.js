express = require('express')
handlebars = require('handlebars')

var app = express();
app.set('view engine', 'hbs');

app.get('/', function(req, res, next) {
    res.render('index', {title: "HELLO", content: "Hello, worasdfadsf!"});
});

app.listen(3000);
