/**
 * "Routes" (Mini App - Subpaths) to forward the supported requests.
 * Only serves for testing (For Unity Testing)
 */

const express = require('express');
const auth = require('../auth/basic-auth');

const router = express.Router();

//import the controller
const TestController = require('../controllers/TestController');

// GET endpoint
router.get('/testplayers', auth, new TestController().getAllPlayers);

// GET endpoint for one player
router.get('/testplayers/:id', auth, new TestController().getPlayerByID);

// POST endpoint --> for adding a new player
router.post('/testplayers/create', auth, new TestController().addPlayer);

// PUT endpoint 
router.put('/testplayers/:id', auth, new TestController().updatePlayer);

// DELETE endpoint
router.delete('/testplayers/:id', auth, new TestController().deletePlayer);

module.exports = router;