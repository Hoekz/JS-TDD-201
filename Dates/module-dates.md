# Dates

This module covers working with `Date` in JavaScript. Each chapter covers a particular testing library or tool:

 - `jest` - `useFakeTimers`
 - `sinon` - `useFakeTimers`
 - `jasmine` - `clock -> mockDate`
 - `MockDate` - `set`

In some cases, it can be enough to simply mock `Date.now` as well, as many libraries use only this call before
applying custom functionality.

## jasmine

This chapter goes over mocking the `Date` object in `jasmine` using the `mockDate` function.

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

In our [jasmine.test.js](/Dates/jasmine.test.js#L3-11) file, we can simply call to `install` the jasmine clock,
which mocks out timing functionality in JavaScript.

We also have set up a called to `uninstall` to restore normal behavior and also call `clearReminders` to
avoid tests polluting one another.

### mock date

We can then create a test in [our test file](/Dates/jasmine.test.js#L13-29) that illustrates how to mock a date.
We can make a call to `jasmine.clock().mockDate` with a constructed `Date` to set the exact time and verify
that when the date and day of week match, we get back the created reminder.
