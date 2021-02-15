const testData = require('../test-data');

const json = (route, data) => route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify(data),
    headers: { 'access-control-allow-origin': '*' },
    status: 200,
});

module.exports = {
    '/lists': (route, req) => {
        if (req.method() === 'GET') {
            return json(route, testData.map(({ name, id }) => ({ name, id })));
        }
    },
    '/lists/:id': (route, req) => {
        if (req.method() === 'GET') {
            const id = req.url().split('/').pop();
            return json(route, testData.find(list => list.id === id));
        }
    },
    '/lists/:id/task': (route, req) => {
        if (req.method() === 'POST') {
            const [_, listId] = req.url().split('/').reverse();
            const list = testData.find(list => listId === list.id);
            const id = Math.random().toString(16).substr(2);
            const { details } = req.postDataJSON();

            const task = { id, details, status: false };
            list.tasks.push(task);

            return json(route, task);
        }
    },
    '/lists/:id/task/:id': (route, req) => {
        if (req.method() === 'DELETE') {
            const [taskId, _, listId] = req.url().split('/').reverse();
            const list = testData.find(list => listId === list.id);

            list.tasks = list.tasks.filter(task => task.id !== taskId);

            return json(route, { success: true });
        }
    },
};
