const store = require('./store');

describe('store', () => {    
    afterEach(() => {
        store.actions.reset();
    });

    it('should retrieve the data from the API', async () => {
        await store.actions.getProfile();

        expect(store.values.profile.email).toEqual('email@example.com');
        expect(store.values.profile.tagline).toEqual('JavaScript Developer at WWT');
    });

    it('should call to update the tagline', async () => {
        await store.actions.getProfile();
        await store.actions.updateTagline('Fullstack Developer at WWT');

        expect(store.values.profile.tagline).toEqual('Fullstack Developer at WWT');
    });
});
