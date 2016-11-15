'use strict';

var mongoose=require('mongoose');

var db = function(){
  return{
    config: function(conf){
//      mongoose.connect('mongodb://localhost/musicstore');
      mongoose.connect('mongodb://zymusic:123@ds153657.mlab.com:53657/musicstore');
      var db = mongoose.connection;
      db.on('error',console.error.bind(console,'Connection error'));
      db.once('open',function(){
        console.log('db connection opened');
      });
    }
  }
}
module.exports = db();
