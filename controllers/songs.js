'use strict';
var Song = require('../models/songModel');
var Style = require('../models/styleModel');
module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('index');
    });
    router.get('/details/:id', function (req, res) {
        Song.findOne({_id: req.params.id},function(err,song){
          if(err){
            console.log(err);
          }
          var model = {
            song: song,
            messages: req.flash('info')
          };
          res.render('songs/details',model);
        });
    });
};
