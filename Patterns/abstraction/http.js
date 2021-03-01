const thirdParty = require('third-party-that-does-not-exist');

module.exports = {
    async get(url) {
        const { success, data } = await thirdParty.get(url);

        if (!success) {
            throw data;
        }

        return data;
    }
};
