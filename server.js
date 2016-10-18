// basic server
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
// Middleware
var parser = require('body-parser');
//var authorize = require('./authHelpers.js');
var routes = require('./routes.js');
var config = require('./config.js');


var app = express();

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: config.keys.gitHubClientId,
  clientSecret: config.keys.gitHubSecretKey,
  callbackURL: config.keys.gitCallbackUrl,
}, (accessToken, refreshToken, profile, done) => {

    process.nextTick(() => {
      return done(null, profile);
    });
  }
));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 600000*3} //30 minutes
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/Client'));
app.use(parser.json());

routes.router(app);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('listening on port: ', app.get('port'))
});


module.exports.app = app;
