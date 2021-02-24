const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-senha');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

router.post(
  '/',
  [
    check('email', 'É necessário informar um e-mail válido').isEmail(),
    check('senha', 'É necessário informar a senha.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;

    try {
      // Verifica se o usuário existe
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Credenciais Inválidas.' }] });
      }

      const isMatch = await bcrypt.compare(senha, user.senha);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Credenciais Inválidas.' }] });
      }

      // Retorna jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // Tempo para expirar sessão
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro do Servidor');
    }
  }
);

module.exports = router;
