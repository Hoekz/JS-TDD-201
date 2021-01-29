# Timing

This module focuses on testing around the timing functions `setTimeout` and `setInterval`.

Mocking `requestAnimationFrame` is not covered, though is reasonably achievable.

## sinon

This chapter covers testing usage of `setTimeout` and `setInterval` using `sinon` with the test runner `mocha`.

### setTimeout instance

Let's first look at the function we want to test in [timing.js](/Timing/timing.js#L2-10).

It simply returns an object with a `value` key that changes after one second unless `cancel` is called.
