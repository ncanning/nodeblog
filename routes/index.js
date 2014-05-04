var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res) {
  var user = req.session.passport.user;
  if(user) {
    Post.find( {user : user}, function(err, posts, count) {
      res.render('home', {
        title: 'Your Blog',
        posts: posts
      });
    });
  } else {
    Post.find( {user: req.session.passport.user},
      function(err, posts, count) {
      res.render( 'index', {
        title : 'Blog Posts'
      });
    });
  }
});

router.get('/create', function(req, res) {
  res.render('create', { title : 'New Post' });
});

router.get('/:user', function(req, res) {
  User.findOne( {username : req.params.user}, function( err, user) {
    if(!user) {
      res.send('404!');
    }
    else {
      Post.find( { user : user }, function( err, posts, count) {
        res.render('user', {
          title : user.name,
          posts : posts
        });
      });
    }
  });
});

router.post('/create', function(req, res) {
  new Post({
    title : req.body.title,
    body : req.body.body,
    publish_date : Date.now(),
    user : req.session.passport.user
  }).save(function(err, todo, count) {
    res.redirect('/');
  });
});

router.post('/createuser', function(req, res) {
  new User({
    username: req.body.username,
    password: req.body.password
  }).save(function(err, user, count) {
    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                failureRedirect: '/'})
);

router.post('/delete', function(req, res) {
  Post.findById( req.body.id, function(err, post) {
    post.remove(function(err, post) {
      res.redirect('/');
    });
  });
});

router.post('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
