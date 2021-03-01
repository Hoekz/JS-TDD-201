# Patterns

These are common patterns for increasing testability you might consider using or run into while working in JavaScript.

## Dependency Injection

Dependency Injection is not as common a pattern as it used to be, though it is still featured very prominently in
Angular. The idea behind dependency injection is to allow any function, object, or library that a chunk of code is
dependent on to be passed in or injected, thereby allowing tests to pass in any replacements such as mocks.

This chapter will use a very simple implementation of a dependency injection engine for clarity.

### Engine: Register

We can start by taking a look at a very basic injection engine. Our [engine.js](/Patterns/injection/engine.js#L1-13) starts with
a simple `register` function that adds a named `module` with its list of `dependencies` and `init` function. For convenience,
it also returns a simple wrapper that will `run` that module.

### Engine: Resolve

The `run` helper simply calls the [resolve](/Patterns/injection/engine.js#L15-29) function, which checks to see if a `value` has already
been calculated and, if not, recursively calls to `resolve` the dependencies before injecting the resulting values into the `init`
function and returning the result.

This allows for easily creating a dependency tree with any level of depth to it, as well as sharing dependencies between modules.

It is worth noting that this implementation does not include detection of circular dependencies, which would result in a call stack overflow,
but most existing systems should be able to warn you about this.

### Engine: Reset

Finally, we have a [reset](/Patterns/injection/engine.js#L31-43) function that allows us to remove all calculated values and
optionally remove all registered modules as well. We then expose all 3 of these functions.

### Example: Messages

We can see an example of how this simple engine is used in [messages.js](/Patterns/injection/messages.js#L1-16). We `register`
a new module called `'messages'` which depends on `'http'`. Our `init` function then receives an `http` object resolved by
the engine.

In this particular case, we're using an `http.get` call that throws when a problem occurs. We're only calling this once here,
but we could wrap our call inside another function so that it could be invoked later on and multiple times, but would still
end up using the same injected `http` object.

### Example: Http

The injected module [http](/Patterns/injection/http.js#L1-19) also must call to `register` itself with the engine. This module
simply provides a `get` method that always gets `json` data from `fetch` and throws when the status code is not a `200`.

### Test: Setup

Here's how dependency injection can be tested. In the simplest case, we could actually just call any `init` function directly with
whatever dependencies we desired, but this can quickly become impractical as the dependency tree gets deeper and we need to test
how the modules are integrated with one another.

Instead, we can mock a module by calling `register` in our tests. Because messages needs to be `run` before the dependency is resolved,
we can load it on its own and then `register` a fake `'http'` module in our [test.js](/Patterns/injection/test.js#L1-16).

We can also hook into our `reset` function so that we guarantee new instances of each module in each test.

### Test: Run

Our actual [tests](/Patterns/injection/test.js#L18-43) can then setup mocks for both the happy path (returning a list of messages
that need to be filtered) and the sad path (a rejection by the API call) and verify that our `messages` module handles both
cases correctly.

Notice that now we could switch out the implementation of `http` to use something like `axios` instead of the native `fetch`,
or maybe retrieve the data from a `WebSocket` or `ServiceWorker` and our tests around `messages` don't need to know about it, so
long as we keep the interface consistent.
