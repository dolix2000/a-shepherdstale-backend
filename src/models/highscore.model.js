/**
 * Model: Handles interaction with database, returns data to controller.
 */
const db = require("../config/db");
const BadSyntaxError = require("../errors/error");

//handles any interaction with the database, then returns the data to the controller to render a view.

//  for exporting the functions below
// storing function in object
const Highscore = { };

// get all players
Highscore.get = async (tablename) => {
  const results = await db.pool.query(
    `SELECT player_name, score, play_time, TO_CHAR(created_at, 'DD.MM.YY') AS date FROM ${db.escapeIdentifier(tablename)} ORDER BY score DESC LIMIT 10;`);
  return results.rows;
};

// get player by id
Highscore.getById = async (tablename, id) => {
  const results = await db.pool.query(`SELECT * FROM ${db.escapeIdentifier(tablename)} WHERE id = $1;`,
  [id,]
  );

  // throw error if specific id was not found
  if (!results.rows[0].id) {
    throw new BadSyntaxError("Id doesn't exist");
  }
  return results.rows;
};

// add new player
Highscore.create = async (tablename, player) => {
  const results = await db.pool.query(
    `INSERT INTO ${db.escapeIdentifier(tablename)} (player_name, score, play_time) VALUES ($1, $2, $3) RETURNING id;`,
    [player.player_name, player.score, player.play_time]
  );

  // throw error if null values or no param were provided
  if (!results.rowCount) {
    throw new BadSyntaxError("No null values!");
  }
  return results.rows;
};

// update player by id
Highscore.update = async (tablename, id, player) => {
  const results = await db.pool.query(
    `UPDATE ${db.escapeIdentifier(tablename)} SET score = $1, play_time = $2, created_at = CURRENT_DATE WHERE id = $3 RETURNING id;`,
    [player.score, player.play_time, id]
  );

  // throw error if rows weren't affected
  if (!results.rowCount) {
    throw new BadSyntaxError("Id doesn't exist");
  }
  return results.rows;
};

// delete player by id
Highscore.delete = async (tablename, id) => {
  const results = await db.pool.query(
    `DELETE FROM ${tablename} WHERE id = $1 RETURNING *;`,
    [id]
  );
  console.log(results.rowCount);

  // if no rows which got deleted exist throw error
  if (results.rowCount == 0) {
    throw new BadSyntaxError("Id doesn't exist");
  }
  return results.rows;
};

module.exports = Highscore;
