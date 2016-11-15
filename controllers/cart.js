'use strict';
var Song = require('../models/songModel');
var Style = require('../models/styleModel');


module.exports = function (router) {
    router.get('/', function (req, res) {
        //Get the cart from session
        var cart = req.session.cart;
        var displayCart = {items:[],total:0};
        var total = 0;

        //Get total
        for(var item in cart){
          displayCart.items.push(cart[item]);
          total += cart[item].subtotal;
        }
        displayCart.total = total.toFixed(2);
        //render cart
        res.render('cart/index',{
          cart: displayCart,
          messages: undefined
        });
    });
    router.post('/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        Song.findOne({_id:req.params.id},function(err, song){
          if(err){
            console.log(err);
          }
          if(cart[req.params.id]){
            cart[req.params.id].qty++;
            cart[req.params.id].subtotal += cart[req.params.id].price;
          }else{
            cart[req.params.id] = {
              item: song._id,
              title: song.title,
              price: song.price,
              qty: 1,
              subtotal: song.price
            };
          }
          res.redirect('/cart');
        });
    });
    router.get('/remove',function(req,res){
      req.session.cart = {};
      req.flash('info','Cart has been emptied!');
      res.render('cart/index',{messages:req.flash('info')});
    });
};
