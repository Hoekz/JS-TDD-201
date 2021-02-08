const { rest } = require('msw');

const json = (body) => (_, res, ctx) => res(ctx.json(body));

const baseUrl = 'http://localhost:8080/api';

module.exports = [
    rest.get(`${baseUrl}/profile`, json({
        email: 'email@example.com',
        name: 'First Last',
        image: '/user-images/05af49e38d27c16b.png',
        tagline: 'JavaScript Developer at WWT',
    })),
    rest.put(`${baseUrl}/profile/tagline`, json({
        success: true,
    })),
];
