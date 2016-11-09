'use strict';

var Song = require('../models/songModel');

module.exports = function (router) {
    router.get('/', function (req, res) {
      Song.find({},function(err,songs){
        if(err){
          console.log(err);
        }
        songs.forEach(function(song){
          song.truncText = song.truncText(50);
        });
        var model = {
          songs: songs
        };
        res.render('index', model);
      });
    });
};
