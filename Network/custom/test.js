const mockFetch = require('./mock-fetch');
const store = require('./store');

describe('store', () => {
    let getMock, putMock;

    beforeAll(() => {
        mockFetch.install();
    });

    afterAll(() => {
        mockFetch.uninstall();
    });

    beforeEach(() => {
        getMock = mockFetch.mock('GET', '/api/profile').response({
            email: 'email@example.com',
            name: 'First Last',
            image: '/user-images/05af49e38d27c16b.png',
            tagline: 'JavaScript Developer at WWT',
        });

        putMock = mockFetch.mock('PUT', '/api/profile/tagline').response({
            success: true,
        });
    });
    
    afterEach(() => {
        store.actions.reset();
        mockFetch.reset();
    });

    it('should retrieve the data from the API', async () => {
        await store.actions.getProfile();

        expect(store.values.profile.email).toEqual('email@example.com');
        expect(store.values.profile.tagline).toEqual('JavaScript Developer at WWT');
    });

    it('should call to update the tagline', async () => {
        await store.actions.getProfile();

        expect(putMock.called).toEqual(false);

        await store.actions.updateTagline('Fullstack Developer at WWT');

        expect(store.values.profile.tagline).toEqual('Fullstack Developer at WWT');
        expect(putMock.called).toEqual(true);
    });
});
