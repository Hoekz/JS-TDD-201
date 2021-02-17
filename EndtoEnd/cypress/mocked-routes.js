const testData = require('../test-data');

module.exports = {
    '/lists': (req) => {
        if (req.method === 'GET') {
            return req.reply(testData.map(({ name, id }) => ({ name, id })));
        }
    },
    '/lists/:id': (req) => {
        if (req.method === 'GET') {
            const id = req.url.split('/').pop();
            return req.reply(testData.find(list => list.id === id));
        }
    },
    '/lists/:id/task': (req) => {
        if (req.method === 'POST') {
            const [_, listId] = req.url.split('/').reverse();
            const list = testData.find(list => listId === list.id);
            const id = Math.random().toString(16).substr(2);
            const { details } = req.body;

            const task = { id, details, status: false };
            list.tasks.push(task);

            return req.reply(task);
        }
    },
    '/lists/:id/task/:id': (req) => {
        if (req.method === 'DELETE') {
            const [taskId, _, listId] = req.url.split('/').reverse();
            const list = testData.find(list => listId === list.id);

            list.tasks = list.tasks.filter(task => task.id !== taskId);

            return req.reply({ success: true });
        }
    },
};
