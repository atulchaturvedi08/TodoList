const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Your JWT secret
    req.user = decoded;  // Attach the decoded user information to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
