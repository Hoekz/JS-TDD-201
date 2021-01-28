const assert = require('assert');
const sinon = require('sinon');
const { changeAfterOneSecond, changeEverySecond } = require('./timing');

describe('change after one second', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    it('should change after one second', () => {
        const tracker = changeAfterOneSecond();
        assert.strictEqual(tracker.value, false);

        clock.tick(999);
        assert.strictEqual(tracker.value, false);

        clock.tick(1);
        assert.strictEqual(tracker.value, true);
    });

    it('should be cancellable', () => {
        const tracker = changeAfterOneSecond();
        assert.strictEqual(tracker.value, false);

        clock.tick(999);
        assert.strictEqual(tracker.value, false);

        tracker.cancel();

        clock.tick(1);
        assert.strictEqual(tracker.value, false);
    });
});
