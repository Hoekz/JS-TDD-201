const schedule = require('./reminders');

describe('get daily reminders', () => {
    beforeEach(() => {
        jest.useFakeTimers('modern');
    });

    afterEach(() => {
        jest.useRealTimers();
        schedule.clearReminders();
    });

    it('should return a reminder set for a Monday', () => {
        schedule.addDailyReminder({
            label: 'test',
            start: '2021-02-01',
            end: '2021-02-01',
            days: [schedule.day.monday],
        });

        jest.setSystemTime(new Date('2021-01-25T12:00:00.000Z')); // Previous Monday
        expect(schedule.getDailyReminders()).toEqual([]);

        jest.setSystemTime(new Date('2021-02-01T12:00:00.000Z')); // Monday
        expect(schedule.getDailyReminders()).toEqual(['test']);

        jest.setSystemTime(new Date('2021-02-08T12:00:00.000Z')); // Next Monday
        expect(schedule.getDailyReminders()).toEqual([]);
    });

    it('should return a reminder set for a weekend', () => {
        schedule.addDailyReminder({
            label: 'test',
            start: '2021-02-01',
            end: '2021-02-10',
            days: [schedule.day.saturday, schedule.day.sunday],
        });

        jest.setSystemTime(new Date('2021-02-05T12:00:00.000Z')); // Friday
        expect(schedule.getDailyReminders()).toEqual([]);

        jest.setSystemTime(new Date('2021-02-06T12:00:00.000Z')); // Saturday
        expect(schedule.getDailyReminders()).toEqual(['test']);

        jest.setSystemTime(new Date('2021-02-07T12:00:00.000Z')); // Sunday
        expect(schedule.getDailyReminders()).toEqual(['test']);

        jest.setSystemTime(new Date('2021-02-08T12:00:00.000Z')); // Monday
        expect(schedule.getDailyReminders()).toEqual([]);
    });
});
