
var pg = require('pg')
var Sequelize = require('sequelize');


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


var User = db.define('user', {
 id: {
   type: Sequelize.INTEGER,
   primaryKey: true,
   autoIncrement: true
 },
 username: Sequelize.STRING,
 displayname: Sequelize.STRING
});

var Ticket = db.define('ticket', {
 id: {
   type: Sequelize.INTEGER,
   primaryKey: true,
   autoIncrement: true
 },
 message: Sequelize.TEXT,
 location: Sequelize.STRING,
 x: Sequelize.INTEGER,
 y: Sequelize.INTEGER,
 color: Sequelize.STRING,
 claimed: {
   type: Sequelize.BOOLEAN,
   defaultValue: false
 },
 solved: {
   type: Sequelize.BOOLEAN,
   defaultValue: false
 },
  preSolved: {
   type: Sequelize.BOOLEAN,
   defaultValue: false
 }
});

var Claim = db.define('claim', {
 id: {
   type: Sequelize.INTEGER,
   primaryKey: true,
   autoIncrement: true
 },
 helpeeId: Sequelize.INTEGER
});


User.hasMany(Ticket);
Ticket.belongsTo(User);

User.hasMany(Claim);
Claim.belongsTo(User);

Ticket.hasOne(Claim);
Claim.belongsTo(Ticket);


db
 .sync({force: false})
 .then(function() {
   console.log('Tables created');
  //  return Ticket.create({message: 'Need help HELP', location: 'kitchen' }).then(function() {
  //    console.log('Created new ticket');
  //  });
 });

module.exports = {
   User: User,
   Ticket: Ticket,
   Claim: Claim
}
