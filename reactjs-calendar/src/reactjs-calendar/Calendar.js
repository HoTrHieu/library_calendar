import React, {useState, useEffect} from 'react';
import './Calendar.css';
import {buildCalendar, mergeClass} from './util';
import Header from './Header';
import DatePicker from './DatePicker';
import classnames from 'classnames';
import moment from 'moment';

const Calendar = props => {
    const [curDay, setCurDay] = useState(moment());
    const [curChoose, setCurChoose] = useState(moment());

    const {
        selectDate,
        onChangeSelect,
        classCalendar,
        limitSelect,
        isDayBlocked,
        numberWeek
    } = props || {};
    const [dateCalendar, setDateCalendar] = useState([]);
    // const style = mergeClass(props.thame || {})
    
    useEffect(()=> {
        setDateCalendar(buildCalendar(curDay, numberWeek)); 
    }, [curDay, numberWeek]);

    return (
        <div className={classnames("default-calendar", classCalendar)}>
            <Header onChange={setCurDay} date={curDay}></Header>
            <DatePicker 
                dateCalendar={dateCalendar} 
                onChangeSelect={onChangeSelect}
                selectDate={selectDate}
                limitSelect={limitSelect}
                curChoose={curChoose}
                setCurChoose={setCurChoose}
                numberWeek={numberWeek}
                curDay={curDay}
                isDayBlocked={isDayBlocked}
            >
            </DatePicker>
        </div>
    );
};

Calendar.defaultProps = {
    isDayBlocked: () => false
}

export default Calendar;