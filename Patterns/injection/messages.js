const { register } = require('./engine');

module.exports = register('messages', {
    dependencies: ['http'],
    async init(http) {
        try {
            const messages = await http.get('/api/messages');
    
            return messages
                .filter(message => !message.deleted)
                .map(message => message.text);
        } catch(details) {
            return [`A problem occurred: ${details.error}`];
        }
    }
});
