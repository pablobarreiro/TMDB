const express=require('express')
const app = express();
const routes = require('./routes');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth2')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const db = require('./db')
const { User,Favorite } = require('./models')
const bodyParser = require("body-parser")

// parser
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// PASSPORT
// cookies
app.use(cookieParser())
app.use(expressSession({ secret: "superTopTMDB" }))

// passport init
app.use(passport.initialize());
app.use(passport.session())

// estrategia local
passport.use(new LocalStrategy({usernameField:'email'}, (email,password,done) => {
  User.findOne({where:{email:email.toLowerCase()}})
  .then(user=>{
    if (!user) done(null,false)
    if (user.validatePassword(password)) done(null,user)
    else done (null, false)
  })
  .catch(err => done(err,false))
}))

// estrategia google
// ID DEL PROYECTO -> tmdb-352023
// NRO DEL PROYECTO -> 705947356028
const GOOGLE_CLIENT_ID = "705947356028-lle6ihnebc69oc17ljlue889ntgit5q6.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
/*
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/oauth/google/callback',
  passReqToCallback: true
}, (profile, done) => {
  return done(null, profile);
}
));

function(issuer, profile, cb) {
  
// MODIFICAR LAS BUSQUEDAS DE LA DB
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    issuer,
    profile.id
  ], function(err, cred) {
    if (err) { return cb(err); }
    if (!cred) {
      // The Google account has not logged in to this app before.  Create a
      // new user record and link it to the Google account.
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], function(err) {
        if (err) { return cb(err); }

        var id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          issuer,
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id.toString(),
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      // The Google account has previously logged in to the app.  Get the
      // user record linked to the Google account and log the user in.
      db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user);
      });
    }
  });
}
));

*/
// serialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
// deserialize
passport.deserializeUser(function(id, done) {
User.findByPk(id)
    .then(user => done(null, user))
});

// routes
app.use('/api', routes);
app.use('/*', (req,res)=>{ res.sendStatus(404) })

db.sync({force: false})
.then(()=>{
  app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
  });
})