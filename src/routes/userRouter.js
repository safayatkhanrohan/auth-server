const router = require('express').Router();
const { signUp, signIn, getUserProfile, logOut } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', isAuthenticated, getUserProfile);
router.get('/logout', isAuthenticated, logOut);

module.exports = router;