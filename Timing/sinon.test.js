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

describe('change every second', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    it('should change after each second until cancelled', () => {
        const tracker = changeEverySecond();
        assert.strictEqual(tracker.value, 0);

        clock.tick(1000);
        assert.strictEqual(tracker.value, 1);

        clock.tick(2000);
        assert.strictEqual(tracker.value, 3);

        tracker.cancel();

        clock.tick(2000);
        assert.strictEqual(tracker.value, 3);
    });
});
