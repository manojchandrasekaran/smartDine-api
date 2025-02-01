var express = require('express')
var router = express.Router()
const controller = require('./auth.controller')
const { body } = require('express-validator')

router.post(
    '/login',
    [
        // Validate and sanitize fields
        body('ad_email').isEmail().withMessage('Invalid email address'),
        body('ad_password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    controller.login
)

router.post(
    '/signup',
    [
        // Validate and sanitize fields
        body('ad_email').isEmail().withMessage('Invalid email address'),
        body('ad_password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('ad_phone_num')
            .notEmpty()
            .isLength({ min: 10 })
            .isNumeric()
            .withMessage('Enter valid mobile number'),
    ],
    controller.signUp
)

module.exports = router
