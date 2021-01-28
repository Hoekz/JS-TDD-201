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

describe('change every second', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should change after each second until cancelled', () => {
        const tracker = changeEverySecond();
        expect(tracker.value).toBe(0);

        jest.advanceTimersByTime(1000);
        expect(tracker.value).toBe(1);

        jest.advanceTimersByTime(2000);
        expect(tracker.value).toBe(3);

        tracker.cancel();

        jest.advanceTimersByTime(2000);
        expect(tracker.value).toBe(3);
    });
});
