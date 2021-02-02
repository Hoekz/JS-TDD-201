# Dates

This module covers working with `Date` in JavaScript. Each chapter covers a particular testing library or tool:

 - `jest` - `useFakeTimers`
 - `sinon` - `useFakeTimers`
 - `jasmine` - `clock -> mockDate`
 - `MockDate` - `set`

In some cases, it can be enough to simply mock `Date.now` as well, as many libraries use only this call before
applying custom functionality.

## jest

This chapter goes over mocking the `Date` object in `jest`. Jest actually uses sinon's `fake-timers` module
under the hood, which means the solution ends up very similar.

### reminders setup

We'll start by looking at the code we want to test in [reminders.js](/Dates/reminders.js#L1-19), a simple collection of date-based reminders.

For internal purposes, we declare our `reminders` array, a quick lookup table for days of the week, and a function to help us sort dates
as strings for easier comparisons at the date level.
