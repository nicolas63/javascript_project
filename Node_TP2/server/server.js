var http = require('http');
var Router = require('./router');
var Controller = require('./controller')

function start(port){
	var router = new Router();
	var controller = new Controller();
	
	router.addGet('/', function(request, response){
		controller.indexAction(request, response);
	});
	
	router.addGet('/episode', function(request, response){
		controller.getEpisodeAction(request, response);
	});
		
	router.addPost('/', function(request, response){
		controller.addAction(request, response);
	});
	
	http.createServer(function(request, response) {
		router.handle(request,response);
	}).listen(port);
	
	console.log('Server is now running on port ' + port);
}

exports.start = start;
