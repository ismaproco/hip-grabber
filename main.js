'use strict';

var conf = require('./conf');
var InstagramHelper = require('./InstagramHelper');

var instagram = new InstagramHelper(conf.CLIENT_ID);

console.log(instagram);

instagram.makeRequest(function(result){
    console.log('received response'+1);
});