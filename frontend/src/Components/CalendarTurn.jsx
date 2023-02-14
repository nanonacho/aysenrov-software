import { Calendar, momentLocalizer } from "react-big-calendar"
import moment, { calendarFormat } from "moment"
import "moment/locale/es"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useEffect, useState } from "react"

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

function CalendarTurn() {
    const [events, setEvents] = useState([
        {
            start: moment().toDate(),
            end: moment().add(1, "days").toDate(),
            title: "dsa",
            isAllDay: true
        }
    ])

    const [calendarHeight, setCalendarHeight] = useState(50)

    useEffect(() => {
        console.log(events)
    }, [calendarHeight])

    const onEventResize = (data) => {
        const {start, end} = data
        events[0].start = start
        events[0].end = end
        setEvents(events)
    }

    const onEventDrop = (data) => console.log(data)

    const createEvent = () => {
        const newEvents = [...events, {
            start: moment().toDate(),
            end: moment().add(1, "days").toDate(),
            title: "NUEVO",
            isAllDay: true
        }]
        setEvents(newEvents)
        setCalendarHeight(calendarHeight + 20)
    }

    const messages = {
        previous: "Atrás",
        next: "Siguiente",
        today: "Hoy",
        month: "Mes",
        day: "Día",
        week: "Semana"
    }
    
    return (
        <div className="">
            <button className="btn btn-primary m-1" onClick={createEvent}>Crear Turno</button>
            <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="month"
            events={events}
            localizer={localizer}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            messages={messages}
            resizable
            style={{ height: "150vh" }}
            />
        </div>
    )
}

export default CalendarTurn