config = require('./config')
Account = require('./models/username')
express = require('express')
handlebars = require('handlebars')
bodyParser = require('body-parser')
var dbSession = require('./models/session')
timestamps = require('mongoose-timestamp');
position = require('./models/position');

var app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/parking');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.sessionSecret,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

position.findOne({}, function(err, pos) {
  console.log(pos);
  if(pos == null) {
    newPos = new position();
    newPos.pos = [];
    newPos.save(function (err){
      if(err) throw err;
    })
  }
})

app.get('/', function(req, res, next) {
    res.render('Parking');
});




app.get('/waiting', function(req, res, next) {
  position.findOne({}).populate('pos').exec(function(err, line) {
    if (err) throw err;
    var counter = 0;
    console.log(line.pos);
    for(var i=0; i < line.pos.length; i++) {
      if(line.pos[i].linkSession == req.session.id) {
        counter = i+1;
        break;
      }
    }
    res.render('waiting', {pos: counter});
  })
});

app.post('/', function(req, res){
  dbSession.findOne({"_id": req.session.id}, function(err, session) {
      if(err) throw err;
      if(session) {
        console.log(session);
        username = new Account();


        username.name = req.body.name;
        username.email = req.body.email;
        username.makemodel = req.body.makemodel;
        username.plate = req.body.plate;
        username.sticker = req.body.sticker;
        username.linkSession = session._id;
        username.save(function (err){
          if(err) throw err;
          console.log(username.createdAt); // Should be approximately now
          console.log(username.createdAt === username.updatedAt); // true
          // Wait 1 second and then update the user

        position.update({},
        {$push: { "pos": username }},
        function(err) {
          if(err) { throw err }
      });

        });
      }
    });
  res.render('Parking');
  res.redirect('waiting')
})

app.get('/parkingDiagram', function(req, res) {
    Account.findOne({linkSession: req.session.id}, function(err, user) {
        if(err) throw err;
        console.log(user);
    });
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
