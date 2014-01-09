require.config({
	baseUrl:'js/libs',
	paths:{
		'$':'jquery',
		'tmpl':'handlebars',
		'em':'ember',
		'ember_data':'ember-data',
		'ls':'localstorage_adapter'
	}
});

require(['$','tmpl','em'], function(){
	require(['ember-data'], function(){//ember-data require em, so load em firstly.
		require(['ls'], function(){
			window.App = Em.Application.create();
			App.Router.map(function(){
				this.route('todos',{path:'/'});
			});
			App.Todo = DS.Model.extend({
				title:DS.attr('string'),
				isCompleted:DS.attr('boolean')
			});
			App.ApplicationAdapter = DS.LSAdapter.extend({
				namespace:'todos'
			});
			App.TodosRoute = Em.Route.extend({
				model:function(){
					return this.store.find('todo');
				}
			});
			App.TodosController = Em.ArrayController.extend({
				actions:{
					createTodo:function(){
						var newTitle = this.newTitle.trim();
						if(!newTitle) return;
						var todo = this.get('store').createRecord('todo',{
							title:newTitle
						});
						todo.save();
						this.set('newTitle','');
					}
				}
			});
		});
	});
});