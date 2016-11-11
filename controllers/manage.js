'use strict';
var Song = require('../models/songModel');
var Style = require('../models/styleModel');
module.exports = function (router) {
    router.get('/songs', function (req, res) {
        Song.find({},function(err,songs){
          if(err){
            console.log(err);
          }
          var model = {
            songs: songs
          };
          res.render('manage/songs/index', model);
        });
    });
    router.get('/', function (req, res) {
        res.render('manage/index');
    });
    router.get('/styles', function (req, res) {
      Style.find({},function(err,styles){
        if(err){
          console.log(err);
        }
        var model = {
          styles: styles
        };
        res.render('manage/styles/index', model);
      });
    });
    router.get('/songs/add',function(req,res){
      Style.find({},function(err,styles){
        if(err){
          console.log(err);
        }
        var model = {
          styles: styles
        };
        res.render('manage/songs/add', model);
      });
    });
    router.post('/songs',function(req,res){
      var title = req.body.title && req.body.title.trim();
      var style = req.body.style && req.body.style.trim();
      var author = req.body.author && req.body.author.trim();
      var price = req.body.price && req.body.price.trim();
      var description = req.body.description && req.body.description.trim();
      var cover = req.body.cover && req.body.cover.trim();

      if(title == '' || price == ''){
        req.flash('error', "Please fill out required fields");
        res.location('/manage/songs/add');
        res.redirect('/manage/songs/add');
      }
      if(isNaN(price)){
        req.flash('error', "Price must be a number");
        res.location('/manage/songs/add');
        res.redirect('/manage/songs/add');
      }

      var newSong = new Song({
        title: title,
        style: style,
        description: description,
        author: author,
        cover: cover,
        price: price
      });
      newSong.save(function(err){
        if(err){
          console.log('save error', err);
        }
        req.flash('success',"Song Added");
        res.location('/manage/songs');
        res.redirect('/manage/songs');
      });
    });

    router.get('/songs/edit/:id',function(req,res){
      Style.find({},function(err,styles){
        Song.findOne({_id:req.params.id},function(err,song){
          if(err){
            console.log(err);
          }
          var model = {
            song: song,
            styles: styles
          };
          res.render('manage/songs/edit', model);
        });
      });
    });
    router.post('/songs/edit/:id',function(req,res){
      var title = req.body.title && req.body.title.trim();
      var style = req.body.style && req.body.style.trim();
      var author = req.body.author && req.body.author.trim();
      var price = req.body.price && req.body.price.trim();
      var description = req.body.description && req.body.description.trim();
      var cover = req.body.cover && req.body.cover.trim();

      Song.update({_id: req.params.id},{
        title: title,
        style: style,
        author: author,
        price: price,
        description: description,
        cover: cover
      }, function(err){
        if(err){
          console.console.log('update error',err);
        }
        req.flash('success',"Song Updated");
        //console.log(messages);
        res.location('/manage/songs');
        res.redirect('/manage/songs');
      });
    });

    router.delete('/songs/delete/:id',function(req,res){
      Song.remove({_id:req.params.id},function(err){
        if(err){
          console.log(err);
        }
        req.flash('success',"Song Deleted");
        res.location('/manage/songs');
        res.redirect('/manage/songs');
      });
    });

    router.get('/styles/add',function(req,res){
      res.render('manage/styles/add');
    });

    router.post('/styles',function(req,res){
      var name = req.body.name && req.body.name.trim();

      if(name == ''){
        req.flash('error',"Please fill out required fields");
        res.location('/manage/styles/add');
        res.redirect('/manage/styles/add');
      }
      var newStyle = new Style({
        name: name
      });

      newStyle.save(function(err){
        if(err){
          console.log('save error',err);
        }

        req.flash('success',"Style Added");
        res.location('/manage/styles');
        res.redirect('/manage/styles');
      });
    });

    router.get('/styles/edit/:id',function(req,res){
      Style.findOne({_id:req.params.id},function(err,style){
        if(err){
          console.log(err);
        }
        var model = {
          style: style
        };
        res.render('manage/styles/edit',model);
      });
    });

    router.post('/styles/edit/:id',function(req,res){
      var name = req.body.name && req.body.name.trim();

      Style.update({_id: req.params.id},{
        name: name
      }, function(err){
        if(err){
          console.log('update error',err);
        }

        req.flash('success',"Style Updated");
        res.location('/manage/styles');
        res.redirect('/manage/styles');
      });
    });

    router.delete('/styles/delete/:id',function(req,res){
      Style.remove({_id: req.params.id},function(err){
        if(err){
          console.log(err);
        }
        req.flash('success',"Style Deleted");
        res.location('/manage/styles');
        res.redirect('/manage/styles');
      });
    });
};
