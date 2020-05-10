export default function createGame() {

	const state = {
		players: {},
		fruits: {},
		screen: {
			width: 10,
			height: 10
		}
	};

	let observers = [];

	function subscribe(observerFunction) {
		observers.push(observerFunction)
	}

	function notifyAll(command) {
		for(const observerFunction of observers) {
			observerFunction(command)
		}
	}

	function addPlayer(command){
		const {playerId} = command;
		const playerX = command.playerX ? command.playerX : Math.floor(Math.random() * state.screen.width);
		const playerY = command.playerY ? command.playerY : Math.floor(Math.random() * state.screen.height)
		
		console.log(command)

		state.players[playerId] = {
			x: playerX,
			y: playerY
		};

		notifyAll({
			type: 'add-player',
			playerId,
			playerX,
			playerY
		});
	}

	function removePlayer(command) {
		const {playerId} = command;
		delete state.players[playerId];

		notifyAll({
			type: 'remove-player',
			playerId
		});
	}

	function addFruit(command){
		const {fruitId} = command.fruitId ? command.fruitId : Math.floor(Math.random() * 1000000);
		const fruitX = command.fruitX ? command.fruitX : Math.floor(Math.random() * state.screen.width)
		const fruitY = command.fruitY ? command.fruitY : Math.floor(Math.random() * state.screen.height)
	
		state.fruits[fruitId] = {
			x: fruitX,
			y: fruitY
		};

		notifyAll({
			type: 'add-fruit',
			fruitId,
			fruitX,
			fruitY
		})
	}

	function start() {
		const frequency = 2000;
		setInterval(addFruit, frequency);
	}

	function removeFruit(command) {
		const {fruitId} = command;
		delete state.fruits[fruitId];
	}

	function movePlayer(command) {
		notifyAll(command);
		const acceptedMoves = {
			ArrowUp(player) {
				if(player.y - 1 >= 0){
					player.y = player.y - 1;
		}
			},
			ArrowDown(player) {
				if(player.y + 1 < state.screen.height){
					player.y = player.y + 1;
				}
			},
			ArrowLeft(player) {
				if(player.x - 1 >= 0){
					player.x = player.x - 1;
				}
			},
			ArrowRight(player) {
				if(player.x + 1 < state.screen.width){
					player.x = player.x + 1;
				}
			}
		}
		
		const {keyPressed, playerId} = command;
		let player = state.players[playerId];
		const moveFunction = acceptedMoves[keyPressed];

		if(player && moveFunction){
			moveFunction(player);
			checkForFruitCollision(player);
		}
	}

	function checkForFruitCollision(player) {
		for(const fruitId in state.fruits) {
			const fruit = state.fruits[fruitId];
			console.log(`Checking ${player.playerId} and ${fruitId}`);

			if(player.x === fruit.x && player.y === fruit.y){
				console.log(`COLLISION between ${player.playerId} and ${fruitId}`);
				removeFruit({fruitId});
			}
		}
	}

	function setState(newState){
		Object.assign(state, newState);
	}

	return {
		addPlayer,
		removePlayer,
		addFruit,
		removeFruit,
		movePlayer,
		state,
		setState,
		subscribe,
		start
	}
}