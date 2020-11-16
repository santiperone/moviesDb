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
    const Actor = sequelize.define(alias, cols, config);
    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie, {
            as: 'movies',
            through: 'actor_movie',            
            foreignKey: 'actor_id',
            otherKey: 'movie_id'
        });
        Actor.belongsTo(models.Movie, {
            as: 'favorite_movie',
            foreignKey: 'favorite_movie_id'
        });
    }
    return Actor
}