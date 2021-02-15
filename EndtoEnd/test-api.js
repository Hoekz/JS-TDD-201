const fs = require('fs');
const { spawn } = require('child_process');
const sqlite3 = require('sqlite3');
const queries = require('./queries');
const lists = require('./test-data');

const dbFilename = process.env.DB;

try {
    fs.rmSync(dbFilename);
} catch(e) {}

const db = new sqlite3.Database(dbFilename);

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

async function createAndSeed() {
    await query(queries.createListTable);
    await query(queries.createTaskTable);

    for (const list of lists) {
        await query(queries.addList, list.id, list.name);

        for (const task of list.tasks) {
            await query(queries.addTask, task.id, list.id, task.details, task.status);
        }
    }
}

function closeAndDestroy() {
    return new Promise((resolve) => {
        db.close(() => {
            fs.rmSync(dbFilename);
            resolve();
        });
    });
}

const servers = {};

function startServer(cmd) {
    if (servers[cmd]) {
        return;
    } 

    servers[cmd] = spawn('npm', ['run', cmd], { stdio: 'inherit' });

    return new Promise(resolve => setTimeout(resolve, 2000));
}

function stopServer(cmd) {
    let resolve;
    const promise = new Promise(res => resolve = res);

    if (cmd in servers) {
        servers[cmd].on('exit', () => resolve());
        servers[cmd].kill();
        delete servers[cmd];
    }

    return promise;
}

async function run() {
    await createAndSeed();
    startServer('api');
}

async function stop() {
    await stopServer('api');
    closeAndDestroy();
}

process.on('SIGTERM', stop);
process.on('SIGINT', stop);

run();
