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
