// src/middleware/optionalAuth.js
const jwt = require('jsonwebtoken');

function optionalAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(); // no token — just continue as anonymous

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
  } catch (err) {
    // invalid/expired token — treat as anonymous rather than blocking
  }
  next();
}

module.exports = optionalAuthenticate;