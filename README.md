# JavaScript TDD 201

The goal of this course is to dive deeper into the particulars of testing in JavaScript. This course
was created with and is intended to be consumed with [learnit](https://www.npmjs.com/package/learnit).
Once you've installed with `npm i -g learnit`, you can download the course with `learnit download <git-url>`.

If you do not want to use `learnit`, the basic structure of this course is that each module is represented
as a branch in git, each chapter is then a branch off of a module, and each step is a labeled commit
in the chapter branch. Each folder in the project corresponds to a module and, when on the respective
branch, has a markdown file that is effectively a script for `learnit`. If you navigate to the top
of a branch using `git checkout <module>-chapter-<chapter>`, you should be able to view the full
script of that chapter, which will contain references to the relevant files.

If you are using `learnit`, the recommended setup is to use 3 terminal windows or tabs, one for the
instructor (`learnit start`), one for relevant code snippets (`learnit output snippets`), and one for
commands (`learnit output commands`).

Below is a breakdown of the modules and chapters included.

## General Timing (Complete)

 - Jest
 - Jasmine
 - Sinon

## Dates (Complete)

 - Jest
 - Jasmine
 - Sinon
 - MockDate

## Network Activity (Complete)

 - Mocking fetch yourself (jest)
 - Using `msw` (jest)
 - Mock WebSocket with `jest-websocket-mock` or `mock-socket`

## End to End (Complete)

 - Cypress: testing full end to end and stubbed API
 - Playwright: testing full end to end and stubbed API

## Patterns (Complete)

 - Abstraction Layer
 - Dependency Injection

## NodeJS (Future Release)

 - List of existing resources.
 - Waiting for insight into examples needed.

## React (Future Release)

 - List of existing resources.
 - Waiting for insight into examples needed.

## Angular (Future Release)

 - List of existing resources.
 - Waiting for insight into examples needed.
