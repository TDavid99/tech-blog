const { Sequelize, Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connections');

class Post extends Model {}

Post.init(
{
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
        },
 
        title:{ 
            type:DataTypes.STRING,
            allowNull: false,

        },
        post_url: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
        
    {
        sequelize,
        freezeTableName: true,
    }
);
module.exports = Post;
