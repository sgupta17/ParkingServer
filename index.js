express = require('express')
handlebars = require('handlebars')

var app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function(req, res, next) {
    res.render('index', {title: "HELLO", content: "Hello, worasdfadsf!"});
});

app.get('/parkingDiagram', function(req, res) {
    var nums = [];
    for(var i = 1 ; i < 62; i++) {
        nums.push(i);
    }
    var nums61 = [];
    for(var i = 122 ; i > 61; i--) {
        nums61.push(i);
    }
    res.render('parkingDiagram', {title: "Parking Diagram", nums: nums, nums61: nums61});
});

app.listen(3000);
