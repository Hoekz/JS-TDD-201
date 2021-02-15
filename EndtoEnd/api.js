const fs = require('fs');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const queries = require('./queries');

const port = process.env.PORT;
const dbFilename = process.env.DB || ':memory:';

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(dbFilename, async () => {
    await query(queries.createListTable);
    await query(queries.createTaskTable);
});

const promisify = (method, thisArg) => (...args) => new Promise((resolve, reject) => {
    method.call(thisArg, ...args, function (err, value) {
        if (err) {
            reject(err);
        } else {
            resolve(value || this);
        } 
    });
});

const query = promisify(db.run, db);
const getOne = promisify(db.get, db);
const getAll = promisify(db.all, db);

app.get('/lists', async (req, res) => res.json(await getAll(queries.getLists)));

app.post('/lists', async (req, res) => {
    const { name } = req.body;
    const id = Math.random().toString(16).substr(2);

    try {
        await query(queries.addList, id, name);
        res.json({ name, id });
    } catch(e) {
        res.status(400).json({ error: 'Could not create list.' });
    }
});

app.get('/lists/:listId', async (req, res) => {
    const { listId } = req.params;

    const list = await getOne(queries.getList, listId);

    if (!list) {
        return res.status(400).json({ error: `No list with id ${listId}.` });
    }

    const tasks = await getAll(queries.getTasks, listId);

    res.json({ ...list, tasks });
});

app.delete('/lists/:listId', async () => {
    const { listId } = req.params;

    const { changes } = await query(queries.delList, listId);

    if (changes) {
        await query(queries.delListTasks, listId);
        res.json({ success: true });
    } else {
        res.status(400).json({ error: `No list with id ${listId}.` });
    }
});

app.post('/lists/:listId/task', async (req, res) => {
    const { listId } = req.params;
    const { details } = req.body;
    const id = Math.random().toString(16).substr(2);

    const list = await getOne(queries.getList, listId);

    if (!list) {
        return res.status(400).json({ error: `No list with id ${listId}.` });
    }

    try {
        await query(queries.addTask, id, listId, details, false);
        res.json({ details, status: false, id });
    } catch(e) {
        res.status(400).json({ error: 'Could not create task.' });
    }
});

app.put('/lists/:listId/task/:taskId', async (req, res) => {
    const { listId, taskId } = req.params;
    const { details, status } = req.body;

    const { changes } = await query(queries.modTask, details.toString(), !!status, taskId, listId);

    if (changes) {
        res.json({ success: true });
    } else {
        res.status(400).json({ error: `No task with id ${taskId} in a list with id ${listId}.` });
    }
});

app.delete('/lists/:listId/task/:taskId', async (req, res) => {
    const { listId, taskId } = req.params;

    const { changes } = await query(queries.delTask, taskId, listId);

    if (changes) {
        res.json({ success: true });
    } else {
        res.status(400).json({ error: `No task with id ${taskId} in a list with id ${listId}.` });
    }
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
    fs.writeFileSync('./public/config.json', JSON.stringify({ apiUrl: `http://localhost:${port}` }));
});
