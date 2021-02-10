# Network

This module focuses on testing network activity, particularly around `fetch`. While in many cases it may
seem more appropriate to mock at the service level such as when unit testing a component, a robust mocking
of the network layer can lead to more consistent tests, less code duplication, and more confidence in the
full vertical slice of a webpage.

The chapters are:
 - Mocking fetch yourself
 - Using `msw`
 - Mocking websockets

## msw

This chapter takes a look at how to `msw` to mock out network traffic for testing purposes. Although this chapter won't cover it,
`msw` also supports mocking network traffic in a dev environment, which can be super handy as you can use the same mocks for
both tests and development, and allow completed API endpoints to pass through as they are completed.

There are a couple of external dependencies that will not be covered here such as babel. It is also very likely that if you use an
official starting point of a particular library like React or Angular, much of this configuration will be handled for you and
getting testing working will be a simpler process. If you are curious, the files to look at are the `.babelrc`, `jest.config.js`,
`package.json`, and `msw/setupTests.js`. Be aware though that this is a rough minimum amount of dependencies and code to get
this example working and should not be used as the starting point of a real project.

### setup and teardown

To start out, let's look at how to setup and teardown the `msw` server. For convenience, we
run it in the [setupTests.js](/Network/msw/setupTests.js#L5-9) where we `require` our server, set it to
`listen` before any tests run, have it `resetHandlers` after each test to cleanup the mocking mechanism,
and `close` the server after all the tests have run.

[Our server](/Network/msw/server.js#L1-5) simply takes the handlers we have created and calls to
`setupServer`. This approach allows us to keep our handlers decoupled from how they are mocked as well as
have easier control to turn off and on particular handlers potentially.

### mocking routes

In our [handlers.js](/Network/msw/handlers.js#L1-24) we have created our 2 mocked endpoints. We do this using the
`rest` creator (`msw` also provides a `graphql` creator) which allows us to match requests with a method and url
and then call a function in a very similar style to `ExpressJS`.

Our `GET` for `/profile` simply returns a static JSON body with the data we want. Our `PUT` for `/profile/tagline`
first checks if the request's body is present and responds with a `400` if not.

In this example, a `baseUrl` is being used, as projects often use separately hosted static file and API routes. A
`baseUrl` is not always required for `msw`, such as when operating in the browser and using the same base path as
the static site, but is required when operating inside NodeJS when there is no DOM-like environment.
