let reminders = [];

const day = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
};

function sortableDateString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();

    return [year, month, day].join('-');
}

module.exports = {
    addDailyReminder({ label, start, end, days }) {
        reminders.push({ label, start, end, days });
    },
    getDailyReminders() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const date = sortableDateString(today);

        return reminders.filter((reminder) => 
            reminder.days.includes(dayOfWeek) &&
            reminder.start <= date &&
            reminder.end >= date
        ).map((reminder) => reminder.label);
    },
    clearReminders() {
        reminders = [];
    },
    day,
};
