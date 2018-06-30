const express = require('express');
const apiRouter = express.Router();
var data = require('../../data.json');
var seller = data.seller;
var goods = data.goods;
var ratings = data.ratings;
apiRouter.get('/seller', (req, res) => {
  console.log('seller data send');
  res.json({
    error: 0,
    seller: seller
  });
});
apiRouter.get('/goods', (req, res) => {
  console.log('goods data send');
  res.json({
    error: 0,
    goods: goods
  });
});
apiRouter.get('/ratings', (req, res) => {
  console.log('ratings data send');
  res.json({
    error: 0,
    ratings: ratings
  });
});
module.exports = apiRouter;
