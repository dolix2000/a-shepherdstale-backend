-- file for creating tables--

--DROP TABLE players;
--DROP TABLE testplayers;

CREATE TABLE IF NOT EXISTS players(
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(30) NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    play_time VARCHAR(8) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS testplayers(
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(30) NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    play_time VARCHAR(8) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
)