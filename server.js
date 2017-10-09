var express = require ('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express(); 
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextID = 1; //for incrementing DB

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
})

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedToDo =_.findWhere(todos, {id: todoID});

	if (matchedToDo) {
		res.json(matchedToDo);
	} else {
		res.send('404: something is fucked up. try again homie');
		res.status(404).send();
	};
});


// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if ( !_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0 ) {
		return res.status(400).send();	
	}

	// set body.description to be trimmed value
	body.description = body.description.trim();

	// add id field
	body.id = todos.length + 1;

	// push body into array
	todos.push(body);
	
	res.json(body);
});


// DELETE /todos/:id
// app.delete('/todos/:id', function (req, res) {
// 	var todoID = parseInt(req.params.id, 10);
// 	var matchedToDo =_.findWhere(todos, {id: todoID});

// 	if (matchedToDo !== null) {
// 		todos = _.without(todos, matchedToDo);
// 		res.send(matchedToDo);
// 	} else {
// 		res.send('404: something is fucked up. try again homie');
// 		res.status(404).send();
// 	};
// });

app.delete('/todos/:id', function (req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedToDo =_.findWhere(todos, {id: todoID});

	if (!matchedToDo) {
		res.status(404).send('404: something is fucked up. try again homie');
	} else {
		todos = _.without(todos, matchedToDo);
		res.send(matchedToDo);
	};
});


app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});




