const createWebSocket = (onMessageCallback: Function) => {
	const socket = new WebSocket("ws://localhost:8080/ssh");

	// Connection opened
	socket.addEventListener("open", (event) => {
		console.log("WebSocket connection opened:", event);
	});

	// Listen for messages
	socket.addEventListener("message", (event) => {
		console.log("WebSocket message received:", typeof event.data);
		onMessageCallback(event.data);
	});

	// Connection closed
	socket.addEventListener("close", (event) => {
		console.log("WebSocket connection closed:", event);
	});

	return socket;
};

export default createWebSocket;
