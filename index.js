config = require('config')

express = require('express')
handlebars = require('handlebars')

var app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function(req, res, next) {
    res.render('index', {title: "HELLO", content: "Hello, worasdfadsf!"});
});

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.sessionSecret,
    store: new MongoStore(options)
}));

const mongoose = require('mongoose');

// Basic usage
mongoose.connect(connectionOptions);

app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.get('/parkingDiagram', function(req, res) {
    var nums = [];
    for(var i = 1 ; i < 62; i++) {
        nums.push(i);
    }
    var nums61 = [];
    for(var i = 74 ; i > 61; i--) {
        nums61.push(i);
    }
    var nums86 = [];
    for(var i = 105 ; i > 74; i--) {
        nums86.push(i);
    }
    var nums98 = [];
    for(var i = 122 ; i > 105; i--) {
        nums98.push(i);
    }
    res.render('parkingDiagram', {title: "Parking Diagram", nums: nums, nums61: nums61, nums86: nums86, nums98: nums98});
});

app.listen(3000);
