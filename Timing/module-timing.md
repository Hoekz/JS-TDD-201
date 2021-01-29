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
