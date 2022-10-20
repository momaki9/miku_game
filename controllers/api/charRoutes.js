const router = require('express').Router();
const { Character, CharUser, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newProject = await Character.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/charuser', withAuth, async (req, res) => {
  try {
    
    const newProject = await CharUser.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const testData = await Character.findByPk(req.params.id, {
      attributes: ["id", "name"],
      include: [
        {
          model: CharUser,
          attributes: ["mood"],
          where: {user_id: req.params.id}
        }
      ]
    })
    const cleanData = testData.get({ plain: true })
    res.status(200).json(cleanData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:user_id', async (req, res) => {
  const { mood } = req.body;
  try {
    const data = await CharUser.update(
      {mood},
      {
      where: {
        user_id: req.params.user_id
      }}
    );
    if (!data) {
      res.status(404).json({message: 'failed'})
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;