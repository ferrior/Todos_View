var todosApp =  angular.module('todosApp', []);

todosApp.config(function ($routeProvider){
	$routeProvider.when('/todos', {template:angular.element(todos_tmpl).text()}).
	when('/todos/:id', {template:'test2'}).
	otherwise({redirectTo:'/todos'});
}
);

todosApp.controller('todosController',function ($scope){
	$scope.todos = [{title:'title1'}, {title:'title2'}];
});