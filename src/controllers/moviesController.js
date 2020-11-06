const path = require('path');
const db = require('../data/models')
const moment = require('moment');
const { Op } = require("sequelize");

module.exports = {
    all: async function(req, res) {
        try {
            const movies = await db.Movie.findAll()
            res.render('movies', { movies })
        } catch (error) {
            res.send(error.message)
        }
    },
    detail: async function(req, res) {
        try {
            let movie = await db.Movie.findByPk(req.params.id);
            movie = movie.dataValues;
            movie.release_date = moment(movie.release_date).format('DD/MM/YYYY');
            // console.log(movie.release_date);
            res.render('movieDetail', { movie });
        } catch (error) {
            res.send(error.message)
        }
    },
    recom: async function(req, res) {
        try {
            const movies = await db.Movie.findAll({where: {rating: {[Op.gt]: 8}}});
            res.render('movies', { movies })
        } catch (error) {
            res.send(error.message)
        }
    },
    new: async function(req, res) {
        try {
            const movies = await db.Movie.findAll({order: [['release_date', 'DESC']], limit: 5});
            res.render('movies', { movies })
        } catch (error) {
            res.send(error.message)
        }
    },
    search: async function(req, res) {
        try {
            console.log(req.body);            
            const movies = await db.Movie.findAll({where: {title: {[Op.like]: '%'+ req.body.search +'%'}}});
            res.render('movies', { movies })
        } catch (error) {
            res.send(error.message)
        }
    },
}