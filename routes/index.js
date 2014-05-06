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
    password: req.body.password,
    phone: req.body.phone
  }).save(function(err, user, count) {
    console.log(user);
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

router.post('/api/sms', function(req, res) {
  var text = req.body.Body;
  var number = req.body.From;
  User.findOne( { phone : number}, function(err, user) {
    if(user) {
      new Post({
        title: 'Sent From Phone',
        body: text,
        publish_date: Date.now(),
        user: user._id
      }).save(function(err, post, count) {
        console.log('post created for ' + user.username);
      });
    }
  });
});

module.exports = router;
