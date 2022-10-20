//file to go into model folder
const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CharUser extends Model {}

//model for archive dataTypes
//todo: write attributes

CharUser.init(
{
    charTag_id:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    character_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'chars',
          key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
         references: {
            model: 'user',
            key: 'id',
        },
    },
    mood: {
        type: DataTypes.INTEGER,
        defaultValue: 50,
    }
},
{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName:'charUser'
}
);

module.exports = CharUser;