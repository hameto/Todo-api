var express = require ('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet Mama for lunch',
	completed: false,
}, {
	id: 2,
	description: 'Go for a bikeride',
	completed: false,
}, {
	id: 3,
	description: 'Mock up new map idea',
	completed: true,
}];

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


app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});