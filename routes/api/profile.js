const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  check,
  validatorResult,
  validationResult,
} = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route    GET api/profile/me
//@desc     GET perfil do usuário atual
//@access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['nome', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Não há perfil para este usuário' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do Servidor');
  }
});

//@route    POST api/profile
//@desc     CREATE ou UPDATE Perfil do Usuário
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('nivel', 'É necessário informar o nível.').not().isEmpty(),
      check('competencias', 'É necessário informar a competência.')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      empresa,
      website,
      localizacao,
      bio,
      nivel,
      githubusername,
      competencias,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;

    if (empresa) profileFields.empresa = empresa;
    if (website) profileFields.website = website;
    if (localizacao) profileFields.localizacao = localizacao;
    if (bio) profileFields.bio = bio;
    if (nivel) profileFields.nivel = nivel;
    if (githubusername) profileFields.githubusername = githubusername;

    if (competencias) {
      profileFields.competencias = competencias
        .split(',')
        .map((competencias) => competencias.trim());
    }

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //UPDATE
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //CREATE
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

//@route    GET api/profile
//@desc     Exibir todos os perfis
//@access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['nome', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Exibir perfil de usuário por ID
//@access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['nome', 'avatar']);

    if (!profile)
      return res.status(400).json({ msg: 'Perfil não encontrado.' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Perfil não encontrado.' });
    }
    res.status(500).send('Erro no Servidor');
  }
});

//@route    DELETE api/profile
//@desc     Deletar perfil, usuário e posts
//@access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove todos os posts do usuário
    await Post.deleteMany({ user: req.user.id });
    // Remove o Perfil
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove o Usuário
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Usuário excluído.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor.');
  }
});

//@route    PUT api/profile/experiencia
//@desc     Adicionar experiencia
//@access   Private
router.put(
  '/experiencia',
  [
    auth,
    [
      check('funcao', 'É necessário informar a função.').not().isEmpty(),
      check('empresa', 'É necessário informar a empresa.').not().isEmpty(),
      check('de', 'É necessário informar a data inicial.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      funcao,
      empresa,
      localizacao,
      de,
      ate,
      atual,
      descricao,
    } = req.body;

    const newExp = {
      funcao,
      empresa,
      localizacao,
      de,
      ate,
      atual,
      descricao,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experiencia.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

//@route    DELETE api/profile/experiencia/:exp_id
//@desc     Deletar experiência de perfil
//@access   Private
router.delete('/experiencia/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experiencia
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experiencia.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

//@route    PUT api/profile/educacao
//@desc     Adicionar educacao
//@access   Private
router.put(
  '/educacao',
  [
    auth,
    [
      check('escola', 'É necessário informar a escola.').not().isEmpty(),
      check('nivel', 'É necessário informar o nível.').not().isEmpty(),
      check('localdeestudo', 'É necessário informar o local de estudo.')
        .not()
        .isEmpty(),
      check('de', 'É necessário informar a data inicial.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      escola,
      nivel,
      localdeestudo,
      de,
      ate,
      atual,
      descricao,
    } = req.body;

    const newEdu = {
      escola,
      nivel,
      localdeestudo,
      de,
      ate,
      atual,
      descricao,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.educacao.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

//@route    DELETE api/profile/educacao/:edu_id
//@desc     Deletar informação de educação do perfil
//@access   Private
router.delete('/educacao/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.educacao
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.educacao.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

//@route    GET api/profile/github/:username
//@desc     GET repositórios do usuário no GitHub
//@access   Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&
            client_id=${config.get(
              'githubClientId'
            )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res
          .status(404)
          .json({ msg: 'Nenhum perfil no Github encontrado.' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

module.exports = router;
