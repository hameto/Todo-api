// purpose
// load all the modules into Sequelize
// return that db connection to server.jsq1


var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/data/dev-todo-api.sqlite'
});

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js'); // let's you load external sequelize files
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;