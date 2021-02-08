const realFetch = global.fetch;

class Headers {
    constructor(initial = {}) {
        this.headers = {};

        for (const header in initial) {
            this.headers[header.toLowerCase()] = initial[header];
        }
    }

    freeze() {
        Object.freeze(this.headers);
    }

    get(header) {
        return this.headers[header.toLowerCase()];
    }

    set(header, value) {
        this.headers[header.toLowerCase()] = value.toString();
    }

    has(header) {
        return header.toLowerCase() in this.headers;
    }
}

class Response {
    constructor({ status, body = '', headers = {}, url }) {
        this._url = url;
        this._status = status;
        this._headers = new Headers(headers);
        this.body = body;
        this.bodyUsed = false;

        if (body instanceof Object && !this.headers.has('content-type')) {
            this.headers.set('content-type', 'application/json');
        }

        this.headers.freeze();
    }

    get url() { return this._url; }
    get status() { return this._status; }
    get ok() { return this.status >= 200 && this.status <= 299; }
    get headers() { return this._headers; }

    json() {
        if (this.bodyUsed) {
            throw new TypeError('body stream already read');
        }

        this.bodyUsed = true;

        if (typeof this.body === 'string') {
            try {
                return Promise.resolve(JSON.parse(this.body));
            } catch(e) {
                return Promise.reject(e);
            }
        }

        return Promise.resolve(this.body);
    }

    text() {
        if (this.bodyUsed) {
            throw new TypeError('body stream already read');
        }

        this.bodyUsed = true;

        return Promise.resolve(this.body.toString());
    }
}

let mocks = [];

const defaultConfig = {
    method: 'GET',
    headers: {},
    body: null,
};

function mockFetch(url, config = {}) {
    config = Object.assign({}, defaultConfig, config);

    if (config.method === 'GET') {
        config.body = null;
    }

    const match = mocks.find((mock) => 
        mock.methods.includes(config.method) &&
        mock.url.test(url) &&
        mock.body(config.body) &&
        mock.headers(config.headers)
    );

    if (!match) {
        return Promise.reject(new Error(`No mocked routes match request to ${url} with config ${JSON.stringify(config, null, 4)}`));
    }

    match.calls.push({ url, config });

    return Promise.resolve(new Response({ ...match.response, url }));
}

const pass = () => true;
const OK = { status: 200 };

function urlToRegex(url) {
    return new RegExp(url.replace(/:[^\/]+/g, '[^\\/]+'));
}

function mock(methods, url, config = {}, response = OK) {
    const mock = {
        methods: typeof methods === 'string' ? [methods] : methods,
        url: url instanceof RegExp ? url : urlToRegex(url),
        body: config.body || pass,
        headers: config.headers || pass,
        response,
        calls: [],
    };

    mocks.unshift(mock);

    const wrapper = {
        remove() {
            mocks.splice(mocks.indexOf(mock), 1);
        },
        response(body, status = 200, headers = {}) {
            mock.response = { body, status, headers };
            return wrapper;
        },
        get called() {
            return mock.calls.length > 0;
        },
    };

    return wrapper;
}

module.exports = {
    install() {
        global.fetch = mockFetch;    
    },
    uninstall() {
        global.fetch = realFetch;
    },
    reset() {
        mocks = [];
    },
    mock,
};
