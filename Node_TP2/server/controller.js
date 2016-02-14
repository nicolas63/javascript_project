class Controller{
	
	constructor(){
		this.episodes = [];
	}
	
	indexAction(request, response){
		var statusCode = 200;
		if ('undefined' == typeof this.episodes || 0 == this.episodes.length) {
			statusCode = 204;
		}
		
		var bodyResponse = JSON.stringify(this.episodes);

        response.writeHead(statusCode, {'Content-Type': 'application/json', 'Content-Lenght': bodyResponse.length});
		response.write(bodyResponse); 
		response.end();
	}
	
	getEpisodeAction(request, response){
		var url = require('url');
		var parsedUrl = url.parse(request.url, true);
		var queryAsObj = parsedUrl.query;	
		var responseSent = false;
		
		this.episodes.forEach(function(entry) {
			if (entry.id == queryAsObj.id) {
				response.writeHead(200, {"Content-Type" : "application/json"});
				response.write(JSON.stringify(entry));
				response.end();
				responseSent = true;
				return;
			}
		 });
		 
		 if (!responseSent) {
			response.writeHead(404, {"Content-Type" : "application/html"});
			response.write('<html><body>404</body></html>'); 
			response.end();
		}
	}
	
	addAction(request, response){
		var episodes = this.episodes;
		var body = '';
		request.on('data', function(data){
			body += data;			
		});	
		
		request.on('end', function() {
			var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
			body = JSON.parse(body);
			var newEpisode = {
				id: randLetter + Date.now(),
				title: body.title,
				season: body.season,
				episode: body.episode
			};
			episodes.push(newEpisode);	
			var bodyResponse = JSON.stringify(newEpisode);
            response.writeHead(201, {'Content-Type': 'application/json', 'Content-lenght': bodyResponse.length});
			response.write(bodyResponse);
            //response.write(`STATUS : 200`+`HEADERS: [{'Content-Type' : 'text/html', 'Connection': 'Keep-Alive', 'Transfer-Encoding': 'none', 'Content-Lenght': 1000}]`+ `BODY: ` + bodyResponse);
			response.end();
		});
	}
}

module.exports = Controller
