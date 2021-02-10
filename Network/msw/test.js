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

    it('should error when no tagline is sent', async () => {
        await store.actions.getProfile();

        let failed = false;

        try {
            await store.actions.updateTagline('');
        } catch (e) {
            failed = true;
            expect(e.message).toEqual('No tagline provided.');
        }

        expect(failed).toBeTruthy();
        expect(store.values.profile.tagline).toEqual('JavaScript Developer at WWT');
    });
});
