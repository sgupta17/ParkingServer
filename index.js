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
    for(var i = 1 ; i < 59; i++) {
        nums.push(i);
    }
    var nums59 = [];
    for(var i = 122 ; i > 58; i--) {
        nums59.push(i);
    }
    res.render('parkingDiagram', {title: "Parking Diagram", nums: nums, nums59: nums59});
});

app.listen(3000);
