const path = require('path');
const express = require('express');
const bosyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const errorController = require('./controllers/error');
const User = require('./models/user')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
	bosyParser.urlencoded({
		extended: false
	})
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'my secret',
	resave: false,
	saveUninitialized: false
}));

app.use((req, res, next) => {
	User.findById('5cef88b22f0196d46474b0fc')
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);
app.use('/', authRoutes);

app.use(errorController.get404);


mongoose.connect(`mongodb://${'localhost:27020'}/template`, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(result => {
	User.findOne().then(user => {
		if (!user) {
			const user = new User({
				name: 'Rinat',
				email: 'chaogen2@gmail.com',
				cart: {
					items: []
				}
			});
			user.save();
		}
	}).catch(err => console.log(err))

	app.listen(3000);
	console.log('Server start on 3000 port');

}).catch(err => {
	console.log(err);
});
