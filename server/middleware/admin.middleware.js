const User = require('../models/User')
const tokenServices = require('../services/token.services')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next
  }

  try {
    //Bearer sdfsefsdfsdfSample
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    
    const data = tokenServices.validateAccessToken(token)
    
    const currentUser = await User.findById(data._id)

    if (!currentUser?.admin) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    
    req.user = data
    next()

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}