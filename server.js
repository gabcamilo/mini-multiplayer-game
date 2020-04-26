import express from "express";
import http from "http";
import createGame from "./public/game.js";

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

const game = createGame();

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0});
game.addPlayer({playerId: 'player2', playerX: 4, playerY: 1});
game.addPlayer({playerId: 'player3', playerX: 3, playerY: 7});
game.addFruit({fruitId: 'fruit1', fruitX: 9, fruitY: 6});
game.addFruit({fruitId: 'fruit2', fruitX: 3, fruitY: 4});

console.log(game.state)


server.listen(3000, () => {
	console.log('Server listening on port 3000');
});