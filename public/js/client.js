var todosApp =  angular.module('todosApp', []);

todosApp.config(function ($routeProvider){
	$routeProvider.when('/todos', {
		template:angular.element(todos_tmpl).text(),
		controller:'todosController'
	}).
	otherwise({redirectTo:'/todos'});
}
);

todosApp.controller('todosController',function ($scope, $http){
	$http.get('/todos').success(function(data){
		$scope.todos = data;
	});
});