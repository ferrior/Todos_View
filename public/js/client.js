var todosApp =  angular.module('todosApp', []);

todosApp.controller('todosController',function ($scope){
	$scope.todos = [{title:'title1'}, {title:'title2'}];
});