# End to End

This module focuses on writing end to end tests with both `Cypress` and `Playwright`. There are 2 approaches considered
for each: full end to end and with a stubbed API.

With full end to end tests, you get the benefit of ensure the full technology stack is working together properly. This
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
