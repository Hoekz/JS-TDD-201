const messages = require('./messages');
const { register, reset } = require('./engine');

describe('messages', () => {
    let http = { get: jest.fn() };

    beforeAll(() => {
        register('http', {
            dependencies: [],
            init: () => http,
        })
    });

    afterEach(() => {
        reset();
    });

    it('should handle a set of messages', async () => {
        http.get.mockResolvedValue([
            { deleted: true, text: 'Should not appear.' },
            { deleted: false, text: 'Should appear.' },
            { deleted: false, text: 'Should also appear.' },
        ]);

        const actual = await messages.run();

        expect(actual).toEqual([
            'Should appear.',
            'Should also appear.',
        ]);
    });

    it('should handle messages not being returned', async () => {
        http.get.mockRejectedValue({
            error: 'Could not find any messages.',
        });

        const actual = await messages.run();

        expect(actual).toEqual([
            'A problem occurred: Could not find any messages.'
        ]);
    });
});
