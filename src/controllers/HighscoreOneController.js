/**
 * Controller: Imports a model and returns processed data.
 * Holding Callback functions that are being passed to the router instances.
 */

const BadSyntaxError = require("../errors/error");
const Highscore = require('../models/highscore.model');
const tablename = "players";

// HighscoreController imports a model and then processes the returned data
class HighscoreOneController {

// get all players in a highscore table --> rendered as a view
getHighscoreTable(req, res, next) {
  Highscore.get(tablename)
    .then(data => res.render('index', { data }))
    .catch(err => next(new BadSyntaxError(err)));
}

// get all players
getAllPlayers(req, res, next) {
  Highscore.get(tablename)
    .then(data => res.status(200).json(data))
    .catch(err => next(new BadSyntaxError(err)));
}


// get a player by his id
getPlayerByID(req, res, next) {
  const id = parseInt(req.params.id);
  Highscore.getById(tablename, id)
    .then(data => res.status(200).json(data))
    .catch(err => next(new BadSyntaxError(err)));
}

// add a new player
addPlayer(req, res, next) {
  const player = req.body;
  Highscore.create(tablename, player)
    .then(data => res.status(201).json(data))
    .catch(err => next(new BadSyntaxError(err)));
}
  
  // update an existing player
  updatePlayer(req, res, next) {
    const id = parseInt(req.params.id);
    const player = req.body;
    Highscore.update(tablename, id, player)
      .then(data => res.status(200).json(data))
      .catch(err => next(new BadSyntaxError(err)));
  }
  
  // delete a player
  deletePlayer(req, res, next) {
    const id = parseInt(req.params.id);
    Highscore.delete(tablename, id)
      .then(data => res.status(200).json(data))
      .catch(err => next(new BadSyntaxError(err)));
  }
} 

module.exports = HighscoreOneController;
