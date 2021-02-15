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

## Playwright

[Playwright](https://playwright.dev/docs/intro/) is a relatively new test automation library created by Microsoft.

The main selling points are cross-browser API, multiple context or page setups, easy network interception, and ability to be
used with pretty much any test runner like `jest` or `jasmine`.

Two approaches are shown in this chapter: a full end to end approach and a stubbed network approach. Each of these approaches
have tradeoffs, but they've also been setup so that the effort to switch between the two is minimal.

### Introduction

Before diving into writing tests with Playwright, here's a bit of an overview on the app we're testing.

The app is a very simple "To-Do" website, with a basic API that allows for creation and deletion of multiple
lists as well as the creation and deletion of tasks in those lists which also have a "completed" flag for tracking.

The interface supports this with two simple columns with input fields at the top. If you are running the `learnit`
command output, the website should be available on port [5000](http://localhost:5000).

The API uses [ExpressJS](https://expressjs.com/) and [sqlite3](https://www.npmjs.com/package/sqlite3) and the frontend is simply
served with [serve](https://www.npmjs.com/package/serve) and uses only native browser APIs.

### Setup

Let's first take a look at our setup. We are using `jest` as our test runner and using a single [e2e.test.js](/EndtoEnd/playwright/e2e.test.js#L1-18) file.

Because `playwright` is independent of the test runner, we can simply `require` its APIs. In this case, we're pulling in the `chromium`
launcher. Next we see pulling in a `app-page` constructor, which we'll look more at in the next step.

In our `describe`, we setup `browser` and `page` declarations that let us `launch` chromium and then open a `newPage`. We are then
wrapping that `page` in our own Page Object and call `load` to vist our website.

To cleanup, we simply `close` the page after each test and `close` the browser when we're all done. Now, let's look at our page object.

### Page Object

If you are unfamiliar with Page Objects, you can read more about the concept [here](https://martinfowler.com/bliki/PageObject.html). In the simplest
terms, a Page Object is meant to allow you to write tests more like they are from the perspective of a user using the website and less like a
programming searching an HTML document.

You already saw the instantiation of our page object in the test file, but we can take a closer look at the implementation in
[app-page.js](/EndtoEnd/playwright/app-page.js#L6-23). Ignoring the `mockRoutes` for now, this is a very simple object, simply
wrapping the `page` that has been passed in.

We can see the basic commands that have already been used: `load` for navigating to the site and `close` for closing the page. We'll
continue by taking a look at some of our tests alongside other methods we've declared in our page object.

### First Test

Our [first test](/EndtoEnd/playwright/e2e.test.js#L20-23) asserts on the initial state of the page. We are sanity checking the
`title` of the page as well as stating that we initially expect the `listCount` to be 3. In our [page object](/EndtoEnd/playwright/app-page.js#L25-31),
we are simply using these properties as proxies to the playwright interface.

You can see that our test needs to `await` the properties, as they need to be retrieved from the browser first.

You can also note the `$$eval` call in our `listCount` getter, which allows us to evaluate a function against all matching
elements (in our case, we just want to count them). You can also use `$eval` to only match the first element.

### Second Test

Our [second test](/EndtoEnd/playwright/e2e.test.js#L25-29), we check that selecting a list displays the correct `todoCount`
of 3. This comes from selecting the last list visible, which is from our [test-data.json](/EndtoEnd/test-data.json#L1-12) that
was used to seed our database before the tests are run.

Our [page object](/EndtoEnd/playwright/app-page.js#L33-39) shows that our `todoCount` is basically what we saw with
`listCount` and our `selectList` method simply calls the `click` method with the appropriate child selector.

A [small utility](/EndtoEnd/playwright/app-page.js#L3-3)  was created to allow for searching for a negative or positive child index.
