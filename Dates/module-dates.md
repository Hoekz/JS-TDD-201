# Dates

This module covers working with `Date` in JavaScript. Each chapter covers a particular testing library or tool:

 - `jest` - `useFakeTimers`
 - `sinon` - `useFakeTimers`
 - `jasmine` - `clock -> mockDate`
 - `MockDate` - `set`

In some cases, it can be enough to simply mock `Date.now` as well, as many libraries use only this call before
applying custom functionality.

## sinon

This chapter goes over mocking the `Date` object with `sinon` in `mocha`. Sinon actually provides its
`fake-timers` implementation as a separate module for individual use and is relied on by `jest` for its
own implementation of `Date` mocking.
