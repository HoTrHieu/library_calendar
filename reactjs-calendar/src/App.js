import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './reactjs-calendar/Calendar';
import Embed from './Embed/Embed';
import moment from 'moment';
import reactDom from 'react-dom';

function App() {
  const [selectDate, setSelectDate] = useState([]);
  console.log('show date: ', selectDate);
  return (
    <div className="App">
      <header className="App-header">
        <Calendar
          selectDate={selectDate}
          onChangeSelect={setSelectDate} 
          classCalendar="classCalendar"
          limitSelect={4}
          numberWeek={7}
          //isDayBlocked
        ></Calendar>
        {/* <Embed
        
        /> */}
      </header>
    </div>
  );
}

export default App;
