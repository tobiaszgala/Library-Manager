const path = require('path');
const express = require('express');
const sequelize = require('./models').sequelize;

// routes
const mainRoute = require('./routes/main');
const booksRoute = require('./routes/books');
const errorMiddleware = require('./middlewares/error');

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

// error handling middlewares
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

sequelize.sync().then(() => { 
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});