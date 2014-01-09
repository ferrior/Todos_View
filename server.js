var express = require('express'),
app = express(),
si = require('socket.io'),
http= require('http'),
server = http.createServer(app);

app.use(express.bodyParser());
app.use(express.static('public'));

app.get('/todos', function(req,res){
	var todos = [{title:'title_todo_1'},{title:'title_todo_2'}];
	res.send(todos);
});

app.post('/todos', function(req,res){
	console.log(req.body);
});

server.listen(9432, function(){
	console.log('server running');
});