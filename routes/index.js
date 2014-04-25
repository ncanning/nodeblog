var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res) {
  Post.find(function(err, posts, count) {
    res.render( 'index', {
      title : 'Blog Posts',
      posts : posts
    });
  });
});

router.get('/create', function(req, res) {
  res.render('create', { title : 'New Post' });
});

router.post('/create', function(req, res) {
  new Post({
    title : req.body.title,
    body : req.body.body,
    publish_date : Date.now()
  }).save(function(err, todo, count) {
    res.redirect('/');
  });
});

module.exports = router;
