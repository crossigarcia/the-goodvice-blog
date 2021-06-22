// import all models
const User = require('./User');
const Comment = require("./Comment");
const Post = require("./Post");
const Tag = require("./Tag");
const PostTag = require('./PostTag');

// //user has many post
// User.hasMany(Post, {
//   foreignKey: "post_id",
// });

// //user belongs to many comment
// User.hasMany(Comment, {
//    foreignKey: "comment_id"
// });

// //comment belongs to user
// Comment.belongsTo(User, {
//    foreignKey: 'comment_id'
// });

// Post.hasMany(Comment, {
//    foreignKey: "user_id"
// });

// //post belongs to user
// Post.belongsTo(User, {
//    foreignKey: "user_id"
// });

// //post has many tags
// Post.belongsToMany(Tag, {
//    through: PostTag,
//    foreignKey: 'post_id'

// });

// // //tags belongs to many posts
// Tag.belongsToMany(Post, {
//    through: PostTag,
//    foreignKey: 'tag_id'
// });

// //comment belongs to post
// Comment.belongsTo(Post, {
//    foreignKey: 'post_id'
// });


module.exports = { User, Post, Comment, Tag, PostTag };
