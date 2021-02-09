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
