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
	App.ApplicationView = Em.View.extend({
		templateName:"todos"
	});
});