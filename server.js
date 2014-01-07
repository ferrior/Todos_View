var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	si = require('socket.io'),
	mongoose = require('mongoose'),
	io = si.listen(server);

io.sockets.on('connection', function(socket) {
	socket.on('todos', function(data) {
		var todo = new Todo(data);
		todo.save();
		socket.broadcast.emit('msg', {
			todos: data
		});
	});
	socket.emit('msg', {
		message: 'hello,client'
	});
});

mongoose.connect('mongodb://localhost:27017/todos');

var Todo = mongoose.model('Todo', new mongoose.Schema({
	id: {
		type: Number,
		index: true
	},
	title: String,
	isCompleted: Boolean
}));

app.use(express.bodyParser());
app.use(express.static('public'));

app.get('/todos/:id', function(req, res) {
	var todo = {
		title: 'Todo_' + req.params['id']
	}
	res.send([todo]);
});

app.get('/todos', function(req, res) {
	Todo.find({}, function(err, data) {
		console.log(err);
		console.log(data);
		res.send(data);
	});
});

app.post('/todos', function(req, res) {
	var todo = req.body;
	console.log(todo);
	var todo = new Todo(todo);
	todo.save();
	res.send('ok');
});

server.listen(9432, function() {
	console.log('Server running...');
});