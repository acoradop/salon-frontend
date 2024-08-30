import React from 'react';
import { Calendar, dayjsLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from "dayjs";


const Calendario = () => {

    const localizer = dayjsLocalizer(dayjs);
  return (
    <div style={{ height: 600 }}>
      <Calendar
      localizer={localizer}
        events={[]} 
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default Calendario;
