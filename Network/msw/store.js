
const baseUrl = 'http://localhost:8080/api';

const store = {
    actions: {
        async getProfile() {
            const res = await fetch(`${baseUrl}/profile`);
            const json = await res.json();

            store.values.profile = json;

            return json;
        },
        async updateTagline(tagline) {
            try {
                await fetch(`${baseUrl}/profile/tagline`, { method: 'PUT' });
                store.values.profile.tagline = tagline;
            } catch (e) {
                throw new Error('could not update email.');
            }
        },
        reset() {
            store.values = {};
        }
    },
    values: {},
};

module.exports = store;
