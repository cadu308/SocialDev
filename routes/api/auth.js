const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Rota de Autorização'));

module.exports = router;