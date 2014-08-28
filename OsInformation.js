'use strict';

var os=require('os');
var ifaces=os.networkInterfaces();
var ips = [];

// module from stack-overflow
//http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js

for (var dev in ifaces) {
  var alias=0;

  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4') {
      console.log(dev+(alias?':'+alias:''),details.address);

      ips[alias] = details.address;

      ++alias;
    }
  });
}

var information = { 
	"ips" : ips 
};

module.exports = information;