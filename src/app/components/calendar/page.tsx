import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  type: string;
}

const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", type: "event" });
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents).map((event: Event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(parsedEvents);
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    }
  }, [events]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const addNewEvent = (type: string) => {
    if (selectedDate && newEvent.title) {
      const newEventItem = {
        title: newEvent.title,
        start: selectedDate,
        end: selectedDate,
        type: type,
      };
      setEvents((prev) => [...prev, newEventItem]);
      setModalOpen(false);
      setNewEvent({ title: "", type: "event" });
    }
  };

  const eventStyleGetter = (event: Event) => {
    const backgroundColor = event.type === "event" ? "#42A5F5" : "#FF4081"; // Blue for events, Pink for reminders
    return {
      style: {
        backgroundColor,
        color: "white",
      },
    };
  };

  const handlePrevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month").toDate());
  };

  return (
    <div className="flex flex-col w-full p-4 pl-[198px] pr-[98px]">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button variant="outlined" onClick={handlePrevMonth}>
          Previous
        </Button>
        <Button variant="outlined" onClick={handleNextMonth}>
          Next
        </Button>
      </div>

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={(slotInfo: SlotInfo) => handleDateClick(slotInfo.start)}
        eventPropGetter={eventStyleGetter}
        // views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        date={currentDate}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Add Event/Reminder</Typography>
          <TextField
            label="Title"
            fullWidth
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" marginY={2}>
            <Button
              variant={newEvent.type === "event" ? "contained" : "outlined"}
              onClick={() => {
                addNewEvent("event");
              }}
            >
              Add Event
            </Button>
            <Button
              variant={newEvent.type === "reminder" ? "contained" : "outlined"}
              onClick={() => {
                addNewEvent("reminder");
              }}
            >
              Add Reminder
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
