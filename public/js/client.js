var todosApp =  angular.module('todosApp', []);

todosApp.config(function ($routeProvider){
	$routeProvider.when('/todos', {
		template:angular.element(todos_tmpl).text(),
		controller:'todosController'
	}).when('/todos/:id', {
		template:angular.element(todos_tmpl).text(),
		controller:'todosController'
	}).
	otherwise({redirectTo:'/todos'});
}
);

todosApp.controller('todosController',function ($scope, $http, $location){
	$http.get($location.$$path).success(function(data){
		$scope.todos = data;
	});
});