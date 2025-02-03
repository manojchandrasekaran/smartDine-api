import express from 'express';

import controller from './auth.controller.js';
import { body } from 'express-validator';
import authService from './auth.service.js';

const router = express.Router();


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
);

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
);
router.get('/getme', authService().authenticate(), controller.getMe);
router.get('/getAdmins',controller.getAdmins);

router.put('/updateAdmin',controller.updateAdmin);

export default router;
