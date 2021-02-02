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

### reminders exports

We then export some methods from [reminders.js](/Dates/reminders.js#L21-40) to add, check, and clear reminders.

Our `addDailyReminder` method shows that each reminder will consist of a `label`, a `start` date, an `end` date,
and a `days` list to indicate what days of the week the reminder should trigger on.

Our `getDailyReminders` method simply gets the current date and filters the reminders by whether the day of week
matches and the date falls between the `start` and `end`. It then returns each of the corresponding labels.

Our `clearReminders` method simply resets the list of reminders. We've also exposed the `day` of week lookup object.

### test setup

In our [jest.test.js](/Dates/jest.test.js#L3-11) file, we can simply call to `useFakeTimers` with `'modern'` so
that `jest` uses `sinon/fake-timers` that allows use to mock dates. `'modern'` will become the default state
in `jest 27`.

We also have set up a called to `useRealTimers` to restore normal behavior and also call `clearReminders` to
avoid tests polluting one another.

### set system time

We can then create a test in [our test file](/Dates/jest.test.js#L13-29) that illustrates how to mock a date.
We can make calls to `jest.setSystemTime` with a constructed `Date` to set the exact time and verify that
when the date and day of week match, we get back the created reminder.
