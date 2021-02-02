# Dates

This module covers working with `Date` in JavaScript. Each chapter covers a particular testing library or tool:

 - `jest` - `useFakeTimers`
 - `sinon` - `useFakeTimers`
 - `jasmine` - `clock -> mockDate`
 - `MockDate` - `set`

In some cases, it can be enough to simply mock `Date.now` as well, as many libraries use only this call before
applying custom functionality.

## MockDate

This chapter goes over using `mockdate` for mocking the `Date` object in `mocha`. MockDate is fairly lightweight and
serves the single purpose of setting the return value of `new Date`. If you feel other testing frameworks are too heavy,
`mockdate` is a reasonable package to include to avoid rolling your own implementation.

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
