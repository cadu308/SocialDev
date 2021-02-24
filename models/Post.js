const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  texto: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comentarios: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      texto: {
        type: String,
        required: true,
      },
      nome: {
        type: String,
      },
      avatar: {
        type: String,
      },
      data: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
