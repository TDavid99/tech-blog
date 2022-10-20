const User = require('./user');
const Post = require('./post');
const comment = require ('./comment');

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreginKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User,{

});

module.exports ={
    User,
    Comment,
    Post
};