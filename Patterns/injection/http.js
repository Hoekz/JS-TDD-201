const { register } = require('./engine');

module.exports = register('http', {
    dependencies: [],
    async init() {
        return {
            async get(url) {
                const response = await fetch(url);
                const data = await response.json();

                if (!response.ok) {
                    throw data;
                }

                return data;
            }
        }
    }
});
