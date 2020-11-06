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
        timestamps: false,
    }
    const movie = sequelize.define(alias, cols, config);
    return movie
}