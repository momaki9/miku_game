const router = require('express').Router();
const { User, Character, CharUser } = require('../models');
const withAuth = require('../utils/auth');
const icon = require('../icon')

router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/home');
        return;
      }
      res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/home', withAuth, async (req, res) => {
    try {
      
      const characterData = await Character.findAll()
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model:CharUser, include: [Character]}],
      }) 

        const characters = characterData.map((character)=> character.get({ plain: true }))
        const serializedData = userData.get({ plain: true });
        //this is where i fix the icon
        console.log(serializedData.charUsers)
        icon(serializedData.name);
        res.render('home', {
            serializedData,
            characters,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/visit', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
          include: [{model: CharUser, include: [Character]}],
        });
        
    
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        const serializedData = userData.get( { plain: true });
        console.log("---------------------")
        console.log(serializedData)
        console.log("---------------------")
        console.log(serializedData.charUsers)
        
  
        res.render('visit', {
            serializedData,
            logged_in: true
        })
      } catch (err) {
        res.status(400).json(err);
      }
    
});

router.get('/lottery', withAuth, async (req, res) => {
    res.render('lottery', {
      logged_in: true
    })
});

router.get('/archive', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
          include: [
            {
              model: CharUser,
            },
            {
              model: Character
            }
          ],
        });
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
        const serializedData = userData.get( { plain: true });
        console.log(serializedData)
    
        res.render('archive', {
            serializedData,
            logged_in: true
        })
      } catch (err) {
        res.status(400).json(err);
      }  
});

module.exports = router;