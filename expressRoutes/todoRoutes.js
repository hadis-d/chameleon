var express = require('express');
var app = express();
var todoRoutes = express.Router();
var Todo = require('../models/Todo');

todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/add').post(function (req, res) {
    var todo = new Todo(req.body);
    todo.save()
        .then(item => {
            res.status(200).json({ 'todo': item });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            return next(new Error('Could not load Document'));
        else {
            todo.text = req.body.text;
            todo.image = req.body.image;
            todo.done = req.body.done;

            todo.save().then(todo => {
                res.json({ 'message': "Updated todo successfully", 'todo': todo });
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

todoRoutes.route('/delete').get(function (req, res) {
    Todo.deleteMany({done: true}, function (err, item) {
        if (err) res.json(err);
        else res.json('Successfully removed all done');
    })
});

todoRoutes.route('/delete/:id').get(function (req, res) {
    Todo.findByIdAndRemove({ _id: req.params.id }, function (err, todo) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = todoRoutes;