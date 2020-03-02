var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  first_name: {
    type: String
  },
   last_name: {
    type: String
  },
  email: {
      type: String
  },
  password: {
      type: String
  },
  token: {
    type: String
}
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);