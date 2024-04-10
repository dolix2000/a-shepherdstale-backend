/**
 * "Routes" (Mini App - Subpaths) to forward the supported requests.
 * Modularize code.
 */

const express = require('express');
const auth = require('../auth/basic-auth');
const cacheMiddleware = require('../middlewares/cache');

const router = express.Router();

//import the controller
const HighscoreOneController = require('../controllers/HighscoreOneController');

// standard test route
router.get('/', (req, res) => res.json({message: `Welcome to 'A Shepherd's Tale'`}))

// GET endpoint
router.get('/highscore', cacheMiddleware(30), new HighscoreOneController().getHighscoreTable);

// GET endpoint for all players
router.get('/players', cacheMiddleware(30), auth, new HighscoreOneController().getAllPlayers);

// GET endpoint for one player
router.get('/players/:id', auth, new HighscoreOneController().getPlayerByID);

// POST endpoint --> for adding a new player
router.post('/players/create', auth, new HighscoreOneController().addPlayer);

// PUT endpoint 
router.put('/players/:id', auth, new HighscoreOneController().updatePlayer);

// DELETE endpoint
router.delete('/players/:id', auth, new HighscoreOneController().deletePlayer);

module.exports = router;