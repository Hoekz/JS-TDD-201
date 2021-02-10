# Network

This module focuses on testing network activity, particularly around `fetch`. While in many cases it may
seem more appropriate to mock at the service level such as when unit testing a component, a robust mocking
of the network layer can lead to more consistent tests, less code duplication, and more confidence in the
full vertical slice of a webpage.

The chapters are:
 - Mocking fetch yourself
 - Using `msw`
 - Mocking websockets

## Websockets

While far less common than REST or GraphQL APIs, websockets come in handy for many real-time tasks such as status
indicators, messaging, or incoming changes.

This chapter will look at using `jest-websocket-mock` (which depends on `mock-socket`) which provides assertion
statements and other helpful tools to emulate a server handling and sending messages to the client-side
websocket.

The code here uses the native `WebSocket` API as it has fairly reasonable cross-browser compatibility, though a
library like `socket-io` is recommended for backwards compatibility features like long-polling.

### test imports

In our [test.js](/Network/websocket/test.js#L1-6) we're actually going to use `testing-library` for most of our
assertions and interactions to simulate the full behavior of our web app. Here's a breakdown of our imports:

 - `jest-dom`: adds custom matchers for assertions in jest regarding the DOM.
 - `user-event`: allows us to simulate user interactions like clicks and typing.
 - `dom`: allows us to find elements in the DOM, in particular with test IDs.
 - `jest-websocket-mock`: allows us to create our fake websocket server.

Our `app` is very simple vanilla JavaScript code that uses the native DOM APIs to create a basic messaging app.
We're going to ignore the actual app's implementation for the most part and treat it as a black box, only
focusing on the behavior the tests are looking for.
