import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import './SessionForm.scss';

export default function SessionForm(props) {
  const [value, onChange] = useState(new Date());

  const saveSession = () => {};
  return (
    <>
      <div>
        <h2>Session start date</h2>
        <DatePicker onChange={onChange} value={value} />
      </div>
      <div>
        <h2>Session end date</h2>
        <DatePicker onChange={onChange} value={value} />
      </div>
      <button onClick={saveSession}>Save Session</button>
    </>
  );
}
