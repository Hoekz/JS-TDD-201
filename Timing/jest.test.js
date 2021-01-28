const { changeAfterOneSecond, changeEverySecond } = require('./timing');

describe('change after one second', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should change after one second', () => {
        const tracker = changeAfterOneSecond();
        expect(tracker.value).toBe(false);

        jest.advanceTimersByTime(999);
        expect(tracker.value).toBe(false);

        jest.advanceTimersByTime(1);
        expect(tracker.value).toBe(true);
    });

    it('should be cancellable', () => {
        const tracker = changeAfterOneSecond();
        expect(tracker.value).toBe(false);

        jest.advanceTimersByTime(999);
        expect(tracker.value).toBe(false);

        tracker.cancel();

        jest.advanceTimersByTime(1);
        expect(tracker.value).toBe(false);
    });
});
