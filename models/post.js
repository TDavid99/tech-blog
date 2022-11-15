const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class post extends Model {}

Post.init(
    {
        title: DataTypes.STRING,
        body: DataTypes.STRING
    },
    {
        Sequelize
    }
);
module.export = Post;
