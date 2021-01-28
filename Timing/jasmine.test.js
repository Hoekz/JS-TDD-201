const { changeAfterOneSecond, changeEverySecond } = require('./timing');

describe('change after one second', () => {
    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should change after one second', () => {
        const tracker = changeAfterOneSecond();
        expect(tracker.value).toBe(false);

        jasmine.clock().tick(999);
        expect(tracker.value).toBe(false);

        jasmine.clock().tick(1);
        expect(tracker.value).toBe(true);
    });

    it('should be cancellable', () => {
        const tracker = changeAfterOneSecond();
        expect(tracker.value).toBe(false);

        jasmine.clock().tick(999);
        expect(tracker.value).toBe(false);

        tracker.cancel();

        jasmine.clock().tick(1);
        expect(tracker.value).toBe(false);
    });
});

describe('change every second', () => {
    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should change after each second until cancelled', () => {
        const tracker = changeEverySecond();
        expect(tracker.value).toBe(0);

        jasmine.clock().tick(1000);
        expect(tracker.value).toBe(1);

        jasmine.clock().tick(2000);
        expect(tracker.value).toBe(3);

        tracker.cancel();

        jasmine.clock().tick(2000);
        expect(tracker.value).toBe(3);
    });
});
