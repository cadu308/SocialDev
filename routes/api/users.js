const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

//@route    POST api/users
//@desc     Registrar Usuário
//@access   Publico
router.post('/', [
    check('nome', 'É necessário informar um nome').not().isEmpty(),
    check('email', 'É necessário informar um e-mail válido').isEmail(),
    check('senha', 'É necessário inserir uma senha com 6 ou mais caracteres').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        let user = await User.findOne({ email });

        if (user) {
           return res.status(400).json({ erros: [{msg: 'Usuário já existente'}] });
        }

        // Registra o avatar do usuário
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            nome,
            email,
            avatar,
            senha 
        });

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);

        user.senha = await bcrypt.hash(senha, salt);

        await user.save();

        // Retorna jsonwebtoken 
        const payload = {
            user: {
                id: user.id
            }
        } 

        jwt.sign(
            payload, 
            config.get("jwtSecret"),
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
    
});

module.exports = router;