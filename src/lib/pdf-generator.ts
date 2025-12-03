import jsPDF from "jspdf";

// Interfaz para datos de receta
export interface PrescriptionData {
  patientName: string;
  patientDNI: string;
  patientAge: number;
  date: Date;
  doctorName: string;
  doctorLicense: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }[];
  diagnosis?: string;
  notes?: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
}

// Interfaz para orden de estudios
export interface StudyOrderData {
  patientName: string;
  patientDNI: string;
  patientAge: number;
  patientInsurance?: string;
  date: Date;
  doctorName: string;
  doctorLicense: string;
  studies: string[];
  diagnosis?: string;
  urgency?: "normal" | "urgente";
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
}

// Interfaz para certificado médico
export interface MedicalCertificateData {
  patientName: string;
  patientDNI: string;
  date: Date;
  doctorName: string;
  doctorLicense: string;
  reason: string;
  daysOff: number;
  fromDate: Date;
  toDate: Date;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
}

// Función para generar receta médica
export function generatePrescription(data: PrescriptionData): void {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(data.clinicName, 105, 20, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(data.clinicAddress, 105, 27, { align: "center" });
  doc.text(`Tel: ${data.clinicPhone}`, 105, 32, { align: "center" });
  
  // Línea separadora
  doc.setDrawColor(0, 0, 0);
  doc.line(20, 38, 190, 38);
  
  // Título
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("RECETA MÉDICA", 105, 48, { align: "center" });
  
  // Información del médico
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Médico:", 20, 60);
  doc.setFont("helvetica", "normal");
  doc.text(data.doctorName, 45, 60);
  doc.text(`Matrícula: ${data.doctorLicense}`, 20, 67);
  
  // Fecha
  doc.text(`Fecha: ${data.date.toLocaleDateString("es-AR")}`, 150, 60);
  
  // Información del paciente
  doc.setFont("helvetica", "bold");
  doc.text("Paciente:", 20, 80);
  doc.setFont("helvetica", "normal");
  doc.text(data.patientName, 45, 80);
  doc.text(`DNI: ${data.patientDNI}`, 20, 87);
  doc.text(`Edad: ${data.patientAge} años`, 80, 87);
  
  // Diagnóstico (si existe)
  if (data.diagnosis) {
    doc.setFont("helvetica", "bold");
    doc.text("Diagnóstico:", 20, 100);
    doc.setFont("helvetica", "normal");
    doc.text(data.diagnosis, 20, 107, { maxWidth: 170 });
  }
  
  // Medicamentos
  doc.setFont("helvetica", "bold");
  doc.text("Rp/", 20, data.diagnosis ? 120 : 100);
  
  let yPosition = data.diagnosis ? 130 : 110;
  doc.setFont("helvetica", "normal");
  
  data.medications.forEach((med, index) => {
    // Nombre y dosis
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${med.name}`, 25, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`   Dosis: ${med.dosage}`, 25, yPosition + 7);
    doc.text(`   Frecuencia: ${med.frequency}`, 25, yPosition + 14);
    doc.text(`   Duración: ${med.duration}`, 25, yPosition + 21);
    
    if (med.instructions) {
      doc.setFontSize(9);
      doc.text(`   ${med.instructions}`, 25, yPosition + 28, { maxWidth: 165 });
      doc.setFontSize(11);
      yPosition += 40;
    } else {
      yPosition += 33;
    }
  });
  
  // Notas adicionales
  if (data.notes) {
    doc.setFont("helvetica", "bold");
    doc.text("Observaciones:", 20, yPosition + 5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(data.notes, 20, yPosition + 12, { maxWidth: 170 });
  }
  
  // Firma (espacio para firma física)
  doc.setFontSize(11);
  doc.line(130, 270, 190, 270);
  doc.text("Firma y Sello del Médico", 140, 277);
  
  // Descargar PDF
  doc.save(`Receta_${data.patientName.replace(/\s/g, "_")}_${data.date.toISOString().split("T")[0]}.pdf`);
}

// Función para generar orden de estudios
export function generateStudyOrder(data: StudyOrderData): void {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(data.clinicName, 105, 20, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(data.clinicAddress, 105, 27, { align: "center" });
  doc.text(`Tel: ${data.clinicPhone}`, 105, 32, { align: "center" });
  
  // Línea separadora
  doc.line(20, 38, 190, 38);
  
  // Título
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ORDEN DE ESTUDIOS", 105, 48, { align: "center" });
  
  if (data.urgency === "urgente") {
    doc.setTextColor(255, 0, 0);
    doc.text("URGENTE", 105, 56, { align: "center" });
    doc.setTextColor(0, 0, 0);
  }
  
  // Información del médico
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Médico:", 20, 70);
  doc.setFont("helvetica", "normal");
  doc.text(data.doctorName, 45, 70);
  doc.text(`Matrícula: ${data.doctorLicense}`, 20, 77);
  
  // Fecha
  doc.text(`Fecha: ${data.date.toLocaleDateString("es-AR")}`, 150, 70);
  
  // Información del paciente
  doc.setFont("helvetica", "bold");
  doc.text("Paciente:", 20, 90);
  doc.setFont("helvetica", "normal");
  doc.text(data.patientName, 45, 90);
  doc.text(`DNI: ${data.patientDNI}`, 20, 97);
  doc.text(`Edad: ${data.patientAge} años`, 80, 97);
  
  if (data.patientInsurance) {
    doc.text(`Obra Social: ${data.patientInsurance}`, 20, 104);
  }
  
  // Diagnóstico presuntivo
  if (data.diagnosis) {
    doc.setFont("helvetica", "bold");
    doc.text("Diagnóstico Presuntivo:", 20, 117);
    doc.setFont("helvetica", "normal");
    doc.text(data.diagnosis, 20, 124, { maxWidth: 170 });
  }
  
  // Estudios solicitados
  doc.setFont("helvetica", "bold");
  doc.text("ESTUDIOS SOLICITADOS:", 20, data.diagnosis ? 140 : 120);
  
  let yPosition = data.diagnosis ? 150 : 130;
  doc.setFont("helvetica", "normal");
  
  data.studies.forEach((study, index) => {
    doc.text(`${index + 1}. ${study}`, 25, yPosition);
    yPosition += 10;
  });
  
  // Nota importante
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("IMPORTANTE: El paciente debe presentarse en ayunas de 12 horas para análisis de sangre.", 20, yPosition + 20, { maxWidth: 170 });
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  
  // Firma
  doc.line(130, 270, 190, 270);
  doc.text("Firma y Sello del Médico", 140, 277);
  
  doc.save(`Orden_Estudios_${data.patientName.replace(/\s/g, "_")}_${data.date.toISOString().split("T")[0]}.pdf`);
}

// Función para generar certificado médico
export function generateMedicalCertificate(data: MedicalCertificateData): void {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(data.clinicName, 105, 20, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(data.clinicAddress, 105, 27, { align: "center" });
  doc.text(`Tel: ${data.clinicPhone}`, 105, 32, { align: "center" });
  
  // Línea separadora
  doc.line(20, 38, 190, 38);
  
  // Título
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO MÉDICO", 105, 55, { align: "center" });
  
  // Información del médico
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`El/La que suscribe, ${data.doctorName}, Matrícula N° ${data.doctorLicense}`, 20, 75, { maxWidth: 170 });
  
  // Cuerpo del certificado
  doc.setFontSize(12);
  doc.text("CERTIFICA:", 20, 95);
  
  doc.setFontSize(11);
  const certificateText = `Que el/la Sr./Sra. ${data.patientName}, DNI N° ${data.patientDNI}, ha sido examinado/a en la fecha indicada, y se le indica reposo médico por un período de ${data.daysOff} día${data.daysOff > 1 ? "s" : ""}, desde el ${data.fromDate.toLocaleDateString("es-AR")} hasta el ${data.toDate.toLocaleDateString("es-AR")}, inclusive, debido a ${data.reason}.`;
  
  doc.text(certificateText, 20, 110, { maxWidth: 170, align: "justify" });
  
  // Fecha y lugar
  doc.text(`Buenos Aires, ${data.date.toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}`, 20, 170);
  
  // Firma
  doc.line(130, 220, 190, 220);
  doc.text(data.doctorName, 145, 227, { align: "center" });
  doc.text(`Mat. ${data.doctorLicense}`, 145, 234, { align: "center" });
  doc.text("Firma y Sello del Médico", 145, 241, { align: "center" });
  
  doc.save(`Certificado_${data.patientName.replace(/\s/g, "_")}_${data.date.toISOString().split("T")[0]}.pdf`);
}
