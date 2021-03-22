const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { route } = require('./users');

//@route    POST api/posts
//@desc     Criação de Post
//@access   Private
router.post(
  '/',
  [auth, [check('texto', 'É necessário informar o texto.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-senha');

      const newPost = new Post({
        texto: req.body.texto,
        nome: user.nome,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Erro no Servidor');
    }
  }
);

//@route    GET api/posts
//@desc     Exibe todos os posts
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ data: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Erro no Servidor');
  }
});

//@route    GET api/posts/:id
//@desc     Exibe post por id
//@access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if (!posts) {
      return res.status(404).json({ msg: 'Post não encontrado.' });
    }

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

//@route    DELETE api/posts/:id
//@desc     Deleta o post por id
//@access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post não encontrado.' });
    }

    //Verifica o usuário
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Usuário não autorizado.' });
    }

    await post.remove();

    res.json({ msg: 'Post removido.' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post não encontrado.' });
    }
    return res.status(500).send('Erro no Servidor');
  }
});

//@route    PUT api/posts/like/:id
//@desc     Like no Post
//@access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Checar se o usuário já deu o like
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res
        .status(400)
        .json({ msg: 'Não é permitido dar mais de um like no post.' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Erro no Servidor');
  }
});

//@route    PUT api/posts/dislike/:id
//@desc     Retirar o like no Post
//@access   Private
router.put('/dislike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Checar se o usuário já deu o like
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'Você ainda não deu like neste post.' });
    }

    //Resgata o index para deletar
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Erro no Servidor');
  }
});

router.post(
  '/comment/:id',
  [auth, [check('texto', 'É necessário informar o texto.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-senha');
      const post = await Post.findById(req.params.id);

      const newComment = {
        texto: req.body.texto,
        nome: user.nome,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comentarios.unshift(newComment);

      await post.save();
      res.json(post.comentarios);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Erro no Servidor');
    }
  }
);

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comentario = post.comentarios.find(
      (comentario) => comentario.id === req.params.comment_id
    );

    if (!comentario) {
      return res.status(404).json({ msg: 'Comentário não encontrado.' });
    }

    //Verifica o usuário
    if (comentario.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Usuário não autorizado.' });
    }

    const removeIndex = post.comentarios
      .map((comentario) => comentario.user.toString())
      .indexOf(req.user.id);

    post.comentarios.splice(removeIndex, 1);

    await post.save();

    res.json(post.comentarios);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Erro no Servidor');
  }
});

module.exports = router;
