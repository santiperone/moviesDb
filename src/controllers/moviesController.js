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
            let movie = await db.Movie.findByPk(req.params.id, { include: ['Genre', 'actors']});
            movie = movie.dataValues;
            // res.json(movie);
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
    createForm: async function(req, res) {
        const actors = await db.Actor.findAll()
        const genres = await db.Genre.findAll()
        res.render('movies/createMovie', { actors, genres });
    },
    create: async function(req, res) {
        try {                
            const newMovie = await db.Movie.create(req.body);
            newMovie.addActors(req.body.actors);
            res.redirect('/movies');
        } catch (error) {
            res.send(error.message)
        }
    },
    editForm: async function(req, res) {
        try {
            const actors = await db.Actor.findAll()
            const genres = await db.Genre.findAll()
            let movie = await db.Movie.findByPk(req.params.id, {include: ['actors']});
            movie = movie.dataValues;
            // res.json(movie);
            movie.release_date = moment(movie.release_date).format('YYYY-MM-DD');
            res.render('movies/editMovie' , { movie, genres, actors });
        } catch (error) {
            res.send(error.message)
        }
        
    },
    edit: async function(req, res) {
        try {                            
            await db.Movie.update(req.body, {where: {id: req.params.id}});
            const edMovie = await db.Movie.findByPk(req.params.id);
            edMovie.setActors(req.body.actors);
            res.redirect('/movies');
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
            const delMovie = await db.Movie.findByPk(req.params.id, {include: ['actors']});
            delMovie.removeActors(delMovie.actors);
            await db.Movie.destroy({where: {id: req.params.id}});
            res.redirect('/movies')
        } catch (error) {
            res.send(error.message)
        }
    },
}