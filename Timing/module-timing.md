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
