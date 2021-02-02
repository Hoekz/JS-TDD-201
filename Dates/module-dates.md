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
