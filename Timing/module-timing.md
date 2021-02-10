# Timing

This module focuses on testing around the timing functions `setTimeout` and `setInterval`.

Mocking `requestAnimationFrame` is not covered, though is reasonably achievable.

## jest

This chapter covers testing usage of `setTimeout` and `setInterval` in `jest`.

### setTimeout instance

Let's first look at the function we want to test in [timing.js](/Timing/timing.js#L2-10).

It simply returns an object with a `value` key that changes after one second unless `cancel` is called.

### setup tests

In our [jest.test.js](/Timing/jest.test.js#L3-11) file, we set up a describe block with
a `beforeEach` that enables jest's fake timers, and an `afterEach` that flushes the
pending calls before restoring the real timing functions.

### first test

We then write [our first test](/Timing/jest.test.js#L13-22) that uses the
`advanceTimersByTime` function to simulate 999ms passing and then 1ms passing.

### second test

And in [our second test](/Timing/jest.test.js#L24-35) we can see that calling `cancel`
(which calls `clearTimeout`) does indeed stop the waiting function from executing
after 1 second.

### setInterval instance

Looking at the function using `setInterval` in [timing.js](/Timing/timing.js#L12-20), we can see it
follows a very similar pattern, exposing a `value` that increments every second until the `cancel`
function is called.

### setup tests

We can use the same setup as before in [our test file](/Timing/jest.test.js#L38-46).

### last test

And we can write a test that increments the time by a few different amounts and
then `cancel` the interval in [our test file](/Timing/jest.test.js#L48-62).

### run the tests

We can of course run the tests and see that they all pass.
