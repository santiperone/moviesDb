const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.DOUBLE,
        favorite_movie_id: DataTypes.INTEGER
    }
    let config = {
        tableName: 'actors',
        underscored: true,
        paranoid: true
    }
    const actor = sequelize.define(alias, cols, config);
    return actor
}