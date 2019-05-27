const path = require('path');
const express = require('express');
const bosyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
	bosyParser.urlencoded({
		extended: false
	})
);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findByPk(1)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
	constrains: true,
	onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
	through: CartItem
});
Product.belongsToMany(Cart, {
	through: CartItem
});


sequelize
	// .sync({
	// 	force: true
	// })
	.sync()
	.then(result => {
		return User.findByPk(1);
	})
	.then(user => {
		if (!user) {
			return User.create({
				name: 'Rinat',
				email: 'supervueman@gmail.com'
			});
		}
		return user;
	})
	.then(user => {
		// console.log(user);
		return user.createCart();
	})
	.then(cart => {
		app.listen(3000, () => {
			console.log('App started on 3000 port');
		});
	})
	.catch(err => {
		console.log(err);
	});
