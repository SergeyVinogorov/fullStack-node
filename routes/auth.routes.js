const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult } = require('express-validator')
const User = require('../models/User')
const {log} = require("nodemon/lib/utils");
const router = Router()

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 5 characters').isLength({min: 8}),
        check('fullName', 'Minimum password length 5 characters').isLength({min: 5})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration'
            })
        }
        const {email, password, fullName} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'This user already exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword, fullName})
        await user.save()
        res.status(201).json({message: 'User created'})
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
})
router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data'
            })
        }
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid password, please try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
})

module.exports =  router