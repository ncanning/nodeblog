var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
  title: String,
  body : String,
  publish_date : Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

var User = new Schema({
  username: String,
  password: String,
  phone: String
});    

mongoose.model('Post', Post);
mongoose.model('User', User);
mongoose.connect('mongodb://localhost/blog');
