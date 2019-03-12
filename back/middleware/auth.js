const { User } = require("./../models/User.js");

var auth = (req, res, next) => {
    let token = req.header('auth');
  
    User.findByToken(token)
    .then( user => {
      if(!user) {
        return Promise.reject('Usuario não encontrado')
      } else {
        next();
      }
    }).catch( e => {
      res.status(401).send({ message: e })
    });
  }

  module.exports = { auth };