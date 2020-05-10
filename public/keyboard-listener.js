export default function createKeyboardListener(document){
	const state = {
		observers: [],
		playerId: null
	}

	function registerPlayerId(command){
		state.playerId = command.playerId;
	}

	function subscribe(observerFunction) {
		state.observers.push(observerFunction)
	}

	function notifyAll(command) {
		for(const observerFunction of state.observers) {
			observerFunction(command)
		}
	}

	document.addEventListener('keydown', handleKeyDown);
	
	function handleKeyDown(event) {
		const keyPressed = event.key;

		const command = {
			type: 'move-player',
			playerId: state.playerId,
			keyPressed
		}

		notifyAll(command);
	}

	return{
		registerPlayerId,
		subscribe
	}
}