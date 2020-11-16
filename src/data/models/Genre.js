const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
    }
    let config = {
        tableName: 'genres',
        underscored: true,
        paranoid: true
    }
    const Genre = sequelize.define(alias, cols, config);
    Genre.associate = (models) => {
        Genre.hasMany(models.Movie);
    }
    return Genre
}