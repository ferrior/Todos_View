require.config({
	baseUrl:'js/libs',
	paths:{
		'$':'jquery',
		'tmpl':'handlebars',
		'em':'ember'
	}
});

require(['$','tmpl','em'], function(){
	window.App = Em.Application.create();
	/*App.ApplicationView = Em.View.extend({
		templateName:"todos"
	});*/
	App.Router.map(function(){
		this.route('todos',{path:'/'});
	});
	App.Todo = Em.Object.extend({
		title:null,
		isCompleted:false
	});

	App.TodosRoute = Em.Route.extend({
		model:function(){
			var todos = [];
			for (var i = 1; i < 4; i++){
				todos.push(App.Todo.create({
					title:"Todo_"+i
				}));
			}
			return todos;
		}
	});
	App.TodosController = Em.ArrayController.extend();
});