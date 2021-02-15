const App = require('../app-page');


describe('2-Dew', () => {
    const page = new App();

    beforeEach(() => {
        if (Cypress.env('MOCK')) {
            page.mock();
        }

        page.load();
    });

    it('should show the initial state of 3 lists', () => {
        page.title.should('eq', '2-Dew');
        page.lists.should('have.length', 3);
    });

    it('should show the corresponding todos when a list is selected', () => {
        page.selectList(-1);

        page.todos.should('have.length', 3);
    });

    describe('todo interaction', () => {
        const details = 'Brand new Todo';
        let beforeCount;

        beforeEach(() => {
            page.selectList(-1);
            page.todos.then((todos) => beforeCount = todos.length);

            page.addTodo(details);
        });

        afterEach(() => {
            page.deleteTodo(-1);
    
            page.todos.should('have.length', beforeCount);
        });

        it('should add a new todo with the correct label and class', () => {
            page.todos.should('have.length', beforeCount + 1);

            const todo = page.getTodo(-1);

            todo.should('contain', details);
            todo.should('have.class', 'active');
        });
    });
});
