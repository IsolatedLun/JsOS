import type { SystemTime } from "../types";

// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
export function createCurrentSystemDateTime(now: number): SystemTime {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        weekday: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    };

    const [weekDay, monthAndDay, yearAndTime ] = new Date(now).toLocaleDateString("en-US", options).split(',');
    return {
        weekDay,
        day: weekDay.split(' ')[1],
        year: yearAndTime.split('at')[0],
        dateTime: yearAndTime.split('at')[1],
        calendarTime: monthAndDay
    }
}