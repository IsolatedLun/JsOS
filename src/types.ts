export type Some<T> = T | null;
export type Result<T, E> = T | E;
export type Enum = Record<string | number , string | number>;

export interface SystemTime {
    day: string,
    year: string,
    weekDay: string,
    dateTime: string,
    calendarTime: string
}