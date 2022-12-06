import React from 'react';
import { currMonthname, currYear, thisMonth, prevMonth, nextMonth } from './util';
import PropTypes from 'prop-types';
import './Calendar.css';

const Header = props => {
    const {date, onChange} = props || {};

    return (
        <div className="headerCalendar">
            <div className="previous" onClick={() => !thisMonth(date) && onChange(prevMonth(date))}>{String.fromCharCode(171)}</div>
            <div className="current">{currMonthname(date)} {currYear(date)}</div>
            <div className="next" onClick={() => onChange(nextMonth(date))}>{String.fromCharCode(187)}</div>
        </div>
    );
};

Header.propTypes = {
    
};

export default Header;