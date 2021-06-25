const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Tag model
class Tag extends Model {}

// create fields/columns for Tag model
Tag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tag_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // this means the tag_text must be at least three characters long (i.e. a "#" plus two characters)
            len: [3]
          }
      },
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'user',
      //     key: 'id'
      //   }
      // },
      // post_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'post',
      //     key: 'id'
      //   }
      // }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'tag'
    }
  );

  module.exports = Tag;