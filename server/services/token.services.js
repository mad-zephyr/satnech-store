const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenServices {
  // return accessToken, refreshToken, expiresIn
  generate(payload){
    const accessToken = jwt.sign(payload, process.env.secretOrPrivateKey, {
      expiresIn: '1h'
    })
    const refreshToken = jwt.sign(payload,  process.env.secretOrRefreshKey)

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600
    }
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ user: userId })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }
    const token = await Token.create({ user: userId, refreshToken })
    return token
  }

  validateRefresh(validateRefresh) {
    try {
      const isJwtCorrect = jwt.verify(`${validateRefresh}`,   process.env.secretOrRefreshKey)
      return isJwtCorrect
    } catch (error) {
      return null
    }
  }

  validateAccessToken(validateRefresh) {
    try {
      const isJwtCorrect = jwt.verify(validateRefresh, process.env.secretOrPrivateKey)
      return isJwtCorrect
    } catch (error) {
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      const dbToken = await Token.findOne({refreshToken: refreshToken})
      return dbToken
    } catch ( error) {
      return null

    }
  }

}

module.exports = new TokenServices