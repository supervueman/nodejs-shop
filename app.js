const path = require('path');
const express = require('express');
const bosyParser = require('body-parser');

const errorController = require('./controllers/error');

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
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
	console.log('App started on 3000 port');
});
