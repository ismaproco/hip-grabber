'use strict';

var conf = require('./conf');
var InstagramHelper = require('./InstagramHelper');
var modelInstagram = require('./ModelInstagram');

var instagram = new InstagramHelper(conf.CLIENT_ID);

console.log(instagram);

modelInstagram.on('init',function(){

    instagram.makeRequest(function(result){

        console.log("RHIS ->"+result);

        var data = JSON.parse( result ).data;

        // data exists?
        if(data)
        {
            for (var i = data.length - 1; i >= 0; i--) {
                var dbo = modelInstagram.buildDataBaseObject( data[i] );
                modelInstagram.save(dbo);
            };    
        }

        
        //Close the connection after the execution of saves.
        setTimeout(function(){
            modelInstagram.close();
        },2000);
    });

});


modelInstagram.on('error',function(){
    console.log(" --> Error");
});

modelInstagram.init();



