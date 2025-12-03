import { addHours, startOfHour, subHours } from "date-fns";

export interface Doctor {
  id: string;
  name: string;
  color: string;
}

export interface Patient {
  id: string;
  name: string;
}

export interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  doctorId: string;
  patientId: string;
  status: "confirmed" | "pending" | "cancelled";
}

export const MOCK_DOCTORS: Doctor[] = [
  { id: "d1", name: "Dr. Juan Pérez", color: "#0d9488" }, // teal-600
  { id: "d2", name: "Dra. Ana Gómez", color: "#0891b2" }, // cyan-600
];

export const MOCK_PATIENTS: Patient[] = [
  { id: "p1", name: "Carlos López" },
  { id: "p2", name: "María Rodríguez" },
  { id: "p3", name: "Jorge Martínez" },
];

const now = new Date();
const todayStart = startOfHour(now);

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    title: "Consulta General - Carlos López",
    start: subHours(todayStart, 2),
    end: subHours(todayStart, 1),
    doctorId: "d1",
    patientId: "p1",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Control - María Rodríguez",
    start: todayStart,
    end: addHours(todayStart, 1),
    doctorId: "d1",
    patientId: "p2",
    status: "pending",
  },
  {
    id: "3",
    title: "Urgencia - Jorge Martínez",
    start: addHours(todayStart, 2),
    end: addHours(todayStart, 3),
    doctorId: "d2",
    patientId: "p3",
    status: "confirmed",
  },
  {
    id: "4",
    title: "Consulta - Carlos López",
    start: addHours(todayStart, 4),
    end: addHours(todayStart, 5),
    doctorId: "d2",
    patientId: "p1",
    status: "confirmed",
  },
  {
    id: "5",
    title: "Seguimiento - María Rodríguez",
    start: addHours(todayStart, 24), // Mañana
    end: addHours(todayStart, 25),
    doctorId: "d1",
    patientId: "p2",
    status: "pending",
  },
];
