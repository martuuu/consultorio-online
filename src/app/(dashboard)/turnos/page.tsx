"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Calendar, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  Download,
  Check,
  X,
  Clock,
  Phone,
  Mail,
  FileText,
  Edit,
  Send,
  Loader2,
  MessageSquare
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import appointmentsData from "@/lib/data/appointments.json";
import roomsData from "@/lib/data/room.json";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { exportToExcel } from "@/lib/excel-export";

interface Appointment {
  id: number;
  title: string;
  start: string;
  end: string;
  resourceId: number;
  patientId: number;
  status: string;
  reason?: string;
  notes?: string;
}

export default function TurnosDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData as Appointment[]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para reprogramar
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(undefined);
  const [rescheduleTime, setRescheduleTime] = useState("");
  
  // Estados para recordatorio
  const [reminderChannel, setReminderChannel] = useState("whatsapp");
  
  // Estados para notas
  const [quickNote, setQuickNote] = useState("");
  
  const itemsPerPage = 8;

  // Filtrar y buscar
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesSearch = apt.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  // Paginación
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setIsDialogOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedAppointments.map(apt => apt.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleDeleteSelected = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAppointments(prev => prev.filter(apt => !selectedIds.includes(apt.id)));
      setSelectedIds([]);
      setIsLoading(false);
      toast.success(`${selectedIds.length} turno(s) eliminado(s) correctamente`);
    }, 800);
  };

  // Confirmar turno
  const handleConfirmAppointment = () => {
    if (!selectedAppointment) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setAppointments(prev => prev.map(apt =>
        apt.id === selectedAppointment.id ? { ...apt, status: "confirmed" } : apt
      ));
      setSelectedAppointment(prev => prev ? { ...prev, status: "confirmed" } : null);
      setIsLoading(false);
      toast.success("Turno confirmado correctamente");
    }, 800);
  };

  // Cancelar turno
  const handleCancelAppointment = () => {
    if (!selectedAppointment) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setAppointments(prev => prev.map(apt =>
        apt.id === selectedAppointment.id ? { ...apt, status: "cancelled" } : apt
      ));
      setIsLoading(false);
      setIsCancelDialogOpen(false);
      setIsDialogOpen(false);
      toast.success("Turno cancelado correctamente");
    }, 800);
  };

  // Reprogramar turno
  const handleReschedule = () => {
    if (!selectedAppointment || !rescheduleDate || !rescheduleTime) {
      toast.error("Selecciona fecha y hora para reprogramar");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const [hours, minutes] = rescheduleTime.split(":");
      const newStart = new Date(rescheduleDate);
      newStart.setHours(parseInt(hours), parseInt(minutes), 0);
      
      const newEnd = new Date(newStart);
      newEnd.setMinutes(newEnd.getMinutes() + 30);

      setAppointments(prev => prev.map(apt =>
        apt.id === selectedAppointment.id 
          ? { ...apt, start: newStart.toISOString(), end: newEnd.toISOString(), status: "pending" } 
          : apt
      ));
      
      setIsLoading(false);
      setIsRescheduleDialogOpen(false);
      setIsDialogOpen(false);
      setRescheduleDate(undefined);
      setRescheduleTime("");
      toast.success(`Turno reprogramado para ${format(newStart, "dd/MM/yyyy 'a las' HH:mm", { locale: es })}`);
    }, 1000);
  };

  // Enviar recordatorio
  const handleSendReminder = () => {
    if (!selectedAppointment) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsReminderDialogOpen(false);
      const channelName = reminderChannel === "whatsapp" ? "WhatsApp" : reminderChannel === "sms" ? "SMS" : "Email";
      toast.success(`Recordatorio enviado por ${channelName} correctamente`);
    }, 1200);
  };

  // Marcar como completado
  const handleMarkAsCompleted = () => {
    if (!selectedAppointment) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setAppointments(prev => prev.map(apt =>
        apt.id === selectedAppointment.id ? { ...apt, status: "completed" } : apt
      ));
      setIsLoading(false);
      setIsDialogOpen(false);
      toast.success("Turno marcado como completado");
    }, 800);
  };

  // Marcar como ausente
  const handleMarkAsAbsent = () => {
    if (!selectedAppointment) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setAppointments(prev => prev.map(apt =>
        apt.id === selectedAppointment.id ? { ...apt, status: "absent" } : apt
      ));
      setIsLoading(false);
      setIsDialogOpen(false);
      toast.success("Paciente marcado como ausente");
    }, 800);
  };

  // Guardar nota rápida
  const handleSaveQuickNote = () => {
    if (!selectedAppointment || !quickNote.trim()) {
      toast.error("Escribe una nota antes de guardar");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setAppointments(prev => prev.map(apt =>
        apt.id === selectedAppointment.id 
          ? { ...apt, notes: (apt.notes || "") + "\n" + quickNote } 
          : apt
      ));
      setIsLoading(false);
      setIsNotesDialogOpen(false);
      setQuickNote("");
      toast.success("Nota guardada correctamente");
    }, 600);
  };

  // Exportar turnos
  const handleExport = () => {
    const columns = [
      { header: "Fecha", key: "date" },
      { header: "Hora", key: "time" },
      { header: "Paciente", key: "patient" },
      { header: "Sala", key: "room" },
      { header: "Motivo", key: "reason" },
      { header: "Estado", key: "status" },
    ];

    const data = filteredAppointments.map(apt => ({
      date: format(new Date(apt.start), "dd/MM/yyyy"),
      time: format(new Date(apt.start), "HH:mm"),
      patient: apt.title.split(" - ")[1] || "Paciente",
      room: getRoomName(apt.resourceId),
      reason: apt.reason || "Sin especificar",
      status: apt.status === "confirmed" ? "Confirmado" : apt.status === "pending" ? "Pendiente" : apt.status === "cancelled" ? "Cancelado" : apt.status,
    }));

    exportToExcel(data, columns, "turnos_" + format(new Date(), "ddMMyyyy"));
    toast.success("Turnos exportados a Excel correctamente");
  };

  // Llamar al paciente
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
    toast.info("Iniciando llamada...");
  };

  const getRoomName = (resourceId: number) => {
    const room = roomsData.find(r => r.id === resourceId);
    return room?.name || "Consultorio desconocido";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'confirmado':
        return <Badge variant="default" className="bg-green-600 text-white">Confirmado</Badge>;
      case 'pending':
      case 'pendiente':
        return <Badge variant="secondary" className="bg-amber-500 text-white">Pendiente</Badge>;
      case 'cancelled':
      case 'cancelado':
        return <Badge className="bg-[#CD5C5C] text-[#FFF8DC] hover:bg-[#B84B4B]">Cancelado</Badge>;
      case 'completed':
      case 'completado':
      case 'atendido':
        return <Badge variant="default" className="bg-blue-600 text-white">Completado</Badge>;
      case 'absent':
      case 'ausente':
        return <Badge className="bg-[#CD5C5C] text-[#FFF8DC] hover:bg-[#B84B4B]">Ausente</Badge>;
      case 'waiting':
      case 'en-sala-de-espera':
        return <Badge className="bg-amber-500 text-white">En Sala de Espera</Badge>;
      case 'in-consultation':
      case 'en-consulta':
        return <Badge className="bg-green-600 text-white">En Consulta</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Turnos</h1>
            <p className="text-muted-foreground mt-1">
              {filteredAppointments.length} turnos totales
            </p>
          </div>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </TooltipTrigger>
              <TooltipContent>Exportar turnos a Excel</TooltipContent>
            </Tooltip>

            <Button>
              <Calendar className="mr-2 h-4 w-4" /> Ver Agenda
            </Button>
          </div>
        </div>
        
        {/* Filtros y búsqueda */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por paciente..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="absent">Ausente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedIds.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleDeleteSelected} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar ({selectedIds.length})
            </Button>
          )}
        </div>

        {/* Tabla */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedIds.length === paginatedAppointments.length && paginatedAppointments.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Sala</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No se encontraron turnos
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAppointments.map((apt) => {
                  const startDate = new Date(apt.start);
                  const isSelected = selectedIds.includes(apt.id);
                  return (
                    <TableRow 
                      key={apt.id}
                      className={`cursor-pointer hover:bg-muted/50 ${isSelected ? 'bg-muted/30' : ''}`}
                      onClick={() => handleRowClick(apt)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked: boolean) => handleSelectOne(apt.id, checked)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {format(startDate, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(startDate, "HH:mm")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {apt.title.split(" - ")[1] || "Paciente"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {getRoomName(apt.resourceId)}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm">
                        {apt.reason || "Sin especificar"}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(apt.status)}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRowClick(apt)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} de {filteredAppointments.length} turnos
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Dialog Detalles del Turno */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalles del Turno</DialogTitle>
              <DialogDescription>
                Información completa y acciones disponibles
              </DialogDescription>
            </DialogHeader>
            
            {selectedAppointment && (
              <div className="space-y-6">
                {/* Info Principal */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Fecha</span>
                    <p className="font-medium">{format(new Date(selectedAppointment.start), "dd/MM/yyyy", { locale: es })}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Hora</span>
                    <p className="font-medium">{format(new Date(selectedAppointment.start), "HH:mm")} - {format(new Date(selectedAppointment.end), "HH:mm")}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Estado</span>
                    <div className="mt-1">
                      {getStatusBadge(selectedAppointment.status)}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Sala / Profesional</span>
                    <p className="font-medium">
                      {getRoomName(selectedAppointment.resourceId)}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Información del Paciente */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Información del Turno
                  </h3>
                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase">Paciente</span>
                      <p className="font-medium mt-1">{selectedAppointment.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" onClick={() => handleCall("+541112345678")}>
                        <Phone className="mr-2 h-4 w-4" />
                        Llamar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toast.info("Abriendo email...")}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase">Motivo de Consulta</span>
                      <p className="text-sm mt-1">{selectedAppointment.reason || "No especificado"}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase">Observaciones</span>
                      <p className="text-sm mt-1 whitespace-pre-wrap">{selectedAppointment.notes || "Sin observaciones"}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Acciones del Turno */}
                <div>
                  <h3 className="font-semibold mb-3">Acciones del Turno</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedAppointment.status === "pending" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={handleConfirmAppointment}
                            disabled={isLoading}
                          >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                            Confirmar Turno
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Marcar turno como confirmado</TooltipContent>
                      </Tooltip>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setIsRescheduleDialogOpen(true)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          Reprogramar
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Cambiar fecha y hora del turno</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setIsReminderDialogOpen(true)}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Enviar Recordatorio
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Enviar recordatorio por WhatsApp/SMS/Email</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setIsNotesDialogOpen(true)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Agregar Nota
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Agregar nota rápida al turno</TooltipContent>
                    </Tooltip>

                    {selectedAppointment.status !== "completed" && selectedAppointment.status !== "cancelled" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full bg-green-50 hover:bg-green-100"
                            onClick={handleMarkAsCompleted}
                            disabled={isLoading}
                          >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4 text-green-600" />}
                            <span className="text-green-600">Completado</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Marcar como atendido</TooltipContent>
                      </Tooltip>
                    )}

                    {selectedAppointment.status !== "absent" && selectedAppointment.status !== "cancelled" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full bg-red-50 hover:bg-red-100"
                            onClick={handleMarkAsAbsent}
                            disabled={isLoading}
                          >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4 text-red-600" />}
                            <span className="text-red-600">Ausente</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Marcar paciente como ausente</TooltipContent>
                      </Tooltip>
                    )}

                    {selectedAppointment.status !== "cancelled" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="destructive" 
                            className="w-full col-span-2"
                            onClick={() => setIsCancelDialogOpen(true)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancelar Turno
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Cancelar el turno definitivamente</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cerrar
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog Cancelar Turno */}
        <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Cancelar este turno?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. El turno quedará marcado como cancelado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No, mantener</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCancelAppointment}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sí, cancelar turno
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Dialog Reprogramar */}
        <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reprogramar Turno</DialogTitle>
              <DialogDescription>
                Selecciona nueva fecha y hora para el turno
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nueva Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Calendar className="mr-2 h-4 w-4" />
                      {rescheduleDate ? format(rescheduleDate, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={rescheduleDate}
                      onSelect={setRescheduleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Nueva Hora</Label>
                <Select value={rescheduleTime} onValueChange={setRescheduleTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="09:30">09:30</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="10:30">10:30</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="11:30">11:30</SelectItem>
                    <SelectItem value="12:00">12:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="14:30">14:30</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="15:30">15:30</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="16:30">16:30</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleReschedule} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirmar Reprogramación
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Enviar Recordatorio */}
        <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar Recordatorio</DialogTitle>
              <DialogDescription>
                Selecciona el canal por el cual enviar el recordatorio
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Canal de Envío</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={reminderChannel === "whatsapp" ? "default" : "outline"}
                    className={reminderChannel === "whatsapp" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setReminderChannel("whatsapp")}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button
                    variant={reminderChannel === "sms" ? "default" : "outline"}
                    className={reminderChannel === "sms" ? "bg-purple-600 hover:bg-purple-700" : ""}
                    onClick={() => setReminderChannel("sms")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    SMS
                  </Button>
                  <Button
                    variant={reminderChannel === "email" ? "default" : "outline"}
                    className={reminderChannel === "email" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    onClick={() => setReminderChannel("email")}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>

              {selectedAppointment && (
                <div className="rounded-lg border p-4 bg-muted/30">
                  <p className="text-sm font-medium mb-2">Vista Previa del Mensaje:</p>
                  <p className="text-sm text-muted-foreground">
                    Hola {selectedAppointment.title.split(" - ")[1] || "Paciente"}, te recordamos tu turno para el {format(new Date(selectedAppointment.start), "dd/MM/yyyy 'a las' HH:mm", { locale: es })} en {getRoomName(selectedAppointment.resourceId)}. Te esperamos!
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReminderDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSendReminder} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar Recordatorio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Notas Rápidas */}
        <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nota Rápida</DialogTitle>
              <DialogDescription>
                Agrega una observación o comentario al turno
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nota</Label>
                <Textarea
                  placeholder="Ej: Paciente solicitó cambio de horario, paciente llegó tarde, etc."
                  rows={4}
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                />
              </div>

              {selectedAppointment?.notes && (
                <div className="rounded-lg border p-3 bg-muted/30">
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Notas Existentes:</p>
                  <p className="text-sm whitespace-pre-wrap">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveQuickNote} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Nota
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
