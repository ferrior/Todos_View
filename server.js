var express = require('express'),
mongoose = require('mongoose'),
app = express();

mongoose.connect("mongodb://localhost:27017/todos");
var Todo = mongoose.model('Todo', new mongoose.Schema({
	id:{
		type:Number,
		index:true
	},
	title:String,
	isCompleted:Boolean
}));

app.use(express.bodyParser());
app.use(express.static('public'));

app.get('/todos', function(req,res){
	Todo.find({}, function(err,data){
		res.send({
			todos:data
		});
	});

});

app.post('/todos', function(req,res){
	var todo = new Todo(req.body.todo);
	todo.save();
});

app.listen(9432,function(){
	console.log('server is running');
});