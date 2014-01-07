var todosapp = angular.module('todosapp', []);

todosapp.directive('todoinput', function() {
	return {
		restrict: 'A',
		replace: true,
		link: function postLine(scope, iElement, iAttrs) {
			var socket = iElement.injector().get('socket');
			iElement.bind('keypress', function(e) {
				if (e.charCode !== 13)
					return;
				scope.$$childTail.createTodo();
				scope.newTitle = '';
			});
		}
	}
});

todosapp.controller('todosController', function($scope, $http, $location, socket) {
	$http.get($location.$$path).success(function(data) {
		$scope.todos = data;
	});
	$scope.createTodo = function() {
		var newTitle = $scope.newTitle.trim();
		if (!newTitle)
			return;
		var todo = {
			title: newTitle
		};
		$http.post('/todos',todo).success(function(data) {
			console.log(data);
		});
	};
});


todosapp.factory('socket', function() {
	var socket = io.connect('http://localhost:9432');
	socket.on('msg', function(data) {
		console.log(data);
		if (data.todos)
			$rootScope.todos = data.todos;
	});
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback)
						callback.apply(socket, args);
				});

			});
		}
	}
});

function todosRouteConfig($routeProvider) {
	$routeProvider.when('/todos', {
		template: angular.element(todos).text(),
		controller: "todosController"
	}).
	when('/todos/:id', {
		template: angular.element(todos).text(),
		controller: "todosController"
	}).
	otherwise({
		redirectTo: '/todos'
	});
}

todosapp.config(todosRouteConfig);