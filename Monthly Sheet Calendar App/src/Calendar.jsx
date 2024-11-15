import React, { useState, useEffect } from 'react';
import './App.css';

const Calendar = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [days, setDays] = useState([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newDays = [];

    for (let i = 0; i < firstDay; i++) {
      newDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      newDays.push(day);
    }

    setDays(newDays);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    setCurrentYear(parseInt(event.target.value));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <select value={currentMonth} onChange={handleMonthChange}>
          {monthNames.map((name, index) => (
            <option value={index} key={index}>{name}</option>
          ))}
        </select>
        <select value={currentYear} onChange={handleYearChange}>
          {Array.from({ length: 201 }, (_, i) => 1900 + i).map(year => (
            <option value={year} key={year}>{year}</option>
          ))}
        </select>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div className="day-name" key={day}>{day}</div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`day ${day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? 'current-day' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
