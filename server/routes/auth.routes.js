const express = require('express')
const router = express.Router({mergeParams: true})
const bcryptjs = require('bcryptjs')
const User = require('../models/User')
const tokenServices = require('../services/token.services')
const { check, validationResult } = require('express-validator')

// api/auth/signup
// 1. get data from req (email, pass, ...rest)
// 2. check if user already exist
// 3. hash password 
// 4. create user
// 5. generate tokens
// ...npm i bcryptjs jsonwebtoken express-validator

router.post('/signup', [
  check('email', 'incorrect email').isEmail(),
  check('password', 'min length pass 8 signs').isLength({min: 8}),

  async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: 'INVALID_DATA',
          code: 400,
          // errors: errors.array()
        }
      })
    }
    try {
      const { email, password } = req.body

      const existingUser = await User.findOne({ email }).exec()
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400
          }
        })
      }

      const hashedPassword = await bcryptjs.hash(password, 12)
      const newUser = await User.create({
        password: hashedPassword,
        email
      })
      
      const tokens = tokenServices.generate({ id: newUser.id})
      await tokenServices.save(newUser.id, tokens.refreshToken)

      res.status(201).send({ ...tokens, userId: newUser.id })

    } catch (error) {
      res.status(500).json({
        message: 'Error on server, try later...'
      })
    }
}])

// 1. Validate
// 2. find user
// 3. compare hash password
// 4. generate token
// 5. return data

router.post('/signInWithPassword', [
  check('email', 'incorrect email').isEmail(),
  check('password', 'something wrong with password').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            // errors: errors.array()
          }
      })}

      const {email, password} = req.body
      const existingUser = await User.findOne({email}).exec()

      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_DOEST_FOUND',
            code: 400
          }
        })
      }

      const isPasswordEqual = await bcryptjs.compare(password, existingUser.password)

      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400
          }
        })
      }

      const tokens = tokenServices.generate({_id: existingUser._id})
      await tokenServices.save(existingUser._id, tokens.refreshToken)

      res.status(200).send({
        ...tokens,
        userId: existingUser._id
      })

    } catch (error) {
      res.status(500).json({
        message: 'Error on server, try later...'
      })
    }
  }]
)

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data?._id !== dbToken?.user.toString()
}

router.post('/token', async(req, res) => {
  try {
    const { refreshToken, userId } = req.body

    const data = await tokenServices.validateRefresh(refreshToken)

    const dbToken = await tokenServices.findToken(refreshToken)

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({
        message: 'router.post: /token Unauthorized isTokenInvalid'
      })
    }

    const tokens = await tokenServices.generate({_id: userId})
    await tokenServices.save(userId, tokens.refreshToken)
  
    res.status(200).send({
        ...tokens,
        userId
      })
    
  } catch (error) {
    console.log('ERROR: ', error)
    res.status(500).json({
      message: 'Error on server, try later...'
    })
  }
})

module.exports = router