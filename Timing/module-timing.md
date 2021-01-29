# Timing

This module focuses on testing around the timing functions `setTimeout` and `setInterval`.

Mocking `requestAnimationFrame` is not covered, though is reasonably achievable.

## jasmine

This chapter covers testing usage of `setTimeout` and `setInterval` in `jasmine`.

### setTimeout instance

Let's first look at the function we want to test in [timing.js](/Timing/timing.js#L2-10).

It simply returns an object with a `value` key that changes after one second unless `cancel` is called.

### setup tests

In our [jasmine.test.js](/Timing/jasmine.test.js#L3-10) file, we set up a describe block with
a `beforeEach` that installs jasmine's clock, and an `afterEach` that uninstalls it.

This clock controls time stepping both for timing functions and dates.

### first test

We then write [our first test](/Timing/jasmine.test.js#L12-21) that uses the clock's
`tick` function to simulate 999ms passing and then 1ms passing.

### second test

And in [our second test](/Timing/jasmine.test.js#L23-34) we can see that calling `cancel`
(which calls `clearTimeout`) does indeed stop the waiting function from executing after 1 second.

### setInterval instance

Looking at the function using `setInterval` in [timing.js](/Timing/timing.js#L12-20), we can see it
follows a very similar pattern, exposing a `value` that increments every second until the `cancel`
function is called.

### setup tests

We can use the same setup as before in [our test file](/Timing/jasmine.test.js#L37-44).
