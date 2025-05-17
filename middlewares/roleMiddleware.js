// middlewares/roleMiddleware.js

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role // ✅ Optional chaining to avoid crash if user is undefined

    if (allowedRoles.includes(userRole)) {
      next() // ✅ User has required role
    } else {
      res.status(403).json({ error: 'Access Denied: Insufficient role' })
    }
  }
}

module.exports = roleMiddleware
