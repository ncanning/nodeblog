var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    title: String,
    body : String,
    publish_date : Date
});

mongoose.model('Post', Post);
mongoose.connect('mongodb://localhost/blog');
