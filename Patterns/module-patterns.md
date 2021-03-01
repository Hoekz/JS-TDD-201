# Patterns

These are common patterns for increasing testability you might consider using or run into while working in JavaScript.

## Dependency Injection

Dependency Injection is not as common a pattern as it used to be, though it is still featured very prominently in
Angular. The idea behind dependency injection is to allow any function, object, or library that a chunk of code is
dependent on to be passed in or injected, thereby allowing tests to pass in any replacements such as mocks.

This chapter will use a very simple implementation of a dependency injection engine for clarity.