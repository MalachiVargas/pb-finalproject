const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');


router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/isUserAuth', requireAuth, authController.isUserAuth);

router.get('/budget', authController.budget_get);

router.post('/budget', authController.budget_post);

module.exports = router;
