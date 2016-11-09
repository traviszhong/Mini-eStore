'use strict';

var mongoose = require('mongoose');
var styleModel = function(){
  var styleSchema = mongoose.Schema({
    name: String
  });
  return mongoose.model('Style', styleSchema);
}
module.exports = new styleModel();
