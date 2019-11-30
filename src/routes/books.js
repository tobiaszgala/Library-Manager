const express = require('express');
const router = express.Router();

const { Books } = require('../models/');

router.get('/books', (req, res, next) => {
    Books.findAll()
    .then(books => {
        res.render('index', { books });
    }).catch(err => {
        next(err);
    });
});

router.get('/books/new', (req, res) => {
    res.render('new-book');
});

router.get('/books/:id', (req, res, next) => {
    Books.findAll({
        attributes: ['id', 'title', 'author', 'genre', 'year'],
        where: {
            id: req.params.id
        }
    }).then(book => {
        const { id, title, author, genre, year } = book[0];
        res.render('update-book', { 
            book: {
                id, title, author, genre, year
            }
        });
    }).catch(err => {
        next(err);
    })
});

router.post('/books/new', (req, res, next) => {
    Books.create(req.body)
    .then(book => {
        res.redirect('/');
    }).catch(err => {
        if (err.name = "SequelizeValidationError") {
            res.render('new-book', {
                errors: err.errors
            });
        } else {
            next(err);
        }
    });
});

router.post('/books/:id', (req, res) => {
    Books.update(
        req.body,
        { where: {
                id: req.params.id
            }
        }
    ).then(book => {
        res.redirect('/');
    }).catch(err => {
        if (err.name = "SequelizeValidationError") {
            res.render('update-book', {
                errors: err.errors,
                book: {
                    id: req.params.id,
                   ...req.body
                }
            });
        } else {
            next(err);
        }
    });
});

router.post('/books/:id/delete', (req, res, next) => {
    Books.destroy({
        where: {
            id: req.params.id
        }
    }).then(response => {
        res.redirect('/');
    }).catch(err => {
            next(err);
    });
});

module.exports = router;
