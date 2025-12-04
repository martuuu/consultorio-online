"use client";

import { useState, useMemo } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMinutes, setHours, setMinutes } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-styles.css";
import appointmentsData from "@/lib/data/appointments.json";
import roomsData from "@/lib/data/room.json";
import waitingListData from "@/lib/data/waiting-list.json";
import timeBlocksData from "@/lib/data/time-blocks.json";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Calendar as CalendarIcon, Clock, Users, Mail, Phone, FileText, MapPin, Search, Download, AlertCircle, Lightbulb, CheckCircle2, XCircle, CalendarClock, MessageSquare, AlertTriangle, Check, X, RefreshCw, Send, ChevronUp, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComp } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

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

interface Event {
  id: number | string;
  title: string;
  start: Date;
  end: Date;
  patientId?: number | string;
  roomId?: number | string;
  resourceId?: number;
  status?: string;
}

type CalendarView = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

export default function AgendaPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isTimeBlocksDialogOpen, setIsTimeBlocksDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isFindSlotDialogOpen, setIsFindSlotDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isSendReminderDialogOpen, setIsSendReminderDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("all");
  const [currentView, setCurrentView] = useState<CalendarView>("week");
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(new Date());
  const [rescheduleTime, setRescheduleTime] = useState<string>("09:00");
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingListExpanded, setIsWaitingListExpanded] = useState(true);
  const [expandedWaitingItems, setExpandedWaitingItems] = useState<number[]>(
    waitingListData.map(item => item.id)
  );
  
  // Configuración de visualización
  const [showWeekends, setShowWeekends] = useState(true);
  const [calendarStartHour, setCalendarStartHour] = useState(8);
  const [calendarEndHour, setCalendarEndHour] = useState(20);

  // Toggle individual waiting list item
  const toggleWaitingItem = (id: number) => {
    setExpandedWaitingItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Toggle all waiting list items
  const toggleAllWaitingItems = () => {
    if (isWaitingListExpanded) {
      setExpandedWaitingItems([]);
    } else {
      setExpandedWaitingItems(waitingListData.map(item => item.id));
    }
    setIsWaitingListExpanded(!isWaitingListExpanded);
  };

  // Transform string dates to Date objects - usando useMemo para evitar recalcular
  const events = useMemo<Event[]>(() => {
    return appointmentsData.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }, []);

  // Función para obtener la clase CSS según el estado
  const eventStyleGetter = (event: Event) => {
    const statusClass = event.status ? `status-${event.status}` : '';
    return {
      className: statusClass,
    };
  };

  // Obtener badge de estado
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge className="bg-amber-500">En Sala de Espera</Badge>;
      case 'in-consultation':
        return <Badge className="bg-green-600">En Consulta</Badge>;
      case 'completed':
        return <Badge className="bg-blue-600">Atendido</Badge>;
      case 'absent':
        return <Badge className="bg-red-600">Ausente</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-600">Confirmado</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Acciones de turnos con toasts
  const handleConfirmAppointment = (id: number | string, patientName: string) => {
    setIsLoading(true);
    toast.loading("Confirmando turno...", { id: "confirm" });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Turno de ${patientName} confirmado exitosamente`, { id: "confirm" });
      setIsEventDialogOpen(false);
    }, 1000);
  };

  const handleCancelAppointment = (id: number | string, patientName: string) => {
    toast.warning(`¿Cancelar turno de ${patientName}?`, {
      description: "Esta acción no se puede deshacer",
      action: {
        label: "Sí, cancelar",
        onClick: () => {
          setIsLoading(true);
          toast.loading("Cancelando turno...", { id: "cancel" });
          
          setTimeout(() => {
            setIsLoading(false);
            toast.success("Turno cancelado", { id: "cancel" });
            setIsEventDialogOpen(false);
          }, 1000);
        },
      },
      cancel: {
        label: "No",
        onClick: () => {},
      },
    });
  };

  const handleRescheduleAppointment = () => {
    if (!rescheduleDate || !rescheduleTime) {
      toast.error("Selecciona fecha y hora");
      return;
    }

    setIsLoading(true);
    toast.loading("Reprogramando turno...", { id: "reschedule" });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        `Turno reprogramado para ${format(rescheduleDate, "dd/MM/yyyy")} a las ${rescheduleTime}`,
        { id: "reschedule" }
      );
      setIsRescheduleDialogOpen(false);
      setIsEventDialogOpen(false);
    }, 1000);
  };

  const handleSendReminder = (channel: "whatsapp" | "sms" | "email", patientName: string) => {
    toast.loading(`Enviando recordatorio por ${channel.toUpperCase()}...`, { id: "reminder" });
    
    setTimeout(() => {
      toast.success(
        `Recordatorio enviado a ${patientName} por ${channel.toUpperCase()}`,
        { id: "reminder", duration: 3000 }
      );
      setIsSendReminderDialogOpen(false);
    }, 1500);
  };

  const handleMarkAsCompleted = (id: number | string, patientName: string) => {
    setIsLoading(true);
    toast.loading("Marcando como completado...", { id: "complete" });
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Turno de ${patientName} marcado como completado`, { id: "complete" });
      setIsEventDialogOpen(false);
    }, 1000);
  };

  const handleMarkAsAbsent = (id: number | string, patientName: string) => {
    toast.warning(`¿Marcar a ${patientName} como ausente?`, {
      description: "Esto afectará las estadísticas de ausentismo",
      action: {
        label: "Confirmar",
        onClick: () => {
          toast.info(`${patientName} marcado como ausente`);
          setIsEventDialogOpen(false);
        },
      },
    });
  };

  const findNextAvailableSlot = (duration: number = 30) => {
    toast.loading("Buscando próximo hueco libre...", { id: "find-slot" });
    
    setTimeout(() => {
      // Mock: encontrar próximo slot
      const mockSlot = {
        date: "Mañana",
        time: "10:30",
        duration: 30,
        room: "Consultorio 1",
      };
      
      toast.success(
        `Próximo hueco libre: ${mockSlot.date} a las ${mockSlot.time} en ${mockSlot.room}`,
        { id: "find-slot", duration: 5000 }
      );
      setIsFindSlotDialogOpen(false);
    }, 1500);
  };

  const handleExportCalendar = () => {
    toast.loading("Generando exportación...", { id: "export" });
    
    setTimeout(() => {
      toast.success("Calendario exportado a Excel", { id: "export" });
      setIsExportDialogOpen(false);
    }, 1500);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });
    setIsDialogOpen(true);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const getRoomName = (resourceId: number) => {
    const room = roomsData.find(r => r.id === resourceId);
    return room?.name || "Consultorio desconocido";
  };

  // Estadísticas del día
  const todayAppointments = events.filter(event => 
    format(event.start, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <div className="flex gap-6 h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col space-y-6 min-w-0">
        {/* Header con título y acciones */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agenda Médica</h1>
            <p className="text-muted-foreground mt-1">
              {format(new Date(), "EEEE d 'de' MMMM, yyyy", { locale: es })}
            </p>
          </div>
          <TooltipProvider>
            <div className="flex gap-2">
              {/* Buscar Próximo Hueco - Mockup */}
              <Dialog open={isFindSlotDialogOpen} onOpenChange={setIsFindSlotDialogOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="group">
                        <Search className="mr-2 h-4 w-4" />
                        Buscar Hueco
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Encuentra el próximo espacio disponible en la agenda</p>
                  </TooltipContent>
                </Tooltip>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Buscador de Próximo Hueco Libre</DialogTitle>
                  <DialogDescription>
                    Esta funcionalidad buscará automáticamente el primer espacio disponible en la agenda según tus criterios.
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 bg-muted rounded-lg flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <p className="text-sm">Feature en desarrollo - Próximamente disponible</p>
                </div>
              </DialogContent>
            </Dialog>

            {/* Exportar - Mockup */}
            <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Exportar agenda a Excel o CSV</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Exportar Agenda</DialogTitle>
                  <DialogDescription>
                    Descarga tu agenda en formato Excel o CSV para análisis externo.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleExportCalendar}
                    disabled={isLoading}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar como Excel (.xlsx)
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      toast.info("Exportación a CSV próximamente disponible");
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar como CSV
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bloqueos */}
            <Dialog open={isTimeBlocksDialogOpen} onOpenChange={setIsTimeBlocksDialogOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Bloqueos
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gestionar bloqueos de agenda y vacaciones</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Gestión de Bloqueos</DialogTitle>
                  <DialogDescription>
                    Configura vacaciones, horarios no disponibles y bloqueos recurrentes.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo Bloqueo
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {timeBlocksData.map((block) => (
                      <Card key={block.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{block.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {block.recurring ? 'Recurrente' : 
                                  `${block.startDate} - ${block.endDate}`}
                              </p>
                              {block.notes && (
                                <p className="text-xs text-muted-foreground mt-1">{block.notes}</p>
                              )}
                            </div>
                            <Badge variant={block.recurring ? "default" : "secondary"}>
                              {block.type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button size="lg" onClick={() => setSelectedSlot(null)}>
                      <Plus className="mr-2 h-4 w-4" /> Nuevo Turno
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Crear un nuevo turno en la agenda</p>
                </TooltipContent>
              </Tooltip>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agendar Nuevo Turno</DialogTitle>
              <DialogDescription>
                Complete la información del paciente y horario deseado.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="patient">Paciente</Label>
                <Input id="patient" placeholder="Buscar o crear paciente..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    defaultValue={selectedSlot?.start ? format(selectedSlot.start, "yyyy-MM-dd") : ""}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Hora</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    defaultValue={selectedSlot?.start ? format(selectedSlot.start, "HH:mm") : ""}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="room">Sala / Consultorio</Label>
                <Select>
                  <SelectTrigger id="room">
                    <SelectValue placeholder="Seleccionar sala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Consultorio 1</SelectItem>
                    <SelectItem value="2">Consultorio 2</SelectItem>
                    <SelectItem value="3">Sala de Procedimientos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notas (opcional)</Label>
                <Input id="notes" placeholder="Motivo de consulta..." />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Confirmar Turno
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
            </div>
          </TooltipProvider>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Turnos Hoy</p>
                <h3 className="text-2xl font-bold mt-2">{todayAppointments.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próximo Turno</p>
                <h3 className="text-2xl font-bold mt-2">
                  {todayAppointments.length > 0 ? format(todayAppointments[0].start, "HH:mm") : "--:--"}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pacientes</p>
                <h3 className="text-2xl font-bold mt-2">{events.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y controles */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {/* Primera fila: Filtros */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtros:</span>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todas las salas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las salas</SelectItem>
                    <SelectItem value="1">Consultorio 1</SelectItem>
                    <SelectItem value="2">Consultorio 2</SelectItem>
                    <SelectItem value="3">Sala de Procedimientos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Vistas */}
              <div className="flex gap-2">
                <Badge 
                  variant={currentView === "day" ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setCurrentView("day")}
                >
                  Día
                </Badge>
                <Badge 
                  variant={currentView === "week" || currentView === "work_week" ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setCurrentView(showWeekends ? "week" : "work_week")}
                >
                  Semana
                </Badge>
                <Badge 
                  variant={currentView === "month" ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setCurrentView("month")}
                >
                  Mes
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Segunda fila: Configuración de visualización */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Toggle fines de semana */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-weekends"
                    checked={showWeekends}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setShowWeekends(checked);
                      // Cambiar automáticamente la vista según el toggle
                      if (currentView === "week" || currentView === "work_week") {
                        setCurrentView(checked ? "week" : "work_week");
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="show-weekends" className="text-sm font-normal cursor-pointer">
                    Mostrar fines de semana
                  </Label>
                </div>

                <Separator orientation="vertical" className="h-6 hidden sm:block" />

                {/* Selector de hora inicio */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Desde:</span>
                  <Select 
                    value={calendarStartHour.toString()} 
                    onValueChange={(val) => setCalendarStartHour(parseInt(val))}
                  >
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 6).map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour.toString().padStart(2, '0')}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selector de hora fin */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Hasta:</span>
                  <Select 
                    value={calendarEndHour.toString()} 
                    onValueChange={(val) => setCalendarEndHour(parseInt(val))}
                  >
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, i) => i + 18).map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour.toString().padStart(2, '0')}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendario */}
      <Card className="flex-1">
        <CardContent className="p-6 h-full">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", minHeight: "600px" }}
            culture="es"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            min={new Date(2025, 0, 1, calendarStartHour, 0, 0)}
            max={new Date(2025, 0, 1, calendarEndHour, 0, 0)}
            step={30}
            timeslots={2}
            formats={{
              dayFormat: (date, culture, localizer) =>
                localizer?.format(date, 'EEE dd/MM', culture) ?? '',
            }}
            messages={{
              next: "Siguiente",
              previous: "Anterior",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              work_week: "Semana Laboral",
              day: "Día",
              agenda: "Agenda",
              date: "Fecha",
              time: "Hora",
              event: "Evento",
              noEventsInRange: "No hay eventos en este rango",
            }}
            defaultView={Views.WEEK}
            views={['month', 'week', 'work_week', 'day', 'agenda']}
            view={currentView}
            onView={(view) => setCurrentView(view as CalendarView)}
            dayLayoutAlgorithm="no-overlap"
          />
        </CardContent>
      </Card>

        {/* Dialog de detalles del evento */}
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Turno</DialogTitle>
            <DialogDescription>
              Información completa del turno y datos del paciente
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Fecha</span>
                  <p className="font-medium">{format(selectedEvent.start, "EEEE d 'de' MMMM, yyyy", { locale: es })}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Hora</span>
                  <p className="font-medium">{format(selectedEvent.start, "HH:mm")} - {format(selectedEvent.end, "HH:mm")}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Estado</span>
                  <div className="mt-1">
                    <Badge variant={selectedEvent.status === 'confirmed' ? 'default' : 'secondary'}>
                      {selectedEvent.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Sala / Consultorio</span>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {getRoomName(selectedEvent.resourceId || 0)}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Información del Paciente
                </h3>
                <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Paciente</span>
                    <p className="font-medium mt-1">{selectedEvent.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">paciente@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+54 11 1234 5678</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Motivo de Consulta</span>
                    <p className="text-sm mt-1">Control de rutina anual</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Observaciones</span>
                    <p className="text-sm mt-1">
                      {selectedEvent.status === 'pending'
                        ? 'Requiere confirmación telefónica' 
                        : 'Sin observaciones adicionales'}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedEvent.status === 'pending' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="justify-start"
                      onClick={() => handleConfirmAppointment(selectedEvent.id, selectedEvent.title)}
                      disabled={isLoading}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Confirmar Turno
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      setIsRescheduleDialogOpen(true);
                      setSelectedAppointmentId(selectedEvent.id);
                    }}
                    disabled={isLoading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reprogramar
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      setIsSendReminderDialogOpen(true);
                      setSelectedAppointmentId(selectedEvent.id);
                    }}
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Recordatorio
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="justify-start"
                    onClick={() => handleMarkAsCompleted(selectedEvent.id, selectedEvent.title)}
                    disabled={isLoading}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Marcar Atendido
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="justify-start text-muted-foreground"
                    onClick={() => handleMarkAsAbsent(selectedEvent.id, selectedEvent.title)}
                    disabled={isLoading}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Marcar Ausente
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="justify-start text-destructive hover:text-destructive"
                    onClick={() => handleCancelAppointment(selectedEvent.id, selectedEvent.title)}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar Turno
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                  Cerrar
                </Button>
                <Button onClick={() => {
                  setIsEventDialogOpen(false);
                  // Aquí iría la navegación a la historia clínica
                }}>
                  Ver Historia Clínica
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
        </Dialog>

        {/* Dialog de Reprogramar */}
        <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Reprogramar Turno</DialogTitle>
              <DialogDescription>
                Selecciona la nueva fecha y hora para el turno
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nueva Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {rescheduleDate ? format(rescheduleDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComp
                      mode="single"
                      selected={rescheduleDate}
                      onSelect={setRescheduleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reschedule-time">Nueva Hora</Label>
                <Select value={rescheduleTime} onValueChange={setRescheduleTime}>
                  <SelectTrigger id="reschedule-time">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => {
                      const hour = Math.floor(i / 2) + 8;
                      const minute = i % 2 === 0 ? "00" : "30";
                      return `${hour.toString().padStart(2, "0")}:${minute}`;
                    }).map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  El paciente recibirá una notificación automática con la nueva fecha
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleRescheduleAppointment} disabled={isLoading}>
                Confirmar Reprogramación
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog de Enviar Recordatorio */}
        <Dialog open={isSendReminderDialogOpen} onOpenChange={setIsSendReminderDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Enviar Recordatorio</DialogTitle>
              <DialogDescription>
                Selecciona el canal por el cual enviar el recordatorio al paciente
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {selectedEvent && (
                <>
                  <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase">Paciente</span>
                      <p className="font-medium">{selectedEvent.title}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase">Turno</span>
                      <p className="text-sm">
                        {format(selectedEvent.start, "EEEE d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Canal de Envío</Label>
                    <div className="grid gap-2">
                      <Button
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => {
                          handleSendReminder("whatsapp", selectedEvent.title);
                          setIsSendReminderDialogOpen(false);
                        }}
                        disabled={isLoading}
                      >
                        <MessageSquare className="h-5 w-5 mr-3 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-xs text-muted-foreground">+54 11 1234 5678</p>
                        </div>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => {
                          handleSendReminder("sms", selectedEvent.title);
                          setIsSendReminderDialogOpen(false);
                        }}
                        disabled={isLoading}
                      >
                        <Phone className="h-5 w-5 mr-3 text-blue-600" />
                        <div className="text-left">
                          <p className="font-medium">SMS</p>
                          <p className="text-xs text-muted-foreground">+54 11 1234 5678</p>
                        </div>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => {
                          handleSendReminder("email", selectedEvent.title);
                          setIsSendReminderDialogOpen(false);
                        }}
                        disabled={isLoading}
                      >
                        <Mail className="h-5 w-5 mr-3 text-purple-600" />
                        <div className="text-left">
                          <p className="font-medium">Email</p>
                          <p className="text-xs text-muted-foreground">paciente@email.com</p>
                        </div>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsSendReminderDialogOpen(false)}>
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sidebar: Lista de Espera */}
      <div className="w-80 shrink-0 hidden lg:block">
        <Card className="h-full">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Lista de Espera
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{waitingListData.length}</Badge>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={toggleAllWaitingItems}
                    >
                      {expandedWaitingItems.length === waitingListData.length ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {expandedWaitingItems.length === waitingListData.length 
                      ? 'Contraer todos' 
                      : 'Expandir todos'}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Pacientes esperando un hueco en la agenda
            </p>

            <Separator />

            <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {waitingListData.map((item) => {
                const isItemExpanded = expandedWaitingItems.includes(item.id);
                return (
                  <Card 
                    key={item.id} 
                    className="border-l-4 border-l-cyan-500 transition-all hover:shadow-md hover:shadow-cyan-500/10 hover:border-l-cyan-600 hover:-translate-y-0.5 cursor-pointer"
                    onClick={() => toggleWaitingItem(item.id)}
                  >
                    <CardContent className={isItemExpanded ? "p-4 space-y-2" : "p-3"}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.patientName}</h4>
                          <p className={`text-xs text-muted-foreground ${isItemExpanded ? 'mt-1' : 'truncate'}`}>
                            {item.reason}
                          </p>
                        </div>
                        {item.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs shrink-0">Urgente</Badge>
                        )}
                      </div>
                      
                      {isItemExpanded ? (
                        <>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{item.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              <span>Fechas preferidas: {item.preferredDates.slice(0, 2).join(', ')}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 h-7 text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Contactar
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 h-7 text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Asignar Turno
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>15 min</span>
                          </div>
                          <Button 
                            size="sm" 
                            className="h-6 text-xs px-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Llamar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button variant="outline" className="w-full" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar a Lista
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
