const path = require('path');
const db = require('../data/models')
const moment = require('moment');
const { Op } = require("sequelize");

module.exports = {
    all: async function(req, res) {
        try {
            const movies = await db.Movie.findAll()
            res.render('movies/movies', { movies })
        } catch (error) {
            res.send(error.message)
        }
    },
    detail: async function(req, res) {
        try {
            let movie = await db.Movie.findByPk(req.params.id, {
                include: ['Genre', 'actors']
            });
            movie = movie.dataValues;
            // console.log(movie.actors);
            movie.release_date = moment(movie.release_date).format('DD/MM/YYYY');
            res.render('movies/movieDetail', { movie });
        } catch (error) {
            res.send(error.message)
        }
    },
    recom: async function(req, res) {
        try {
            const movies = await db.Movie.findAll({where: {rating: {[Op.gt]: 8}}});
            res.render('movies/movies', { movies })
        } catch (error) {
            res.send(error.message)
        }
    },
    new: async function(req, res) {
        try {
            const movies = await db.Movie.findAll({order: [['release_date', 'DESC']], limit: 5});
            res.render('movies/movies', { movies })
        } catch (error) {
            res.send(error.message)
        }
    },
    search: async function(req, res) {
        try {
            // console.log(req.body);            
            const movies = await db.Movie.findAll({where: {title: {[Op.like]: '%'+ req.body.search +'%'}}});
            res.render('movies/movies', { movies })
        } catch (error) {
            res.send(error.message)
        }
    },
    createForm: function(req, res) {
        res.render('movies/createMovie');
    },
    create: async function(req, res) {
        try {                
            await db.Movie.create(req.body);
            res.redirect('/movies')
        } catch (error) {
            res.send(error.message)
        }
    },
    editForm: async function(req, res) {
        let movie = await db.Movie.findByPk(req.params.id);
        movie = movie.dataValues;
        movie.release_date = moment(movie.release_date).format('YYYY-MM-DD');
        res.render('movies/editMovie' , { movie });
    },
    edit: async function(req, res) {
        try {                
            await db.Movie.update(req.body, {where: {id: req.params.id}});
            res.redirect('/movies')
        } catch (error) {
            res.send(error.message)
        }
    },
    deleteForm: async function(req, res) {
        try {                
            const movie = await db.Movie.findByPk(req.params.id);
            res.render('movies/deleteMovie', { movie });
        } catch (error) {
            res.send(error.message)
        }
    },
    delete: async function(req, res) {
        try {                
            const movies = await db.Movie.destroy({where: {id: req.params.id}});
            res.redirect('/movies')
        } catch (error) {
            res.send(error.message)
        }
    },
}