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
        underscorded: true,
        paranoid: true
    }
    const genre = sequelize.define(alias, cols, config);
    return genre
}