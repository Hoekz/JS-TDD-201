# Network

This module focuses on testing network activity, particularly around `fetch`. While in many cases it may
seem more appropriate to mock at the service level such as when unit testing a component, a robust mocking
of the network layer can lead to more consistent tests, less code duplication, and more confidence in the
full vertical slice of a webpage.

The chapters are:
 - Mocking fetch yourself
 - Using `msw`
 - Mocking websockets

## Mocking Fetch Yourself

In this chapter, we'll take a look at how to mock `fetch` yourself. At the end of the chapter, I'll explain a few reasons
why this may or may not be a desireable approach.

There are a couple of external dependencies that will not be covered here such as `babel`, but they play very little role
in this particular chapter. It is also very likely that if you use an official starting point of a particular library like
`React` or `Angular`, much of this configuration will be handled for you and getting testing working will be a simpler
process.
