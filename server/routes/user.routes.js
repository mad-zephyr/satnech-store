const express = require('express')
const User = require('../models/User')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/admin.middleware')

router.post('/', async(req, res) => {})

router.patch('/:userId', auth, async(req, res) => {
	try {
		const { userId } = req.params
		// done: userId === current userId
		if (userId) {
			const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
			res.send(updatedUser)
		} else {
			res.status(401).json({
				message: 'Unauthorized'
			})
		}
		
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.get('/:userId', auth, async(req, res) => {
	try {
		const { userId } = req.params
		const user = await User.findById(userId)
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

module.exports = router