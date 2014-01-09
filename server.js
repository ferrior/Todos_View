var express = require('express'),
mongoose = require('mongoose'),
app = express();

app.use(express.bodyParser());
app.use(express.static('public'));

app.get('/todos', function(req,res){
	var todos = [{id:1,title:'todoa'}, {id:2,title:'todo2'}];
	res.send({
		todos:todos
	});
});

app.post('/todos', function(req,res){
	console.log(req.body.todo);
});

app.listen(9432,function(){
	console.log('server is running');
});