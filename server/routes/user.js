const router = require('express').Router()
const UserController = require('../controllers/UserController');

// router.get('/',UserController.getAllUser);
router.post('/create',UserController.added);
router.post('/login',UserController.loginPost);
router.post('/google-signin', UserController.googleUser)

module.exports = router;