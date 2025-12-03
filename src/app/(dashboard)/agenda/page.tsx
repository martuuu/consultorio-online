"use client";

import { useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-styles.css";
import appointmentsData from "@/lib/data/appointments.json";
import roomsData from "@/lib/data/room.json";
import waitingListData from "@/lib/data/waiting-list.json";
import timeBlocksData from "@/lib/data/time-blocks.json";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Calendar as CalendarIcon, Clock, Users, Mail, Phone, FileText, MapPin, Search, Download, AlertCircle, Lightbulb } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export default function AgendaPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isTimeBlocksDialogOpen, setIsTimeBlocksDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isFindSlotDialogOpen, setIsFindSlotDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("all");
  const [currentView, setCurrentView] = useState<CalendarView>("week");

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
        return <Badge>Confirmado</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
          <div className="flex gap-2">
            {/* Buscar Próximo Hueco - Mockup */}
            <Dialog open={isFindSlotDialogOpen} onOpenChange={setIsFindSlotDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="group">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar Hueco
                  <span className="ml-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    (En desarrollo)
                  </span>
                </Button>
              </DialogTrigger>
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
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Exportar Agenda</DialogTitle>
                  <DialogDescription>
                    Descarga tu agenda en formato Excel o CSV para análisis externo.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar como Excel (.xlsx)
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar como CSV
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bloqueos */}
            <Dialog open={isTimeBlocksDialogOpen} onOpenChange={setIsTimeBlocksDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Bloqueos
                </Button>
              </DialogTrigger>
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
              <DialogTrigger asChild>
                <Button size="lg" onClick={() => setSelectedSlot(null)}>
                  <Plus className="mr-2 h-4 w-4" /> Nuevo Turno
                </Button>
              </DialogTrigger>
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
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
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
            <div className="flex gap-2">
              <Badge 
                variant={currentView === "day" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setCurrentView("day")}
              >
                Día
              </Badge>
              <Badge 
                variant={currentView === "week" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setCurrentView("week")}
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
        </CardContent>
      </Card>

      {/* Calendario */}
      <Card className="flex-1">
        <CardContent className="p-6 h-full">
          <Calendar
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
            min={new Date(2025, 0, 1, 7, 0, 0)}
            max={new Date(2025, 0, 1, 20, 0, 0)}
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
              day: "Día",
              agenda: "Agenda",
              date: "Fecha",
              time: "Hora",
              event: "Evento",
              noEventsInRange: "No hay eventos en este rango",
            }}
            defaultView={Views.WEEK}
            views={['month', 'week', 'day', 'agenda']}
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
              <Badge variant="secondary">{waitingListData.length}</Badge>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Pacientes esperando un hueco en la agenda
            </p>

            <Separator />

            <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {waitingListData.map((item) => (
                <Card key={item.id} className="border-l-4 border-l-amber-500">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{item.patientName}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                      </div>
                      {item.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs">Urgente</Badge>
                      )}
                    </div>
                    
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
                      <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">
                        Contactar
                      </Button>
                      <Button size="sm" className="flex-1 h-7 text-xs">
                        Asignar Turno
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
