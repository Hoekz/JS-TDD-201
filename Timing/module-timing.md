# Timing

This module focuses on testing around the timing functions `setTimeout` and `setInterval`.

Mocking `requestAnimationFrame` is not covered, though is reasonably achievable.

## sinon

This chapter covers testing usage of `setTimeout` and `setInterval` using `sinon` with the test runner `mocha`.

### setTimeout instance

Let's first look at the function we want to test in [timing.js](/Timing/timing.js#L2-10).

It simply returns an object with a `value` key that changes after one second unless `cancel` is called.

### setup tests

In our [sinon.test.js](/Timing/sinon.test.js#L5-14) file, we set up a describe block with
a `beforeEach` that enables starts and captures sinon's fake timers, and an `afterEach`
that restores timers to normal behavior using the clock instance.

### first test

We then write [our first test](/Timing/sinon.test.js#L16-25) that uses the clock's
`tick` function to simulate 999ms passing and then 1ms passing.

### second test

And in [our second test](/Timing/sinon.test.js#L27-38) we can see that calling `cancel`
(which calls `clearTimeout`) does indeed stop the waiting function from executing after 1 second.

### setInterval instance

Looking at the function using `setInterval` in [timing.js](/Timing/timing.js#L12-20), we can see it
follows a very similar pattern, exposing a `value` that increments every second until the `cancel`
function is called.
