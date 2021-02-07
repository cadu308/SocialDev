const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

//@route    POST api/users
//@desc     Registrar Usuário
//@access   Publico
router.post('/', [
    check('name', 'É necessário informar um nome').not().isEmpty(),
    check('email', 'É necessário informar um e-mail válido').isEmail(),
    check('password', 'É necessário inserir uma senha com 6 ou mais caracteres').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

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
            name,
            email,
            avatar,
            password 
        });

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Retorna jsonwebtoken 
        
        res.send('Usuário Registrado!');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro do Servidor');
    }
    
});

module.exports = router;