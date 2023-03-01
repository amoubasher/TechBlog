
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    id: DataTypes.INTEGER
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'post'
  }
);

module.exports = Post;

