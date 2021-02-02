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

### reminders setup

We'll start by looking at the code we want to test in [reminders.js](/Dates/reminders.js#L1-19), a simple collection of date-based reminders.

For internal purposes, we declare our `reminders` array, a quick lookup table for days of the week, and a function to help us sort dates
as strings for easier comparisons at the date level.

### reminders exports

We then export some methods from [reminders.js](/Dates/reminders.js#L21-40) to add, check, and clear reminders.

Our `addDailyReminder` method shows that each reminder will consist of a `label`, a `start` date, an `end` date,
and a `days` list to indicate what days of the week the reminder should trigger on.

Our `getDailyReminders` method simply gets the current date and filters the reminders by whether the day of week
matches and the date falls between the `start` and `end`. It then returns each of the corresponding labels.

Our `clearReminders` method simply resets the list of reminders. We've also exposed the `day` of week lookup object.

### test setup

In our [sinon.test.js](/Dates/sinon.test.js#L5-15) file, we can setup a `sinon` clock that enables mocking of timing
functionality.

We also have a call to `restore` the clock, which restores JavaScript to normal behavior. We also call `clearReminders`
to avoid tests polluting one another.

### set system time

We can then create a test in [our test file](/Dates/sinon.test.js#L17-33) that illustrates how to mock a date.
We can call our clock's `setSystemTime` with a constructed `Date` to set the exact time and verify that when
the date and day of week match, we get back the created reminder.

### run the tests

When we run the tests, we can actually add an extra layer of safety to avoid potential timezone issues.

`NodeJS` uses the environment variable `TZ` to determine what timezone to create dates for, so we can
simply use `env TZ=GMT npm run sinon.test` to ensure our tests always run in the same timezone, regardless
of if we are running on a personal machine, or on a build machine elsewhere.
