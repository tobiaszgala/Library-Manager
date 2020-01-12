const path = require('path');
const express = require('express');
const sequelize = require('./models').sequelize;

// routes
const mainRoute = require('./routes/main');
const booksRoute = require('./routes/books');

// directory settings
const publicDirectory = path.join(__dirname, '../public');
const viewDirectory = path.join(__dirname, './templates');

// express
const app = express();
const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.set('view engine', 'pug');
app.set('views', viewDirectory);
app.use('/static', express.static(publicDirectory));

// routes
app.use(mainRoute);
app.use(booksRoute);

// not found route
app.use('*', (req, res) => {
	res.render('page-not-found');
});

// error handling route for any thrown error
app.use((err, req, res, next) => {
	err.status = err.status || 500;
	err.message = err.message || 'Sorry, there was an error!';
	res.locals.error = err;
	res.status(err.status);
	res.render('error');
});

sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
	});
});
