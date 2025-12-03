"use client";

import { Calendar, dateFnsLocalizer, View, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Appointment, MOCK_DOCTORS } from "@/lib/dummy-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

const locales = {
  "es": es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarBoardProps {
  events: Appointment[];
}

export function CalendarBoard({ events }: CalendarBoardProps) {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const eventStyleGetter = (event: Appointment) => {
    const doctor = MOCK_DOCTORS.find((d) => d.id === event.doctorId);
    const backgroundColor = doctor ? doctor.color : "#3174ad";
    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="h-[calc(100vh-200px)] bg-card rounded-md border p-4 shadow-sm">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        culture="es"
        eventPropGetter={eventStyleGetter}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos en este rango",
        }}
        components={{
          toolbar: (props) => (
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => props.onNavigate("TODAY")}
                  className="px-3 py-1 text-sm font-medium rounded-md border hover:bg-accent"
                >
                  Hoy
                </button>
                <button
                  onClick={() => props.onNavigate("PREV")}
                  className="px-3 py-1 text-sm font-medium rounded-md border hover:bg-accent"
                >
                  Anterior
                </button>
                <button
                  onClick={() => props.onNavigate("NEXT")}
                  className="px-3 py-1 text-sm font-medium rounded-md border hover:bg-accent"
                >
                  Siguiente
                </button>
              </div>
              <span className="text-lg font-semibold text-foreground">
                {props.label}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => props.onView("month")}
                  className={cn(
                    "px-3 py-1 text-sm font-medium rounded-md border hover:bg-accent",
                    view === "month" && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  Mes
                </button>
                <button
                  onClick={() => props.onView("week")}
                  className={cn(
                    "px-3 py-1 text-sm font-medium rounded-md border hover:bg-accent",
                    view === "week" && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  Semana
                </button>
                <button
                  onClick={() => props.onView("day")}
                  className={cn(
                    "px-3 py-1 text-sm font-medium rounded-md border hover:bg-accent",
                    view === "day" && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  Día
                </button>
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}
