var express = require ('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 01,
	description: 'Meet Mama for lunch',
	completed: false,
}, {
	id: 2,
	description: 'Go for a bikeride',
	completed: false,
}];

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function(req, res) {
	res.json(todos);
})

// GET /todos/:id

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});