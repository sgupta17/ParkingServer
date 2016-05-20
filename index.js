express = require('express')
handlebars = require('handlebars')

var app = express();
app.set('view engine', 'hbs');

app.get('/', function(req, res, next) {
    res.render('index', {title: "HELLO", content: "Hello, worasdfadsf!"});
});

app.get('/radiodemo', function(req, res) {
    var nums = [];
    for(var i = 0 ; i < 154; i++) {
        nums.push(i);
    }
    res.render('radiodemo', {title: "Radio Demo", nums: nums});
});

app.listen(3000);
