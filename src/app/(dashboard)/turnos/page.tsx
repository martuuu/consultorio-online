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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  MoreHorizontal, 
  Calendar, 
  UserPlus, 
  Mail, 
  Phone, 
  FileText, 
  Trash2, 
  Edit, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import appointmentsData from "@/lib/data/appointments.json";
import roomsData from "@/lib/data/room.json";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtrar y buscar
  const filteredAppointments = useMemo(() => {
    return (appointmentsData as Appointment[]).filter((apt) => {
      const matchesSearch = apt.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

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

  const handleAddPatient = () => {
    alert("Paciente agregado al sistema con éxito!");
    setIsDialogOpen(false);
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
    alert(`Eliminando ${selectedIds.length} turno(s)`);
    setSelectedIds([]);
  };

  const getRoomName = (resourceId: number) => {
    const room = roomsData.find(r => r.id === resourceId);
    return room?.name || "Consultorio desconocido";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-600">Confirmado</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-500">Pendiente</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Turnos</h1>
          <p className="text-muted-foreground mt-1">
            {filteredAppointments.length} turnos totales
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" /> Ver Agenda
        </Button>
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
            </SelectContent>
          </Select>
        </div>
        {selectedIds.length > 0 && (
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRowClick(apt)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar turno
                          </DropdownMenuItem>
                          {apt.status === 'pending' && (
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Confirmar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <X className="mr-2 h-4 w-4" />
                            Cancelar turno
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Turno</DialogTitle>
            <DialogDescription>
              Información completa del turno y datos del paciente
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-6">
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
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Contacto disponible en ficha del paciente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+54 11 XXXX XXXX</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Motivo de Consulta</span>
                    <p className="text-sm mt-1">{selectedAppointment.reason || "No especificado"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Observaciones</span>
                    <p className="text-sm mt-1">{selectedAppointment.notes || "Sin observaciones"}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cerrar
                </Button>
                <Button onClick={handleAddPatient}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Agregar Paciente al Sistema
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
