const path = require('path');
const express = require('express');
const bosyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const User = require('./models/user')

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

// app.use((req, res, next) => {
// 	User.findById('5ceeb62d10a29f5a0f7fe76b')
// 		.then(user => {
// 			req.user = new User(user.username, user.email, user.cart, user._id);
// 			next();
// 		})
// 		.catch(err => console.log(err));
// })

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(errorController.get404);


mongoose.connect(`mongodb://${'localhost:27020'}/template`, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(result => {
	app.listen(3000);
	console.log('Server start on 3000 port');

}).catch(err => {
	console.log(err);
});
