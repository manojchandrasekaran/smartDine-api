import express from 'express';

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/layout', function (req, res, next) {
  res.render('layout', { title: 'Express' });
});

export default router;
