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
