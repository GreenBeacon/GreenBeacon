
var messages = [
  { username: 'Natasha', message: 'HELP ME', location: 'Kitchen', ID: 1, date: new Date() },
  { username: 'Alina', message: 'Help with backbone', location: 'Couch', ID: 2, date: new Date() },
  { username: 'Conor', message: 'How do you react?', location: 'Pairing', ID: 3, date: new Date() },
  { username: 'Zack', message: 'ugh, Grunt', location: 'Lecture Hall', ID: 4, date: new Date() }
];

module.exports = {

  authfunction: function(){
    console.log('authfunction')
  },

  terminateSession: function(){
    console.log('terminateSession');
  },

  getTicketsFunc: function(){
    console.log('getTicketsFunc');
  },

  addToQueue: function(){
    console.log('conor')
  },

  tagClaimed: function(){
    console.log('claimed');
  },

  tagSolved: function(){
    console.log('hello');
  }

}
