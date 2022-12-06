import React from 'react';
import {listDateName, dayStyles, beforeToday} from './util';
import './Calendar.css';

const DatePicker = (props) => {
    const {
        dateCalendar,
        onChange, 
        value,
        onChangeSelect,
        selectDate,
        limitSelect,
        curChoose,
        setCurChoose,
        numberWeek,
        curDay,
        isDayBlocked
    } = props || {};

    const handleSelectDate = (day) => {
        // xử lý sau
        setCurChoose(day);
        // onChangeSelect([...selectDate , day])
    }

    return (
        <div className="date-picker">
            <div className="dayNames">
                {
                    listDateName.map((dayName, index) => <div key={index} className="itemName">{dayName}</div>)
                }
            </div>
            <div className="listDates">
                {
                    dateCalendar.map((week, index) => <div key={index} className="week">
                        {week.map((day, index) => 
                            <div key={index}
                                className="day"
                                onClick={()=> (!beforeToday(day) || !isDayBlocked(day)) && handleSelectDate(day)}
                            >
                                <div className={dayStyles(day, curDay, isDayBlocked, curChoose, selectDate)}>{day.format('D').toString()}</div>
                        </div>)}
                    </div>)
                }
            </div>
        </div>
    );
};

export default DatePicker;