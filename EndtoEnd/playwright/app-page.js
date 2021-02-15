const mockedRoutes = require('./mocked-routes');

const child = (n) => n < 0 ? `nth-last-child(${-n})` : `nth-child(${n})`;
const urlToRegex = (url) => new RegExp(url.replace(/:[^\/]+/g, '[^\\/]+') + '$');

module.exports = class App {
    constructor(page, mockRoutes) {
        this.page = page;

        if (mockRoutes) {
            for (const [url, handler] of Object.entries(mockedRoutes)) {
                this.page.route(urlToRegex(url), handler);
            }
        }
    }

    load() {
        return this.page.goto('http://localhost:5000'); 
    }

    close() {
        return this.page.close();
    }

    get title() {
        return this.page.title();
    }

    get listCount() {
        return this.page.$$eval('#lists .item', (el) => el.length);
    }

    get todoCount() {
        return this.page.$$eval('#todos .item', (el) => el.length);
    }

    selectList(n) {
        return this.page.click(`#lists .item:${child(n)}`);
    }

    async addTodo(details) {
        await this.page.fill('#todo-details', details);

        await Promise.all([
            this.page.waitForResponse(/task$/),
            this.page.click('#todo-add'),
        ]);
    }

    getTodo(n) {
        return this.page.$eval(`#todos .item:${child(n)}`, (el) => ({
            text: el.innerText, 
            classes: el.className,
        }));
    }

    deleteTodo(n) {
        return Promise.all([
            this.page.waitForResponse(/task/),
            this.page.click(`#todos .item:${child(n)} .delete`),
        ]);
    }
}
