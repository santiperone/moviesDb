const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: DataTypes.STRING,
        awards: DataTypes.INTEGER,
        rating: DataTypes.DOUBLE,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER,
        release_date: DataTypes.DATE
    }
    let config = {
        tableName: 'movies',
        underscored: true,
        paranoid: true
    }
    const Movie = sequelize.define(alias, cols, config);
    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre);
        Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie',            
            foreignKey: 'movie_id',
            otherKey: 'actor_id'
        });        
    }
    return Movie
}