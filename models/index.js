const User = require("./user");
const Post = require("./post");
const Comment = require ("./comment");

Post.belongsTo(User, {
    foreignKey: "userId",
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreginKey: "postId",
    onDelete: 'CASCADE'
});

Comment.belongsTo(User,{
    foreginKey: "user_id",
    onDelete: "CASCADE",

});

module.exports ={
    User,
    Comment,
    Post,
};