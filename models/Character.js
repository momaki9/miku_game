const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //default value needed?
    hunger: {
      type: DataTypes.INTEGER,
    },
    //default value needed? also numerical value or text?
    // mood: {
    //     type: DataTypes.STRING,
    // },
    // do we want numerical values or text (i.e. common, very rare, etc)
    rarity: {
        type: DataTypes.STRING,
    },
    date_collected: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'chars',
  }
);

module.exports = Character;
