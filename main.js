'use strict';

var http = require('http');
var conf = require('conf');

var options = {
  host: 'https://api.instagram.com',
  path: '/v1/media/popular?client_id=' + conf.CLIENT_ID + '&callback=JSON_CALLBACK'
};

callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}