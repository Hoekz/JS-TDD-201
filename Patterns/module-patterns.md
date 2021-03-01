# Patterns

These are common patterns for increasing testability you might consider using or run into while working in JavaScript.

## Abstraction Layer

While the phrase "abstraction layer" is usually used more to refer to an implementation guide, you can use an
abstraction layer in your own code as a way to abstract away a third party you depend on so that moving to a
different library or a new version that might break things is easier to handle. You should only have to adapt
to the changes in one location in the code, rather than affecting everywhere the functionality is used.

This approach also allows you to mock your abstraction layer in tests and avoid the third party having any affect
on them, which can be important when dealing with libraries that can have side effects as well. The tradeoff here
is that now there is code to be covered by tests in your abstraction layer that is vulnerable to the same breaking
changes or side effects as before. Testing the abstraction layer can arguably be covered by something like
end to end tests as well, which could save you brittle unit tests, but needs to be agreed upon as a team.

### Example: Messages

We can see the usage of our abstraction layer in [messages.js](/Patterns/abstraction/messages.js#L1-15). We `require` and use our
`http` service to try to `get` a list of messages, and if that call fails, display an error message.

### Example: Http

Our [http.js](/Patterns/abstraction/http.js#L1-13) is actually relying on a non-existent package to help illustrate the point.
We are pretending that we have some other service with a `get` method that returns us a `success` flag and `data`. In the case
that `success` is falsy, we `throw` the data, as it should contain more information about why we did not succeed.

### Test: Setup

We're now able to set up our tests to take our abstraction into account. In our [test.js](/Patterns/abstraction/test.js#L1-4) we can use
`jest.mock` in order mock our abstract `http` module so that the third party library is not visible at all.

If you are unfamiliar with `jest.mock`, The call is automatically hoisted by `babel` and can intercept both `require` and `import`. We
can then get access to our mock by using `require` in our test if we need to make modifications.

### Test: Run

Our actual [tests](/Patterns/abstraction/test.js#L6-33) can then setup mocks for both the happy path (returning a list
of messages that need to be filtered) and the sad path (a rejection by the third party call) and verify that both
are handled correctly.

We could now switch out the underlying code in `http` for some other third party library, make extra calls, keep track
of state internally, or many other things and our implementation and tests around `messages` don't need to change at all.
