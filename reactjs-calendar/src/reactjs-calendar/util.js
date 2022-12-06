import moment from 'moment';
import css from './Calendar.css';

export const listDateName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const buildCalendar = (value, numberWeek = 7) => {
    const startDay = value.clone().startOf("month").startOf('isoWeek');
    const endDay = value.clone().endOf("month").endOf('isoWeek');
    const day = startDay.clone().subtract(1, 'day');
    const curCalendar = [];
    while(day.isBefore(endDay, 'day')) {
        curCalendar.push(
            Array(7).fill(0).map(()=> day.add(1, 'day').clone())
        )
    }

    let weeksOfMonth = startDay.isoWeek() === 52 || startDay.isoWeek() === 53 ? 
        endDay.isoWeek() + 1 : 
        (
            endDay.isoWeek() === 1 ?
            53 - startDay.isoWeek() + 1 :
            endDay.isoWeek() - startDay.isoWeek() + 1
        );

    while(weeksOfMonth < numberWeek){
        curCalendar.push(Array(7).fill(0).map(()=> day.add(1, 'day').clone()));
        weeksOfMonth++;
    }
    return curCalendar;
}

export const isSameDay = (day, value) => moment(value).isSame(day, 'day');

export const isSelected = (day, value) => {
    return isSameDay(day, value);
}

export const beforeToday = (day) => {
    return moment(day).isBefore(new Date(), "day");
}

export const isToday = (day) => {
    return moment(new Date()).isSame(day, "day");
}

export const isCurrentMonth = (day, value) => {
    return moment(day).isSame(value, 'month');
}

export const isLastWeekOfMonth = (day) => {
    const endDay = day.clone().endOf("month");
    switch (endDay.date() - day.date()) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            return true;
        default:
            return false;
    }
}

export const isFirstWeekOfMonth = (day) => {
    switch (day.date()) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            return true;
        default:
            return false;
    }
}

export const isMonday = (day) => {
    return day.clone().isoWeekday() === 1;
}

export const isSunday = (day) => {
    return day.clone().isoWeekday() === 7;
}

export const isFirstMonday = (day) => {
    let date = day.clone().year('y').month('m').date(1).isoWeekday(8);
    if (date.date() > 7) { date.day(-6); }
    return date.date() === day.date();
}

export const isLastSunday = (day) => {
    let date = day.clone().endOf('month');
    const lastSunday = date.clone().isoWeekday() === 7 ? date : date.clone().startOf('isoWeek').subtract(1, 'day');
    return lastSunday.date() === day.date();
}

export const dayStyles = (day, curDay, isDayBlocked, curChoose = null, selectDate = null) => {
    const endMonth = day.clone().endOf("month").date();
    const classNames = [];
    isDayBlocked(day) && classNames.push("disable")
    if (beforeToday(day)) { classNames.push("before")};
    if (isToday(day)) { classNames.push("today")};
    if (isSameDay(day, curChoose)) {
        classNames.push("choosen")
    }
    if (selectDate && selectDate.some(item => isSelected(day, item))) { 
        classNames.push("selected");
    };

    if(isCurrentMonth(day, curDay)) {
        isLastWeekOfMonth(day) && classNames.push('border-bottom');
        isFirstWeekOfMonth(day) && classNames.push('border-top');
        isMonday(day) && classNames.push('border-left');
        isSunday(day) && classNames.push('border-right');

        day.clone().date() === 1 && classNames.push('border-left') && classNames.push('border-top-left-radius');
        day.clone().date() === endMonth && classNames.push('border-right') && classNames.push('border-bottom-right-radius');
        day.clone().startOf('month').endOf('isoWeek').date() === day.clone().date() && classNames.push('border-top-right-radius');  
        day.clone().endOf('month').startOf('isoWeek').date() === day.clone().date() && classNames.push('border-bottom-left-radius');      
        isFirstMonday(day) && classNames.push('border-top-left-radius');
        isLastSunday(day) && classNames.push('border-bottom-right-radius');
    }
    return classNames.join(" ");
}

export const currMonthname = (date) => {
    return date.format("MMMM");
}

export const currYear = (date) => {
    return date.format('YYYY');
}

export const prevMonth = (date) => {
    return date.clone().subtract(1, 'month');
}

export const nextMonth = (date) => {
    return date.clone().add(1, 'month');
}

export const thisMonth = (date) => {
    return date.isSame(new Date(), 'month');
}

export const mergeClass = (theme) => {
    return {
        ...css,
        calendar: theme.calendar || css.calendar
    }
}