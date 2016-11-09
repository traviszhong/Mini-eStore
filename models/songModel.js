'use strict';

var mongoose = require('mongoose');
var songModel = function(){
  var songSchema = mongoose.Schema({
    title: String,
    style: String, //id of style
    description: String,
    author: String,
    price: Number,
    cover: String,
    url: String
  });
  songSchema.methods.truncText = function(length){
    return this.description.substring(0,length);
  };
  return mongoose.model('Song', songSchema);
}
module.exports = new songModel();
