// Types for the medical system

// Re-export subscription types
export * from "./subscription";

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lastVisit: string;
  dni: string;
  birthDate: string;
  bloodType: string;
  allergies: string[];
  medicalBackground: string;
  insuranceProvider?: string; // Obra Social / Prepaga
  insuranceNumber?: string; // Número de afiliado
  tags?: PatientTag[]; // Etiquetas
  weight?: number; // kg
  height?: number; // cm
  absenteeCount?: number; // Contador de inasistencias
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  date: string;
  type: "Consulta" | "Estudio" | "Urgencia" | "Control";
  doctor: string;
  diagnosis?: string;
  diagnosisCode?: string; // CIE-10 code
  notes: string;
  prescriptions?: Prescription[];
  attachments: string[];
  weight?: number;
  height?: number;
  bloodPressure?: string; // "120/80"
  temperature?: number;
}

export interface Prescription {
  id: number;
  recordId: number;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface CIE10Code {
  code: string;
  description: string;
  category: string;
}

export interface TextSnippet {
  trigger: string; // e.g., "/gripe"
  label: string;
  content: string;
}

export type PatientTag = "VIP" | "Deudor" | "Crónico" | "Complejo" | "Nuevo";

export interface InsuranceProvider {
  id: number;
  name: string;
  type: "Obra Social" | "Prepaga" | "Particular";
}
