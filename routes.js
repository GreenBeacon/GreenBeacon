// var helpers = require('./authHelpers');
var passport = require('passport');
var helpers = require('./routehelpers');
module.exports.router = function(app){

  app.get('/signin', function(req, res){
    res.redirect('/auth/github');
  });
  app.get('/signout', helpers.terminateSession)
  // app.get('/auth/github',
  //     passport.authenticate('github', { scope: [ 'user:email' ] }),
  //     function(req, res){
  //       // The request will be redirected to GitHub for authentication, so this
  //       // function will not be called.
  //     });
  //
  // app.get('/callback',
  //     passport.authenticate('github', { failureRedirect: '/session' }),
  //     (req, res) => {
  //       console.log('SESSION:', req.session);
  //       res.redirect('/');
  //     });
  app.get('/tickets', helpers.getTicketsFunc);


  app.post('/tickets', helpers.addToQueue);


  app.put('/claimed', helpers.tagClaimed);
  app.put('/solved', helpers.tagSolved);
}
