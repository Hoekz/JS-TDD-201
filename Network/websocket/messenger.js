
let socket;
let lastUpdated = null;

const subscriptions = [];
const messages = [];

function unsubscribe(fn) {
    subscriptions.splice(subscriptions.indexOf(fn), 1);

    if (!subscriptions.length) {
        socket.close();
        socket = null;
    }
}

function subscribe(fn) {
    subscriptions.push(fn);

    if (!socket) {
        socket = new WebSocket('ws://localhost:1234');

        socket.onmessage = (e) => {
            const newMessages = JSON.parse(e.data);
            messages.push(...newMessages);
            lastUpdated = Date.now();

            subscriptions.forEach(sub => sub(newMessages));
        };

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'GET', since: lastUpdated }));
        };
    }

    return () => unsubscribe(fn);
}

function send(sender, text) {
    socket.send(JSON.stringify([{ type: 'POST', sender, text }]));
}

module.exports = {
    subscribe,
    unsubscribe,
    send,
    messages,
};
