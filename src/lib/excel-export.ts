import * as XLSX from "xlsx";

// Tipos para exportación
export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
}

// Exportar datos genéricos a Excel
export function exportToExcel<T extends Record<string, unknown>>(
  data: T[],
  columns: ExportColumn[],
  fileName: string
): void {
  // Crear headers
  const headers = columns.map((col) => col.header);
  
  // Mapear datos según las columnas
  const rows = data.map((item) =>
    columns.map((col) => item[col.key] ?? "")
  );
  
  // Crear worksheet
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  
  // Configurar anchos de columna
  ws["!cols"] = columns.map((col) => ({ wch: col.width || 15 }));
  
  // Crear workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Datos");
  
  // Descargar archivo
  XLSX.writeFile(wb, `${fileName}_${new Date().toISOString().split("T")[0]}.xlsx`);
}

// Exportar pacientes
export function exportPatients(patients: Record<string, unknown>[]): void {
  const columns: ExportColumn[] = [
    { header: "ID", key: "id", width: 10 },
    { header: "Nombre", key: "firstName", width: 15 },
    { header: "Apellido", key: "lastName", width: 15 },
    { header: "DNI", key: "dni", width: 12 },
    { header: "Fecha Nacimiento", key: "birthDate", width: 15 },
    { header: "Email", key: "email", width: 25 },
    { header: "Teléfono", key: "phone", width: 15 },
    { header: "Obra Social", key: "insuranceProvider", width: 20 },
    { header: "Última Visita", key: "lastVisit", width: 15 },
  ];
  
  exportToExcel(patients, columns, "Pacientes");
}

// Exportar turnos
export function exportAppointments(appointments: Record<string, unknown>[]): void {
  const columns: ExportColumn[] = [
    { header: "ID", key: "id", width: 10 },
    { header: "Paciente", key: "title", width: 25 },
    { header: "Fecha Inicio", key: "start", width: 18 },
    { header: "Fecha Fin", key: "end", width: 18 },
    { header: "Sala", key: "resourceId", width: 15 },
    { header: "Estado", key: "status", width: 15 },
    { header: "Motivo", key: "reason", width: 30 },
  ];
  
  exportToExcel(appointments, columns, "Turnos");
}

// Exportar facturación
export function exportInvoices(invoices: Record<string, unknown>[]): void {
  const columns: ExportColumn[] = [
    { header: "N° Factura", key: "id", width: 15 },
    { header: "Paciente", key: "paciente", width: 25 },
    { header: "Fecha", key: "fecha", width: 12 },
    { header: "Tipo", key: "tipo", width: 8 },
    { header: "Monto", key: "monto", width: 12 },
    { header: "Estado", key: "estado", width: 12 },
    { header: "Método Pago", key: "metodoPago", width: 15 },
    { header: "Obra Social", key: "obraSocial", width: 20 },
  ];
  
  exportToExcel(invoices, columns, "Facturacion");
}

// Exportar reportes
export function exportReport(
  data: Record<string, unknown>[],
  columns: ExportColumn[],
  reportName: string
): void {
  exportToExcel(data, columns, `Reporte_${reportName}`);
}

// Exportar múltiples hojas
export function exportMultiSheet(
  sheets: { name: string; data: Record<string, unknown>[]; columns: ExportColumn[] }[],
  fileName: string
): void {
  const wb = XLSX.utils.book_new();
  
  sheets.forEach((sheet) => {
    const headers = sheet.columns.map((col) => col.header);
    const rows = sheet.data.map((item) =>
      sheet.columns.map((col) => item[col.key] ?? "")
    );
    
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws["!cols"] = sheet.columns.map((col) => ({ wch: col.width || 15 }));
    
    XLSX.utils.book_append_sheet(wb, ws, sheet.name);
  });
  
  XLSX.writeFile(wb, `${fileName}_${new Date().toISOString().split("T")[0]}.xlsx`);
}
