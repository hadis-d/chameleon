var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
  id: {
      type: String
  },
  text: {
    type: String
  },
  image: {
    type: String
  },
  done: {
    type: Boolean
  }
},{
    collection: 'todos'
});

module.exports = mongoose.model('Todo', Todo);