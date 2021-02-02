const assert = require('assert');
const sinon = require('sinon');
const schedule = require('./reminders');

describe('get daily reminders', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
        schedule.clearReminders();
    });

    it('should return a reminder set for a Monday', () => {
        schedule.addDailyReminder({
            label: 'test',
            start: '2021-02-01',
            end: '2021-02-01',
            days: [schedule.day.monday],
        });

        clock.setSystemTime(new Date('2021-01-25T12:00:00.000Z')); // Previous Monday
        assert.deepStrictEqual(schedule.getDailyReminders(), []);

        clock.setSystemTime(new Date('2021-02-01T12:00:00.000Z')); // Monday
        assert.deepStrictEqual(schedule.getDailyReminders(), ['test']);

        clock.setSystemTime(new Date('2021-02-08T12:00:00.000Z')); // Next Monday
        assert.deepStrictEqual(schedule.getDailyReminders(), []);
    });

    it('should return a reminder set for a weekend', () => {
        schedule.addDailyReminder({
            label: 'test',
            start: '2021-02-01',
            end: '2021-02-10',
            days: [schedule.day.saturday, schedule.day.sunday],
        });

        clock.setSystemTime(new Date('2021-02-05T12:00:00.000Z')); // Friday
        assert.deepStrictEqual(schedule.getDailyReminders(), []);

        clock.setSystemTime(new Date('2021-02-06T12:00:00.000Z')); // Saturday
        assert.deepStrictEqual(schedule.getDailyReminders(), ['test']);

        clock.setSystemTime(new Date('2021-02-07T12:00:00.000Z')); // Sunday
        assert.deepStrictEqual(schedule.getDailyReminders(), ['test']);

        clock.setSystemTime(new Date('2021-02-08T12:00:00.000Z')); // Monday
        assert.deepStrictEqual(schedule.getDailyReminders(), []);
    });
});
