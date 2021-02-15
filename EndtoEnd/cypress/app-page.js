const mockedRoutes = require('./mocked-routes');

const child = (n) => n < 0 ? `nth-last-child(${-n})` : `nth-child(${n})`;
const urlToRegex = (url) => new RegExp(url.replace(/:[^\/]+/g, '[^\\/]+') + '$');

module.exports = class App {
    mock() {
        for (const [url, handler] of Object.entries(mockedRoutes)) {
            cy.intercept(urlToRegex(url), handler);
        }
    }

    load() {
        return cy.visit('/'); 
    }

    get title() {
        return cy.title();
    }

    get lists() {
        return cy.get('#lists .item');
    }

    get todos() {
        return cy.get('#todos .item');
    }

    selectList(n) {
        cy.get(`#lists .item:${child(n)}`).click();
    }

    addTodo(details) {
        cy.get('#todo-details').type(details);
        cy.get('#todo-add').click();
    }

    getTodo(n) {
        return cy.get(`#todos .item:${child(n)}`);
    }

    deleteTodo(n) {
        cy.get(`#todos .item:${child(n)} .delete`).click();
    }
}
