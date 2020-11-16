const path = require('path');
const db = require('../data/models')
const moment = require('moment');
const { Op } = require("sequelize");

module.exports = {
    all: async function(req, res) {
        try {
            const actors = await db.Actor.findAll()
            res.render('actors/actors', { actors })
        } catch (error) {
            res.send(error.message)
        }
    },
    detail: async function(req, res) {
        try {
            let actor = await db.Actor.findByPk(req.params.id);            
            res.render('actors/actorDetail', { actor });
        } catch (error) {
            res.send(error.message)
        }
    },
    createForm: async function(req, res) {
        const movies = await db.Movie.findAll()
        res.render('actors/createActor', { movies });
    },
    create: async function(req, res) {
        try {                
            await db.Actor.create(req.body);
            res.redirect('/actors')
        } catch (error) {
            res.send(error.message)
        }
    },
    editForm: async function(req, res) {
        try {            
            let actor = await db.Actor.findByPk(req.params.id);
            const movies = await db.Movie.findAll()
            res.render('actors/editActor' , { actor, movies });
        } catch (error) {
            res.send(error.message)
        }
    },
    edit: async function(req, res) {
        try {                
            await db.Actor.update(req.body, {where: {id: req.params.id}});
            res.redirect('/actors')
        } catch (error) {
            res.send(error.message)
        }
    },
    deleteForm: async function(req, res) {
        try {                
            const actor = await db.Actor.findByPk(req.params.id);
            res.render('actors/deleteActor', { actor });
        } catch (error) {
            res.send(error.message)
        }
    },
    delete: async function(req, res) {
        try {                
            await db.Actor.destroy({where: {id: req.params.id}});
            res.redirect('/actors')
        } catch (error) {
            res.send(error.message)
        }
    },
}