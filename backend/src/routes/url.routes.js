const express = require("express");
const { createShortUrl, redirectToUrl, getMyLinks } = require("../controllers/url.controller");
const { getAnalytics } = require('../controllers/analytics.controller');
const rateLimiter = require("../middleware/rateLimit");
const authenticate = require("../middleware/auth");
const {register, login} = require("../controllers/auth.controller")
const router = express.Router();
const optionalAuthenticate = require('../middleware/optionalAuth');
const { getPreview } = require('../controllers/preview.controller');

router.post('/shorten', rateLimiter,optionalAuthenticate, createShortUrl);
router.get('/api/my-links', authenticate, getMyLinks);                     // required auth
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get("/:shortCode", redirectToUrl);
router.get('/api/analytics/:shortCode', getAnalytics);
router.get('/api/preview', rateLimiter, getPreview);


module.exports = router;