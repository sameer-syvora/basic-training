import sequelize from "../config/db.js";
import User from "./userModel.js";
import Post from "./postModel.js";
import Like from "./likeModel.js";
import Friend from "./friendModel.js";

User.hasMany(Post, { foreignKey: 'userID' });
Post.belongsTo(User, { foreignKey: 'userID' });

User.belongsToMany(Post, {
  through: Like,
  foreignKey: 'userID',
  otherKey: 'postID',
  as: 'likedPosts'
});

Post.belongsToMany(User, {
  through: Like,
  foreignKey: 'postID',
  otherKey: 'userID',
  as: 'usersLiked'
});

Like.belongsTo(User, { foreignKey: 'userID' });
Like.belongsTo(Post, { foreignKey: 'postID' });

User.hasMany(Friend, { foreignKey: 'senderID' });
Friend.belongsTo(User, { foreignKey: 'senderID' });

User.hasMany(Friend, { foreignKey: 'recipientID' });
Friend.belongsTo(User, { foreignKey: 'recipientID' });

export { sequelize, User, Post, Like, Friend };