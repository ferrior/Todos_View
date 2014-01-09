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
		this.route('todos',{path:'/todos/:id'});
		this.route('users',{path:'/people/:name'});// access index.html#/people
	});

	App.TodosRoute = Em.Route.extend({
		model:function(){
			return [{title:'todo11'},{title:'todo22'}];
		}
	});
});