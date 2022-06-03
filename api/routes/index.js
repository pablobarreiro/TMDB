const express = require("express");
const passport = require("passport");
const { User, Favorite } = require('../models/index');
const router = express.Router();
const Op = require('sequelize').Op

// REGISTER NEW USER
router.post('/register',(req,res)=>{
  User.create({
    username:req.body.username.toLowerCase(),
    email:req.body.email.toLowerCase(),
    password:req.body.password
  }).then((createdUser)=>{
    res.status(201).send({
      id: createdUser.id,
      username: createdUser.username,
      email: createdUser.email
    })
  })
  .catch(err => {
    if(err.errors) res.send(err.errors[0].message)
    else {
      console.log(err.original)
      res.send(`${err.original}`)
    }
  })
})

// AUTHENTICATE USER
router.post('/login',passport.authenticate('local'),(req,res)=>{
    res.status(201).send({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    })
})

// LOGOUT SESSION
router.get('/logout', (req,res)=>{  // req.logout() no anda
  req.session.destroy(() => {
    res.sendStatus(204) 
  });
})

// ADD 1 FAVORITE
router.post('/users/:user_id/favorites/add', (req,res)=>{

  User.findByPk(req.params.user_id)
  .then(user => {
    Favorite.findOrCreate({ where:{ title_id:req.body.singleSearch.id,type:req.body.type }})
    .then(([addedFavorite,bool]) => {
      addedFavorite.addUser(user.id)
    })
    .then(()=>res.sendStatus(201))
  })
})

// GET ALL FAVORITES
router.get('/users/:user_id/favorites', (req,res)=>{
  User.findByPk(req.params.user_id,{include: [{ model: Favorite }]})
  .then(user => {
    res.send(user.favorites)})
})

// DELETE 1 FAVORITE
router.delete('/users/:user_id/favorites/:id',(req,res)=>{
  Favorite.destroy({where:{id:req.params.id},include:[{model:User, attributes:{id:req.params.user_id}}]})
  .then(() => res.sendStatus(200))
})

// GET 1 FAVORITE
router.get('/users/:user_id/favorites/:id',(req,res)=>{
  User.findByPk(req.params.user_id,{include: [{ model: Favorite }]})
  .then(({favorites}) => {
    const favorite = favorites.find(e => e.title_id === Number(req.params.id))
    res.send(favorite)
  })
})

// GET SIMILAR USERS
router.get('/users/search/:query',(req,res)=>{
  User.findAll({where:{username:{[Op.like]: `%${req.params.query}%`}}})
  .then(users => res.send(users))
})


// GET 1 USER
router.get('/users/:user_id',(req,res)=>{
  User.findByPk(req.params.user_id)
  .then(user => res.send(user))
})


// PERSIST SESSION
router.get('/me',(req,res) => {
  if(req.user) res.send({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
    })
  else res.sendStatus(401)
})


module.exports = router