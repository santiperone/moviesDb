const path = require('path');
const db = require('../data/models')
const moment = require('moment');

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
            console.log(movie.release_date);
            res.render('movieDetail', { movie });
        } catch (error) {
            res.send(error.message)
        }
      },
}