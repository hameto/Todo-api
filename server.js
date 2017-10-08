var express = require ('express');
var bodyParser = require('body-parser');

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
	var matchedToDo;

	todos.forEach(function (todo) {
		if (todoID === todo.id) {
			matchedToDo = todo;
		} 
	});

	if (matchedToDo) {
		res.json(matchedToDo);
	} else {
		res.send('404: something is fucked up. try again homie');
		res.status(404).send();
	};
});


// POST /todos
app.post('/todos', function (req, res) {
	var body = req.body;


	// add id field
	body.id = (todos.length + 1);

	// push body into array
	todos.push(body);
	
	res.json(body);
});



app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});