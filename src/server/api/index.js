import express from 'express';

const getRouter = express.Router;
const router = getRouter();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

export default router;
