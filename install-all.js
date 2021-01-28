const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const files = fs.readdirSync('.');
const folders = files.filter(file => !file.includes('.'));

const tasks = folders.map((folder) => {
    return new Promise((resolve) => {
        exec('npm ci', { cwd: path.join(process.cwd(), folder) }, resolve);
    })
});
