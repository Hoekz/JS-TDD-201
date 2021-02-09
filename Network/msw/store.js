
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
            const response = await fetch(`${baseUrl}/profile/tagline`, {
                method: 'PUT',
                body: tagline,
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            store.values.profile.tagline = tagline;
        },
        reset() {
            store.values = {};
        }
    },
    values: {},
};

module.exports = store;
