var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextID = 1; //for incrementing DB

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET /todos?completed=true&description=buy
app.get('/todos', function(req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		filteredTodos = _.where(todos, {
			completed: true
		});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		filteredTodos = _.where(todos, {
			completed: false
		})
	};

	// write query parameter for description that enables user to search for a term w/n the string
	// use _.filter( , )
	// use _.indexOf( , )

	if (queryParams.hasOwnProperty('description') && queryParams.description.length > 0) {
		filteredTodos = _.filter(filteredTodos, function(todo) {
			return todo.description.toLowerCase().indexOf(queryParams.description.toLowerCase()) > -1;
		});
	}

	res.json(filteredTodos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedToDo = _.findWhere(todos, {
		id: todoID
	});

	if (matchedToDo) {
		res.json(matchedToDo);
	} else {
		res.send('404: something is fucked up. try again homie');
		res.status(404).send();
	};
});


// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	// recreate same functionality but use our new todo model
	// call: db.todo.create
	//	(like we did in Todo.create in basic-sql-...)

	// call create on db.todo
	//	respond to api caller with 200 and todo (use .toJSON)
	//	res.status(400).json(e) // <--valid


	db.todo.create(body).then(function (todo) {
		res.json(todo.toJSON());
	}, function (e) {
		res.status(400).json(e);
	});


	// if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
	// 	return res.status(400).send();
	// }

	// // set body.description to be trimmed value
	// body.description = body.description.trim();

	// // add id field
	// body.id = todos.length + 1;

	// // push body into array
	// todos.push(body);

	// res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedToDo = _.findWhere(todos, {
		id: todoID
	});

	if (!matchedToDo) {
		res.status(404).send('404: something is fucked up. try again homie');
	} else {
		todos = _.without(todos, matchedToDo);
		res.send(matchedToDo);
	};
});


// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedToDo = _.findWhere(todos, {
		id: todoID
	});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedToDo) {
		res.status(404).send('404: something is fucked up. try again homie');
	};

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send('Oooh, something is fucked up. Completed should be a boolean');
	};

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description.trim();
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send('Oooh, something is fucked up w/ Description. Check up on it homie')
	};

	_.extend(matchedToDo, validAttributes);
	res.send(matchedToDo);

});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});