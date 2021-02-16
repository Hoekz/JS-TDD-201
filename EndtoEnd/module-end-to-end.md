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
