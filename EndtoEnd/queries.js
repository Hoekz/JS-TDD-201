const createListTable = `
CREATE TABLE IF NOT EXISTS lists (
    id text PRIMARY KEY,
    name text
);
`;

const getLists = `SELECT id, name FROM lists`;
const getList = `SELECT id, name FROM lists WHERE id = ?`;
const addList = `INSERT INTO lists (id, name) VALUES (?, ?)`;
const delList = `DELETE FROM lists WHERE id = ?`;

const createTaskTable = `
CREATE TABLE IF NOT EXISTS tasks (
    id text PRIMARY KEY,
    list_id text,
    details text,
    status int
);
`;

const getTasks = `SELECT id, list_id, details, status FROM tasks WHERE list_id = ?`;
const addTask = `INSERT INTO tasks (id, list_id, details, status) VALUES (?, ?, ?, ?)`;
const delTask = `DELETE FROM tasks WHERE id = ? AND list_id = ?`;
const modTask = `UPDATE tasks SET details = ?, status = ? WHERE id = ? AND list_id = ?`;
const delListTasks = `DELETE FROM tasks WHERE list_id = ?`;

module.exports = {
    createListTable, getLists, getList, addList, delList,
    createTaskTable, getTasks, addTask, delTask, modTask, delListTasks,
};
