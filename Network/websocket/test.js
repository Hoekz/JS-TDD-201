require('@testing-library/jest-dom');
const userEvent = require('@testing-library/user-event').default;
const { getByTestId } = require('@testing-library/dom');

const { WS } = require('jest-websocket-mock');
const app = require('./app');

let server;
const sender = 'other_sender';

describe('messenger app', () => {
    beforeAll(async () => {
        server = new WS('ws://localhost:1234', { jsonProtocol: true });
        app.start();

        await server.connected;
        await server.nextMessage;
    });

    afterAll(() => {
        app.stop();
        server.close();
    });

    it('should accept incoming messages', () => {
        const text = 'Hello there.';
        server.send([{ id: '123', at: Date.now(), text, sender }]);

        const message = getByTestId(document.body, '123');

        expect(message).toHaveTextContent(text);
        expect(message).toHaveClass('other');
    });

    it('should add messages sent by the user', async () => {
        const text = 'General Kenobi.';
        await userEvent.type(getByTestId(document.body, 'text'), text);
        userEvent.click(getByTestId(document.body, 'send'));

        const [sent] = await server.nextMessage;

        expect(sent.text).toEqual(text);

        server.send([{ ...sent, id: '456' }]);

        const message = getByTestId(document.body, '456');

        expect(message).toHaveTextContent(text);
        expect(message).toHaveClass('me');
    });
});
