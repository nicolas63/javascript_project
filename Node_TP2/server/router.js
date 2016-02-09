
var url = require('url');

class Router {
	
	constructor(){				
		this.mapGet = new Map();
		this.mapPost = new Map();
	}
	
	addGet(path,callback){
		this.mapGet.set(path, callback);
	}
	addPost(path,callback){
		this.mapPost.set(path, callback);
	}
	
	handle(request,response){
		//console.log(this['mapGet']);
		var pathname = url.parse(request.url).pathname;
		console.log('Request handled for : ' + pathname + ' with ' + request.method + ' method');
		switch(request.method){					
			case 'GET' : 
				if(!this.mapGet.has(pathname)){
					response.writeHead(404,{"Content-Type" : "application/html"});
					response.write('<html><body>404</body></html>'); 
					response.end();
				}else{
					this.mapGet.get(pathname)(request,response);
				}
					
				break;
				
			case 'POST' :
			if(!this.mapPost.has(pathname) ){
					response.writeHead(404,{"Content-Type" : "application/html"});
					response.write('<html><body>404</body></html>'); 
					response.end();
				}else{
					this.mapPost.get(pathname)(request,response);
				} 
				break;
				
			default : 
				response.writeHead(405,{"Content-Type" : "application/html"});
				response.write('<html><body>405</body></html>'); 
				response.end();
			
		}
	}
}
module.exports = Router
