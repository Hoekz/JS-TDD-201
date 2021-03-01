
const modules = {};
const values = {};

function register(name, { dependencies, init }) {
    modules[name] = { dependencies, init };

    return {
        run() {
            return resolve(name);
        }
    };
}

function resolve(name) {
    if (name in values) {
        return values[name];
    }

    if (!(name in modules)) {
        throw new Error(`Unrecognized module: ${name}.`);
    }

    const { dependencies, init } = modules[name];

    const injectables = dependencies.map(resolve);

    return values[name] = init(...injectables);
}

function reset(full = false) {
    for (const module in values) {
        delete values[module];
    }

    if (full) {
        for (const module in modules) {
            delete modules[module];
        }
    }
}

module.exports = { register, resolve, reset };
