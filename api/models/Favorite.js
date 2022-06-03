const S = require('sequelize');
const db = require('../db')

class Favorite extends S.Model {}

Favorite.init({
    title_id: {
        type: S.INTEGER
    },
    type: {
        type: S.STRING
    }
},{sequelize: db, modelName: 'favorites'})



module.exports = Favorite