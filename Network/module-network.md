# Network

This module focuses on testing network activity, particularly around `fetch`. While in many cases it may
seem more appropriate to mock at the service level such as when unit testing a component, a robust mocking
of the network layer can lead to more consistent tests, less code duplication, and more confidence in the
full vertical slice of a webpage.

The chapters are:
 - Mocking fetch yourself
 - Using `msw`
 - Mocking websockets

## Mocking Fetch Yourself

In this chapter, we'll take a look at how to mock `fetch` yourself. At the end of the chapter, I'll explain a few reasons
why this may or may not be a desireable approach.

There are a couple of external dependencies that will not be covered here such as `babel`, but they play very little role
in this particular chapter. It is also very likely that if you use an official starting point of a particular library like
`React` or `Angular`, much of this configuration will be handled for you and getting testing working will be a simpler
process.

### setup and teardown

To start out, let's consider how we want to interact with our mock during testing. Ideally, we will
be able to turn on and off the mock at will for extra control and explicitness in the tests.

In our [test.js](/Network/custom/test.js#L7-13), we've set up a `beforeAll` to `install` our mock
and an `afterAll` to `uninstall` it, which simply translate to the mock being active and then normal
behavoir being restored.

### mocking routes

We can also determine how we want to be able to mock routes. I've chosen to use a `mock` method that accepts one or more methods,
a url pattern, and a few extra options not shown [here](/Network/custom/test.js#L15-26). The return of this call is a mock that
I can then call `response` and pass in the JSON I want the endpoint to return.

Another decision was to include a `reset` call in the [afterEach](/Network/custom/test.js#L28-31) to allow each test to be treated
as though the mocks have not been used before.

There are many other approaches that could be taken to setting up these mocks, but remember that readability and flexibility
are important when rolling your own mock if it needs to be updated for future tests.

### internals - exports

Taking a look some of the internals of our mock in [mock-fetch.js](/Network/custom/mock-fetch.js#L144-155), we can see that most of our
methods are very simple. `install` simply sets `global.fetch` to our mocked function, `uninstall` restores the original `fetch`
definition, and `reset` empties out the `mocks` array.

Before we look at how to register a new mock, let's take a look at our `mockFetch` implementation.

### mockFetch

The [mockFetch](/Network/custom/mock-fetch.js#L86-107) implementation does a couple of things:

 1) backfill the config with the normal `fetch` defaults.
 2) removes the `body` of the request if it is a `GET` since this combination is not allowed.
 3) find the first mock that matches the method, url, body, and headers.
 4) If no match is found reject the request.
 5) Record the call.
 6) Create and resolve the response.

Some more work is done in the `Response` class as well, but already we can tell there's a lot more checking
and robustness that could be done. This is a major tradeoff of implementing this mock yourself: you get to
control it and can make it as simple as your situation calls for, but with the cost of edge-cases not
being covered or new test cases requiring changes to the mock.
