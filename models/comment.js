const { Sequelize , Model, DataTypes } = require('sequelize');
const Sequelize = require('../config/connections');

class Comment extends Model { }

Comment.init (
{
    body: {
        type: DataTypes.STRING,
        allowNull: false
        }
},[
    Sequelize
]
);

module.EXPORTS = Comment;

