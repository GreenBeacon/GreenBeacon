
// var IDcount = 1;

// var tickets = [
//   { username: 'Natasha', message: 'HELP ME', location: 'Kitchen', ID: 1, date: new Date(), claimed: false, solved: false },
//   { username: 'Alina', message: 'Help with backbone', location: 'Couch', ID: 2, date: new Date(), claimed: false, solved: false },
//   { username: 'Conor', message: 'How do you react?', location: 'Pairing', ID: 3, date: new Date(), claimed: false, solved: false },
//   { username: 'Zack', message: 'ugh, Grunt', location: 'Lecture Hall', ID: 4, date: new Date(), claimed: false, solved: false }
// ];

var pg = require('pg');
var Sequelize = require('sequelize');

//Models
var User = require('./db/schema').User;
var Ticket = require('./db/schema').Ticket;
var Claim = require('./db/schema').Claim;


//establish database connection for querying
var db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/beacon', {
 dialect: 'postgres'
});

db
 .authenticate()
 .then(function(err) {
   console.log('Connection established');
 })
 .catch(function(err) {
   console.log('Unable to connect: ', err);
 });



module.exports = {

  newUser: (req, res, next/*, username, cb*/) => {
    User.findOrCreate({ where: { username: req.session.passport.user.username, displayname: req.session.passport.user.displayName } })
      .then(function(user) {
        req.session.userID = user[0].dataValues.id;
        next();
      });
  },

  isLoggedIn: (req, res, next) => {
    //console.log('SESSION ', req.session)
    if(req.session && req.session.passport && req.session.passport.user.username && req.session.passport.user.provider === 'github'){
      next();
    } else {
      res.end('failed');
    }
  },

  terminateSession: (req, res) => {
    console.log('terminateSession');
    req.session.destroy();
    res.redirect('/#/signin');
  },

  getTickets: (req, res) => {
    console.log('getTickets');

    Ticket.findAll({ include: [User] })
      .then(function(tickets){
        console.log('TICKETS WITH USER ', tickets);
        Claim.findAll({ include: [User, Ticket] })
          .then(function(claims) {
            res.send({ tickets: tickets, claims: claims, userID: req.session.userID });
          });
      });
  },

  addToQueue: (req, res) => {
    console.log('addToQueue', req.session);

    Ticket.create({ message: req.body.message, location: req.body.location, x: req.body.x, y: req.body.y, color: req.body.color, userId: req.session.userID })
      .then(function(ticket) {
        //console.log('NEW TICKET ', ticket);
        Ticket.findAll({})
          .then(function(tickets) {
            //console.log('ALL TICKETS ', tickets);
            res.json(tickets);
          });
      });
  },

  tagClaimed: (req, res) => {
    console.log('claimed ', req.body.id);
    Ticket.find({ where: { id: req.body.id } })
      .then(function(ticket) {
        ticket.update({ claimed: true })
          .then(function() {
            Claim.create({ userId: req.session.userID, ticketId: req.body.id, helpeeId: req.body.userId })
              .then(function() {
                res.end();
              });
          });
      });
  },

  eraseClaim: (req, res) => {
    console.log('eraseClaim', req.body);
    Claim.destroy({ where: { id: req.body.id } })
      .then(function() {
        Ticket.find({where: {id: req.body.ticketId } })
          .then(function (ticket) {
            ticket.update({ preSolved: true } )
              .then(function (){
                res.end();
              });
          });
      });
  },

  tagSolved: (req, res) => {
    console.log('solved');
    Ticket.find({where: {id: req.body.id}})
      .then(function(ticket) {
        ticket.update({ solved: true })
          .then(function () {
            res.end();
          });
      });
  },

  tagUnSolved: (req, res) => {
    console.log('solved');
    Ticket.find({where: {id: req.body.id}})
      .then(function(ticket) {
        ticket.update({ preSolved: false, claimed: false })
          .then(function () {
            res.end();
          });
      });
  }

};
