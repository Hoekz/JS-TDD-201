const messenger = require('./messenger');

let DOM = {};

function addMessage({ id, at, text, sender }, self) {
    const message = document.createElement('div');
    
    message.classList.add('message', sender === self ? 'me' : 'other');
    message.setAttribute('data-testid', id);
    message.setAttribute('data-time', at);
    message.innerHTML = text;
    
    DOM.messages.appendChild(message);
}

function start(target = document.body) {
    const id = Math.random().toString(16).substr(2);
    
    target.innerHTML = `
    <div data-testid="messages"></div>
    <div>
    <textarea data-testid="text"></textarea>
    <button data-testid="send">Send</button>
    </div>
    `;
    
    DOM.target = target;
    DOM.messages = target.querySelector('[data-testid="messages"]');
    DOM.text = target.querySelector('[data-testid="text"]');
    DOM.send = target.querySelector('[data-testid="send"]');

    DOM.text.onchange = () => DOM.text.value
        ? DOM.send.removeAttribute('disabled')
        : DOM.send.setAttribute('disabled', '');

    DOM.send.onclick = () => messenger.send(id, DOM.text.value);

    messenger.subscribe((messages) => messages.forEach((message) => addMessage(message, id)));
}

function stop() {
    DOM.target.innerHTML = '';
    DOM = {};
}

module.exports = { start, stop };
