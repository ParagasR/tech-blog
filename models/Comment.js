const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { };
//just followed the same model as Post.js
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                modelName: 'post',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
)

module.exports = Comment;