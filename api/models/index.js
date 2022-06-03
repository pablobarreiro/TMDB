const User = require('./User')
const Favorite = require('./Favorite')

Favorite.belongsToMany(User,{ through: 'favorite_to_user' })
User.belongsToMany(Favorite,{ through: 'favorite_to_user' })


module.exports = { User, Favorite }