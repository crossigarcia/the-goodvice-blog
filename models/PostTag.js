const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PostTag extends Model {}

PostTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    }
    // ,
    // created_at: {
    //   type:  DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: '2021-06-28 23:43:11'
    // },
    
    // updated_at: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   // defaultValue: Date.now()
    //   defaultValue: '2021-06-28 23:43:11'
    // }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post_tag",
  }
);

module.exports = PostTag;