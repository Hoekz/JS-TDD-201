const { chromium } = require('playwright');
const App = require('./app-page');

const shouldMockRoutes = !!process.env.MOCK;

describe('2-Dew', () => {
    let browser, page;

    beforeAll(async () => browser = await chromium.launch());

    beforeEach(async () => {
        page = new App(await browser.newPage(), shouldMockRoutes);
        await page.load();
    });
    
    afterEach(() => page.close());
    
    afterAll(() => browser.close());

    it('should show the initial state of 3 lists', async () => {
        expect(await page.title).toBe('2-Dew');
        expect(await page.listCount).toEqual(3);
    });

    it('should show the corresponding todos when a list is selected', async () => {
        await page.selectList(-1);

        expect(await page.todoCount).toEqual(3);
    });

    describe('todo interaction', () => {
        const details = 'Brand new Todo';
        let beforeCount;

        beforeEach(async () => {
            await page.selectList(-1);
            beforeCount = await page.todoCount;

            await page.addTodo(details);
        });

        afterEach(async () => {
            await page.deleteTodo(-1);
    
            expect(await page.todoCount).toEqual(beforeCount);
        });

        it('should add a new todo with the correct label and class', async () => {
            expect((await page.todoCount) - beforeCount).toEqual(1);

            const todo = await page.getTodo(-1);

            expect(todo.text).toContain(details);
            expect(todo.classes).toContain('active');
        });
    });
});
