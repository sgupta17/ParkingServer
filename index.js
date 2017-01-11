config = require('./config')
Account = require('./models/username')
express = require('express')
hbs = require('hbs');
var helpers = require('handlebars-helpers')({
  handlebars:hbs
});
bodyParser = require('body-parser')
var dbSession = require('./models/session')
timestamps = require('mongoose-timestamp');
position = require('./models/position');
ordinal = require('ordinal').english;
parkingSpot = require('./models/parkingSpot');
var passport = require('passport');


var app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/parkingjuniors');
const session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Account.findById(id, function(err, user) {
            done(err, user);
        });
    });

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '272308266717-r3mi6mjr9798tapo9btd4nhtp0mnbdll.apps.googleusercontent.com',
    clientSecret: 'ySiF779MuFPQuj25s9wISz_a',
    callbackURL: "https://www.kdsatp.org/juniors/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
	//console.log(profile);	
	//console.log(profile.emails);
    Account.create({ googleId: profile.id }, function (err, user) {
      	if(err) throw err;
	user.email = profile.emails[0].value;
	user.name = profile.displayName;
	user.save(function(err, user2) {
		return cb(err, user2);
	});
    });
  }
));

app.use(session({
    secret: config.sessionSecret,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

position.findOne({}, function(err, pos) {
  // console.log(pos);
  if(pos == null) {
    newPos = new position();
    newPos.pos = [];
    newPos.save(function (err){
      if(err) throw err;
    })
  }
});

parkingSpot.findOne({}, function(err, spot) {
  if(spot == null) {
    for(var i = 0; i < 122; i++){
      newSpot = new parkingSpot();
      newSpot.taken = false;
      newSpot.spot = i+1;
      newSpot.save(function (err){
        if(err) throw err;
      })
    }
  }
})

app.get('/', function(req, res, next) {
    if(req.session.passport) {
	res.render('Parking');
    } else { 
    	res.redirect('/juniors/auth/google');
    }
});

app.get('/updatepos', function(req, res, next) {
  position.findOne({}).populate('pos').exec(function(err, line) {
    if (err) throw err;
    var counter = 0;
    // console.log(line.pos);
    for(var i=0; i < line.pos.length; i++) {
      if(line.pos[i].linkSession == req.session.id) {
        counter = i+1;
        break;
      }
    }
    res.json({pos: ordinal(counter)});
  });
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.profile.emails.read'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    return res.redirect('/juniors');
  });

app.get('/waiting', function(req, res, next) {
  position.findOne({}).populate('pos').exec(function(err, line) {
    if (err) throw err;
    var counter = 0;
    // console.log(line.pos);
    for(var i=0; i < line.pos.length; i++) {
     if(line.pos[i].linkSession == req.session.id) {
        counter = i+1;
        break;
      }
    }
    if (counter == 1) {
      res.redirect('parkingDiagram');
    } else if (counter == 0) {
      res.redirect('/');
    } else {
    res.render('waiting', {pos: ordinal(counter)});
    }
  })
});

app.get('/completed', function(req, res, next) {
    res.render('completed');
});

app.get('/timeout', function(req, res, next) {
    res.render('timeout');
});

app.get('/duplicate', function(req, res, next) {
    res.render('duplicate');
});

app.post('/', 
function(req, res){
	console.log(req.session);
	console.log(req.user);  
	
dbSession.findOne({"_id": req.session.id}, function(err, session) {
      if(err) throw err;
      if(session) {
	Account.findOne({_id: req.session.passport.user}, function(err, user) {
	     user.makemodel = req.body.makemodel;
             user.plate = req.body.plate;
             user.sticker = req.body.sticker;
		user.linkSession = session._id;
             user.save(function (err){
               if(err) throw err;
               position.update({},
                 {$push: { "pos": user }},
                 function(err) {
                   if(err) { throw err }
                 });
             });
           });
	}
	});
        return res.redirect('waiting');
})

app.get('/parkingDiagramSenior', function(req, res) {
  position.findOne({}).populate('pos').exec(function(err, line) {
    if (line.pos[0] == undefined) {
      res.redirect('/')
    } else {
    if (line.pos[0].linkSession == req.session.id) {
    if (err) throw err;

    parkingSpot.find({}, function(err, arrSpots) {
      if(err) throw err;
      var spots = {};
      for(var i = 0; i < arrSpots.length; i++) {
        spots[arrSpots[i].spot] = arrSpots[i];
      }
      var nums = [];
      for(var i = 1 ; i < 62; i++) {
          nums.push(spots[i]);
      }
      var nums61 = [];
      for(var i = 74 ; i > 61; i--) {
          nums61.push(spots[i]);
      }
      var nums86 = [];
      for(var i = 105 ; i > 74; i--) {
          nums86.push(spots[i]);
      }
      var nums98 = [];
      for(var i = 122 ; i > 105; i--) {
          nums98.push(spots[i]);
      }
      res.render('parkingDiagramSenior', {title: "Parking Diagram Seniors", nums: nums, nums61: nums61, nums86: nums86, nums98: nums98});

    });
  } else {
    res.redirect('waiting');
  }
}
});

});

app.get('/parkingDiagram', function(req, res) {
  position.findOne({}).populate('pos').exec(function(err, line) {
    if (line.pos[0] == undefined) {
      res.redirect('/')
    } else {
    if (line.pos[0].linkSession == req.session.id) {
    if (err) throw err;

    parkingSpot.find({}, function(err, arrSpots) {
      if(err) throw err;
      var spots = {};
      for(var i = 0; i < arrSpots.length; i++) {
        spots[arrSpots[i].spot] = arrSpots[i];
      }
      var nums = [];
      for(var i = 1 ; i < 24; i++) {
          nums.push(spots[i]);
      }
      var nums30 = [];
      for(var i = 47 ; i > 23; i--) {
          nums30.push(spots[i]);
      }
      var nums60 = [];
      for(var i = 48 ; i < 72; i++) {
          nums60.push(spots[i]);
      }
      var nums90 = [];
      for(var i = 72 ; i < 97; i++) {
          nums90.push(spots[i]);
      }
      res.render('parkingDiagram', {title: "Parking Diagram Juniors", nums: nums, nums30: nums30, nums60: nums60, nums90: nums90});

    });
  } else {
    return res.redirect('waiting');
  }
}
});

});

app.post('/parkingDiagram', function(req, res) {
  Account.findOne({linkSession: req.session.id}, function(err, user) {
      if(err) throw err;
      position.findOne({}, function(err, pos) {
        if(pos != null) {
          pos.pos.shift();
          pos.save(function (err){
            if(err) throw err;
          })
        }
      });
      if (!(req.body.parkingSpot)) {
        Account.findOneAndRemove({linkSession: req.session.id}, function (err) {
          res.redirect('timeout');
          if (err) throw err;
      });
      } else {
      parkingSpot.findOne({spot: req.body.parkingSpot}, function (err, spot) {
        spot.linkedStudent = user;
        spot.taken = true;
        user.linkedSpot = spot.spot;
        spot.save(function (err){
          if(err) throw err;
        })
        user.save(function (err){
          if(err) throw err;
        })
      })
      res.redirect('completed');
    }
  });
});

app.post('/parkingDiagramSenior', function(req, res) {
  Account.findOne({linkSession: req.session.id}, function(err, user) {
      if(err) throw err;
      position.findOne({}, function(err, pos) {
        if(pos != null) {
          pos.pos.shift();
          pos.save(function (err){
            if(err) throw err;
          })
        }
      });
      if (!(req.body.parkingSpot)) {
        Account.findOneAndRemove({linkSession: req.session.id}, function (err) {
          res.redirect('timeout');
          if (err) throw err;
      });
      } else {
      parkingSpot.findOne({spot: req.body.parkingSpot}, function (err, spot) {
        spot.linkedStudent = user;
        spot.taken = true;
        user.linkedSpot = spot.spot;
        spot.save(function (err){
          if(err) throw err;
        })
        user.save(function (err){
          if(err) throw err;
        })
      })
      res.redirect('completed');
    }
  });
});

// app.post('/timeout', function(req, res) {
//     Account.findOneAndRemove({linkSession: req.session.id}, function (err) {
//       if (err) throw err;
//   });
// });

app.listen(3001);
