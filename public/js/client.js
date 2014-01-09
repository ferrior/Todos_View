require.config({
	baseUrl:'js/libs',
	paths:{
		'$':'jquery',
		'tmpl':'handlebars',
		'em':'ember',
		'ember_data':'ember-data'
	}
});

require(['$','tmpl','em'], function(){
	require(['ember-data'], function(){
		window.App = Em.Application.create();
		/*App.ApplicationView = Em.View.extend({
			templateName:"todos"
		});*/
		App.Router.map(function(){
			this.route('todos',{path:'/'});
		});

		//begin FIXTURES
		App.ApplicationAdapter = DS.FixtureAdapter.extend();
		App.Store = DS.Store.extend({
			adapter:'DS.FixtureAdapter'
		});

		App.Todo = DS.Model.extend({
			title:DS.attr('string'),
			isCompleted:DS.attr('boolean')
		});
		//假数据
		App.Todo.FIXTURES = [
			{id:1, title:'todo1', isCompleted:true},
			{id:2, title:'todo2', isCompleted:true},
			{id:3, title:'todo3', isCompleted:true}
		];
		//end 

		App.TodosRoute = Em.Route.extend({
			model:function(){
				return this.store.find('todo');

			}
		});
		App.TodosController = Em.ArrayController.extend();
	});
});