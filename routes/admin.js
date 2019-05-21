const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
	res.render('add-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
		activeAddProduct: true
	})
});

router.post('/add-product', (req, res, next) => {
	products.push({
		title: req.body.title
	});
	res.redirect('/');
});

exports.routes = router;
exports.products = products;
