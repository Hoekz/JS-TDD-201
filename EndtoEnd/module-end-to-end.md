# End to End

This module focuses on writing end to end tests with both `Cypress` and `Playwright`. There are 2 approaches considered
for each: full end to end and with a stubbed API.

With full end to end tests, you get the benefit of ensuring the full technology stack is working together properly. This
can come with a couple of downsides such as tests taking longer to run, needing more work to keep tests independent of
one another, and more work going into making tests work in environments like a build pipeline. It also may not be
feasible if work between the backend and frontend is split in such a way as to make it impractical (disproportionate
work between the two teams) or impossible (no access to the backend code).

With a stubbed API, you get the benefit of faster tests, greater control over the data used, and easier triggering of
sad paths such as returning a `500` status code. The downside is that you haven't created truly end to end tests and
instead have only tested that the website matches your understanding of the API, not the actual API which could lead
to both the stubs and the website being designed incorrectly.

Each team's situation is going to be different and the decision of where to draw the line needs to be made as a team
for the best chance at your end to end tests giving you confidence in app.

## Cypress

[Cypress](https://www.cypress.io/) is one of the most common frameworks for writing end to end and integration tests.

The main selling points are cross-browser API (with Firefox and Edge gaining support at the start of 2020), an all-in-one
development experience, easy network interception, and a robust debugging experience that includes time-traveling, videos,
and screenshots.

Two approaches are shown in the chapter: a full end to end approach and a stubbed network approach. Each of these approaches
have tradeoffs, but they've also been setup so that the effort to switch between the two is minimal.

### Introduction

Before diving into writing tests with Cypress, here's a bit of an overview on the app we're testing.

The app is a very simple "ToDO" website, with a basic API that allows for creation and deletion of multiple
lists as well as the creation and deletion of tasks in those lists which also have a "completed" flag for tracking.

The interface supports this with two simple columns with input fields at the top. If you are running the `learnit`
command output, the website should be available on port [5000](http://localhost:5000).

The API uses [ExpressJS](https://expressjs.com/) and [sqlite3](https://www.npmjs.com/package/sqlite3) and the frontend is simply
served with [serve](https://www.npmjs.com/package/serve) and uses only native browser APIs.

### Setup

Let's first take a look at our setup. Cypress comes with its own test runner built in and exposes a couple
global objects such as `cy` and `Cypress`. We're using it to run a single test file, [e2e-spec.js](/EndtoEnd/cypress/integration/e2e-spec.js#L1-13).

Cypress tends to be fairly opinionated on things, which is why the file is located in `/cypress/integration`, even
though we're going to be calling the CLI with only this file explicitly.

We're including a `app-page` constructor, which we'll look at the internals of in the next step. For now, we can see we
can use the familar `describe` and `beforeEach` functions to setup our test, creating a new `page` which we simply
`load` before each test.

### Page Object

If you are unfamiliar with Page Objects, you can read more about the concept [here](https://martinfowler.com/bliki/PageObject.html). In the simplest
terms, a Page Object is meant to allow you to write tests more like they are from the perspective of a user using the website and less like a
program searching an HTML document.

Our [app-page.js](/EndtoEnd/cypress/app-page.js#L6-15) where our page object class lives shows us that we don't even define a constructor. Mainly,
because we don't have any internal state to manage. Because of the globally available `cy`, we can simply use our page object as a proxy to
certain calls, like our `load` function calling `visit`.

In this case, we only have to pass `'/'`, because Cypress gets a [cypress.json](/EndtoEnd/cypress.json#L1-4) config with a `baseUrl` already for convenience.

Its worth noting that Cypress actually advises to [stop using page objects](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)
and use "App Actions" -- basically exposing an API in the browser for direct manipulation of the app state. Read the article for more details
on their arguments and be mindful of what constitutes a valuable test for your particular use case.

### First Test

Our [first test](/EndtoEnd/cypress/integration/e2e-spec.js#L15-18) asserts on the initial state of the page.
We are sanity checking the `title` of the page as well as stating that we initially expect the number of `lists` to
be 3. In our [page object](/EndtoEnd/cypress/app-page.js#L17-23) we are simply using these properties as
proxies to the Cypress interface.

You'll notice these assertions are not wrapped in an `expect` or `assert`, but rather are using Cypress's built-in
`should` utility that will automatically rerun the retrieving and testing of the data we are asserting against until
either the assertion times out or the data matches.

This feature helps avoid flaky test behavior while still providing an easy to read syntax.

### Second Test

Our [second test](/EndtoEnd/cypress/integration/e2e-spec.js#L20-24), we check that selecting a list displays the correct
number of `todos`, which is 3. This comes from selecting the last list visible, which is from our [test-data.json](/EndtoEnd/test-data.json#L1-12)
that has been used to seed our database before the tests are run.

Our [page object](/EndtoEnd/cypress/app-page.js#L25-31) shows that in order to select the list, we `get` the element with `cy` and then
simply call to `click` it. This is using a [small utility](/EndtoEnd/cypress/app-page.js#L3-3) that allows for searching for a
negative or positive child index.

### Last Test

Our [last test](/EndtoEnd/cypress/integration/e2e-spec.js#L26-51) has been set up a bit differently. Because we
want this test to be able to execute independently from any other test, we've set up a `beforeEach` to `selectList`
and `addTodo` as well as an `afterEach` to `deleteTodo` and assert that the original `todoCount` has been
returned to. This is so that if one of the assertions in the test body fails, we still end up cleaning up the
created todo.

The actual body of the test asserts that the number of `todos` has increased by one and that the `todo` that
was created contains the right details and is flagged as an `active` task via a class.
### Rest of Page Object

In our [page object](/EndtoEnd/cypress/app-page.js#L33-44) we can see each of the methods we were just using to
write out test. The `addTodo` uses the `type` method to type into the details field and then we `click` the add
button. Because of Cypress's internal action queue, we don't have to wait for the first action to complete because
Cypress does that for us.

To get a particular todo, we simply use `get` call for the particular `.item` of interest and assert on the element.

Deleting a todo will simply `click` the `.delete` button and Cypress will rerun any following assertions while
it waits for that network activity to complete and the app to resume removing the element.

### Route Interception

Our [tests](/EndtoEnd/cypress/integration/e2e-spec.js#L7-13) are setup to pull in a Cypress `env` variable that indicates
when to use mocks for the API. Our [page object](/EndtoEnd/cypress/app-page.js#L7-11) loops through our set of handlers
and attaches them using the `intercept` method.

These `mockedRoutes` come from another file that is simply a dictionary of `urlString -> function` and then a `urlToRegex`
method is used to ensure the base url can be ignored and the standard `/thing/:id` syntax can be used for matching.

### Mock Route Internals

The actual [mocked-routes.js](/EndtoEnd/cypress/mocked-routes.js#L4-8) maps a url to a function that takes a
single `req` or request parameter. We can check the `method` property to make sure that matches our
expectation and `reply` with the same test data used to seed the database. Cypress will automatically
change our JSON into a proper response body and headers.

Looking at a more [complex route](/EndtoEnd/cypress/mocked-routes.js#L15-27) for creating a new task, we
can also access the `url` property in order to extract information from it, in this case, a `listId`.
We also extract the posted JSON data using the `body` property, which has been already parsed for us.
