const router = require('express').Router();
const userRoutes = require('./userRoutes');
const CharacterRoutes = require('./charRoutes');


router.use('/user', userRoutes);
router.use('/char', CharacterRoutes);


module.exports = router;