// basic server
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
// Middleware
var parser = require('body-parser');
var authorize = require('./authHelpers.js');
var routes = require('./routes.js');
var config = require('./config.js');
var app = express();

console.log(config.keys)


passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((user,done) => {

        if (!err) done(null, user);
        else done(err, null);
});

passport.use(new GitHubStrategy({
  clientID: config.keys.gitHubClientId,
  clientSecret: config.keys.gitHubSecretKey,
  callbackURL: config.keys.gitCallbackUrl,
}, function(accessToken, refreshToken, profile, done) {

  process.nextTick(function () {

    return done(null, profile);
    })
  }
))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, X-HTTP-Method-Override, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/Client'));
app.use(parser.json());
// app.use(session({ secret: 'login to our new site',
//           resave : true,
//           saveUninitialized: true,
//           cookie: {maxAge: 30000},
//     }));

app.get('/auth/github',

        passport.authenticate('github', { scope: [ 'user:email' ] }),
        function(req, res){
          // The request will be redirected to GitHub for authentication, so this
          // function will not be called.
        });
app.get('/callback',
        passport.authenticate('github', { failureRedirect: '/session' }),
        (req, res) => {
          console.log('SESSION:', req.session);
          res.redirect('/');
        });

routes.router(app);

app.set('port', process.env.PORT || 3000);
// Logging and parsing


// Serve the client files





app.listen(app.get('port'), function(){
  console.log('listening on port: ', app.get('port'))
});


module.exports.app = app;
