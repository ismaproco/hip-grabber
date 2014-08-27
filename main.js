'use strict';

var conf = require('./conf');
var InstagramHelper = require('./InstagramHelper');
var modelInstagram = require('./ModelInstagram');
var logger = require('./ModelLogger');

var instagram = new InstagramHelper(conf.CLIENT_ID);
var appTimeInterval = conf.APP_TIMEOUT;

var executeInstagramOps = function () {
    console.log(instagram);
    logger.log("info", "START");
    modelInstagram.on('init',function(){

        instagram.makeRequest(function(result){

            var data = JSON.parse( result ).data;

            // data exists?
            if(data)
            {
                for (var i = data.length - 1; i >= 0; i--) {
                    var dbo = modelInstagram.buildDataBaseObject( data[i] );
                    modelInstagram.save(dbo);
                };    
                logger.log("info", "Instagrams saved");
            }

            
            //Close the connection after the execution of saves.
            setTimeout(function(){
                logger.log("info", "Connection closed successfully ");        
                modelInstagram.close();
            },2000);
        });

    });


    modelInstagram.on('error',function(){
        logger.log("error", "Unable to init the connection with the data base");
        console.log(" --> Error " );
    });

    modelInstagram.init();
};

executeInstagramOps();

setInterval(executeInstagramOps,appTimeInterval);

