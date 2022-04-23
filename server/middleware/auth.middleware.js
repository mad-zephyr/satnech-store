const tokenServices = require('../services/token.services')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next
  }

  try {
    //Bearer sdfsefsdfsdfSample
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized AUTH METHOD' })
    }

    const data = tokenServices.validateAccessToken(token)

    if (!data) {
      return res.status(401).json({ message: 'Unauthorized AUTH METHOD' })
    }
  
    req.user = data
    next()

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized AUTH METHOD' })
  }
}