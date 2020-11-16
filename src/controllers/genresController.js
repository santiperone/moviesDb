const path = require('path');
const db = require('../data/models')

module.exports = {
    all: async function(req, res) {
        try {
            const genres = await db.Genre.findAll()
            res.render('genres/genres', { genres })
        } catch (error) {
            res.send(error.message)
        }
    },
    detail: async function(req, res) {
        try {
            let genre = await db.Genre.findByPk(req.params.id, {include: ['Movies']});            
            res.render('genres/genreDetail', { genre });
        } catch (error) {
            res.send(error.message)
        }
    }
}