'use strict';

var https = require('https');

var InstagramHelper = function(client_id){

    var path = '/v1/media/popular?client_id='+client_id+'&callback=JSON_CALLBACK';

    // Options to make the request
    var options = {
      hostname: 'api.instagram.com',
      port: 443,
      path: path,
      method: 'GET'
    };

    // Starts the http response
    this.makeRequest = function request(fn){
        var responseData = "";

        var req = https.request(options, function(res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            // receive the response buffer
            res.on('data', function(d) {
                responseData += d;
            });

            // execute action when the response ends
            res.on('end', function () {
                if(fn)
                {
                    fn(responseData);
                }
            });
        });

        //close the response
        req.end();

        // executes action when an error happen
        req.on('error', function(e) {
            console.error(e);
            if(fn)
            {
                fn(responseData);
            }
        });    
    }
}

module.exports = InstagramHelper;