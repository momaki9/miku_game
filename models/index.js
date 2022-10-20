const User = require('./User');
const Character = require('./Character');
const CharUser = require('./CharUser')

User.hasMany(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(CharUser, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Character.belongsTo(User, {
  foreignKey: 'user_id'
});

// might need to be adjusted
Character.hasMany(CharUser, {
  foreignKey: 'character_id',
  onDelete: 'CASCADE'
});

CharUser.belongsTo(Character, {
  foreignKey: 'character_id',  
});

CharUser.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Character, CharUser };
