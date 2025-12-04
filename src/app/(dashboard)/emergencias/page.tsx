"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ambulance, MapPin, Phone, Clock, AlertTriangle, CheckCircle2, Navigation, Activity, Users, Building2, Eye, PhoneCall, Radio, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Interfaces
interface Emergency {
  id: number;
  code: string;
  priority: "CRITICA" | "ALTA" | "MEDIA" | "BAJA";
  status: "PENDIENTE" | "EN_CURSO" | "RESUELTA" | "CANCELADA";
  patientName: string;
  patientAge: number;
  address: string;
  coordinates: { lat: number; lng: number };
  symptoms: string;
  requestedAt: string;
  assignedAmbulance?: number;
  assignedBase?: number;
  estimatedArrival?: string;
  resolvedAt?: string;
  notes?: string;
}

interface Ambulance {
  id: number;
  code: string;
  type: "MEDICALIZADA" | "BASICA" | "TRASLADO";
  status: "DISPONIBLE" | "EN_SERVICIO" | "MANTENIMIENTO" | "FUERA_DE_SERVICIO";
  baseId: number;
  currentLocation?: { lat: number; lng: number };
  crew: {
    driver: string;
    paramedic: string;
    doctor?: string;
  };
  equipment: string[];
  lastMaintenance: string;
}

interface Base {
  id: number;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  ambulances: number;
  staff: number;
  coverageArea: string[];
  operatingHours: string;
}

// Mock Data
const MOCK_EMERGENCIES: Emergency[] = [
  {
    id: 1,
    code: "EMG-2025-001",
    priority: "CRITICA",
    status: "EN_CURSO",
    patientName: "María González",
    patientAge: 68,
    address: "Av. Corrientes 1234, CABA",
    coordinates: { lat: -34.6037, lng: -58.3816 },
    symptoms: "Dolor torácico intenso, sudoración, dificultad respiratoria",
    requestedAt: "2025-12-04T14:23:00",
    assignedAmbulance: 1,
    assignedBase: 1,
    estimatedArrival: "2025-12-04T14:35:00",
  },
  {
    id: 2,
    code: "EMG-2025-002",
    priority: "ALTA",
    status: "PENDIENTE",
    patientName: "Carlos Fernández",
    patientAge: 45,
    address: "Calle Falsa 456, Palermo",
    coordinates: { lat: -34.5889, lng: -58.4199 },
    symptoms: "Fractura expuesta en pierna derecha por accidente",
    requestedAt: "2025-12-04T14:45:00",
  },
  {
    id: 3,
    code: "EMG-2025-003",
    priority: "MEDIA",
    status: "RESUELTA",
    patientName: "Ana Martínez",
    patientAge: 32,
    address: "Belgrano 789, CABA",
    coordinates: { lat: -34.5627, lng: -58.4544 },
    symptoms: "Fiebre alta 39.5°C, convulsiones",
    requestedAt: "2025-12-04T13:15:00",
    assignedAmbulance: 2,
    assignedBase: 2,
    resolvedAt: "2025-12-04T14:20:00",
    notes: "Paciente trasladado a Hospital Italiano. Estable.",
  },
];

const MOCK_AMBULANCES: Ambulance[] = [
  {
    id: 1,
    code: "AMB-M01",
    type: "MEDICALIZADA",
    status: "EN_SERVICIO",
    baseId: 1,
    currentLocation: { lat: -34.6037, lng: -58.3816 },
    crew: {
      driver: "Juan Pérez",
      paramedic: "Laura Gómez",
      doctor: "Dr. Roberto Sánchez",
    },
    equipment: ["Desfibrilador", "Respirador", "Medicación de emergencia", "Camilla hidráulica"],
    lastMaintenance: "2025-11-20",
  },
  {
    id: 2,
    code: "AMB-B02",
    type: "BASICA",
    status: "DISPONIBLE",
    baseId: 2,
    crew: {
      driver: "Miguel Torres",
      paramedic: "Sofía Ramírez",
    },
    equipment: ["Oxígeno", "Camilla", "Kit primeros auxilios", "Tensiómetro"],
    lastMaintenance: "2025-11-25",
  },
  {
    id: 3,
    code: "AMB-T03",
    type: "TRASLADO",
    status: "DISPONIBLE",
    baseId: 1,
    crew: {
      driver: "Pedro Díaz",
      paramedic: "Carolina López",
    },
    equipment: ["Camilla", "Oxígeno", "Kit básico"],
    lastMaintenance: "2025-11-28",
  },
  {
    id: 4,
    code: "AMB-M04",
    type: "MEDICALIZADA",
    status: "MANTENIMIENTO",
    baseId: 3,
    crew: {
      driver: "Ricardo Vargas",
      paramedic: "Daniela Cruz",
      doctor: "Dra. Patricia Moreno",
    },
    equipment: ["Desfibrilador", "Respirador", "Medicación", "Monitor cardíaco"],
    lastMaintenance: "2025-12-02",
  },
];

const MOCK_BASES: Base[] = [
  {
    id: 1,
    name: "Base Central",
    address: "Av. del Libertador 5600, CABA",
    coordinates: { lat: -34.5731, lng: -58.4173 },
    phone: "+54 11 4000-1234",
    ambulances: 8,
    staff: 24,
    coverageArea: ["Palermo", "Recoleta", "Belgrano", "Núñez"],
    operatingHours: "24/7",
  },
  {
    id: 2,
    name: "Base Sur",
    address: "Av. Caseros 2450, CABA",
    coordinates: { lat: -34.6389, lng: -58.3931 },
    phone: "+54 11 4000-5678",
    ambulances: 5,
    staff: 15,
    coverageArea: ["Constitución", "San Telmo", "La Boca", "Barracas"],
    operatingHours: "24/7",
  },
  {
    id: 3,
    name: "Base Oeste",
    address: "Av. Rivadavia 8900, CABA",
    coordinates: { lat: -34.6421, lng: -58.5032 },
    phone: "+54 11 4000-9012",
    ambulances: 6,
    staff: 18,
    coverageArea: ["Flores", "Caballito", "Almagro", "Villa Crespo"],
    operatingHours: "24/7",
  },
];

export default function EmergenciasPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>(MOCK_EMERGENCIES);
  const [ambulances] = useState<Ambulance[]>(MOCK_AMBULANCES);
  const [bases] = useState<Base[]>(MOCK_BASES);
  
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isNewEmergencyDialogOpen, setIsNewEmergencyDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Nuevo formulario emergencia
  const [newEmergency, setNewEmergency] = useState({
    patientName: "",
    patientAge: "",
    address: "",
    symptoms: "",
    priority: "MEDIA" as Emergency["priority"],
  });

  // Stats dinámicos
  const stats = useMemo(() => {
    const active = emergencies.filter(e => e.status === "EN_CURSO").length;
    const pending = emergencies.filter(e => e.status === "PENDIENTE").length;
    const resolved = emergencies.filter(e => e.status === "RESUELTA").length;
    const availableAmbulances = ambulances.filter(a => a.status === "DISPONIBLE").length;
    const totalAmbulances = ambulances.length;
    const avgResponseTime = "8 min"; // Mock
    
    return { active, pending, resolved, availableAmbulances, totalAmbulances, avgResponseTime };
  }, [emergencies, ambulances]);

  // Filtros
  const filteredEmergencies = useMemo(() => {
    return emergencies.filter(e => {
      const matchesStatus = statusFilter === "all" || e.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || e.priority === priorityFilter;
      const matchesSearch = e.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           e.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           e.address.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [emergencies, statusFilter, priorityFilter, searchTerm]);

  // Handlers
  const handleViewDetails = (emergency: Emergency) => {
    setSelectedEmergency(emergency);
    setIsDetailsDialogOpen(true);
  };

  const handleCreateEmergency = () => {
    if (!newEmergency.patientName || !newEmergency.address || !newEmergency.symptoms) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const emergency: Emergency = {
        id: emergencies.length + 1,
        code: `EMG-2025-${String(emergencies.length + 1).padStart(3, "0")}`,
        priority: newEmergency.priority,
        status: "PENDIENTE",
        patientName: newEmergency.patientName,
        patientAge: parseInt(newEmergency.patientAge),
        address: newEmergency.address,
        coordinates: { lat: -34.6037 + Math.random() * 0.1, lng: -58.3816 + Math.random() * 0.1 },
        symptoms: newEmergency.symptoms,
        requestedAt: new Date().toISOString(),
      };
      
      setEmergencies([emergency, ...emergencies]);
      setIsLoading(false);
      setIsNewEmergencyDialogOpen(false);
      setNewEmergency({
        patientName: "",
        patientAge: "",
        address: "",
        symptoms: "",
        priority: "MEDIA",
      });
      toast.success(`Emergencia ${emergency.code} registrada correctamente`);
    }, 800);
  };

  const handleAssignAmbulance = (ambulanceId: number) => {
    if (!selectedEmergency) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const ambulance = ambulances.find(a => a.id === ambulanceId);
      setEmergencies(prev => prev.map(e =>
        e.id === selectedEmergency.id
          ? {
              ...e,
              status: "EN_CURSO",
              assignedAmbulance: ambulanceId,
              assignedBase: ambulance?.baseId,
              estimatedArrival: new Date(Date.now() + 12 * 60000).toISOString(),
            }
          : e
      ));
      setIsLoading(false);
      setIsAssignDialogOpen(false);
      setIsDetailsDialogOpen(false);
      toast.success(`Ambulancia ${ambulance?.code} asignada correctamente`);
    }, 1000);
  };

  const handleResolve = () => {
    if (!selectedEmergency) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setEmergencies(prev => prev.map(e =>
        e.id === selectedEmergency.id
          ? { ...e, status: "RESUELTA", resolvedAt: new Date().toISOString() }
          : e
      ));
      setIsLoading(false);
      setIsDetailsDialogOpen(false);
      toast.success("Emergencia marcada como resuelta");
    }, 800);
  };

  const handleCancel = () => {
    if (!selectedEmergency) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setEmergencies(prev => prev.map(e =>
        e.id === selectedEmergency.id ? { ...e, status: "CANCELADA" } : e
      ));
      setIsLoading(false);
      setIsCancelDialogOpen(false);
      setIsDetailsDialogOpen(false);
      toast.success("Emergencia cancelada");
    }, 800);
  };

  const getPriorityBadge = (priority: Emergency["priority"]) => {
    const variants = {
      CRITICA: <Badge className="bg-red-600 text-white">CRÍTICA</Badge>,
      ALTA: <Badge className="bg-orange-500 text-white">ALTA</Badge>,
      MEDIA: <Badge className="bg-yellow-500 text-white">MEDIA</Badge>,
      BAJA: <Badge variant="secondary">BAJA</Badge>,
    };
    return variants[priority];
  };

  const getStatusBadge = (status: Emergency["status"]) => {
    const variants = {
      PENDIENTE: <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pendiente</Badge>,
      EN_CURSO: <Badge className="bg-blue-600 text-white">En Curso</Badge>,
      RESUELTA: <Badge className="bg-green-600 text-white">Resuelta</Badge>,
      CANCELADA: <Badge variant="secondary">Cancelada</Badge>,
    };
    return variants[status];
  };

  const getAmbulanceTypeBadge = (type: Ambulance["type"]) => {
    const variants = {
      MEDICALIZADA: <Badge className="bg-red-600 text-white">Medicalizada</Badge>,
      BASICA: <Badge className="bg-blue-600 text-white">Básica</Badge>,
      TRASLADO: <Badge variant="secondary">Traslado</Badge>,
    };
    return variants[type];
  };

  const getAmbulanceStatusBadge = (status: Ambulance["status"]) => {
    const variants = {
      DISPONIBLE: <Badge className="bg-green-600 text-white">Disponible</Badge>,
      EN_SERVICIO: <Badge className="bg-blue-600 text-white">En Servicio</Badge>,
      MANTENIMIENTO: <Badge className="bg-orange-500 text-white">Mantenimiento</Badge>,
      FUERA_DE_SERVICIO: <Badge variant="destructive">Fuera de Servicio</Badge>,
    };
    return variants[status];
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Ambulance className="h-8 w-8 text-red-600" />
            Servicio de Emergencias
          </h1>
          <p className="text-muted-foreground">Sistema de gestión de urgencias y despacho de ambulancias</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsNewEmergencyDialogOpen(true)} className="bg-red-600 hover:bg-red-700">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Nueva Emergencia
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activas</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">En curso ahora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Sin asignar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resueltas Hoy</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">Completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ambulancias</CardTitle>
            <Ambulance className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableAmbulances}/{stats.totalAmbulances}</div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bases</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bases.length}</div>
            <p className="text-xs text-muted-foreground">Operativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">Respuesta</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="emergencies" className="space-y-6">
        <TabsList>
          <TabsTrigger value="emergencies">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Emergencias
          </TabsTrigger>
          <TabsTrigger value="ambulances">
            <Ambulance className="mr-2 h-4 w-4" />
            Ambulancias
          </TabsTrigger>
          <TabsTrigger value="bases">
            <Building2 className="mr-2 h-4 w-4" />
            Bases
          </TabsTrigger>
          <TabsTrigger value="map">
            <MapPin className="mr-2 h-4 w-4" />
            Mapa en Tiempo Real
          </TabsTrigger>
        </TabsList>

        {/* Tab Emergencias */}
        <TabsContent value="emergencies" className="space-y-4">
          {/* Filtros */}
          <div className="flex gap-4">
            <Input
              placeholder="Buscar por paciente, código o dirección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                <SelectItem value="EN_CURSO">En Curso</SelectItem>
                <SelectItem value="RESUELTA">Resuelta</SelectItem>
                <SelectItem value="CANCELADA">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="CRITICA">Crítica</SelectItem>
                <SelectItem value="ALTA">Alta</SelectItem>
                <SelectItem value="MEDIA">Media</SelectItem>
                <SelectItem value="BAJA">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabla de Emergencias */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Hora Solicitud</TableHead>
                  <TableHead>Ambulancia</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmergencies.map((emergency) => {
                  const ambulance = ambulances.find(a => a.id === emergency.assignedAmbulance);
                  return (
                    <TableRow key={emergency.id}>
                      <TableCell className="font-medium">{emergency.code}</TableCell>
                      <TableCell>{getPriorityBadge(emergency.priority)}</TableCell>
                      <TableCell>{getStatusBadge(emergency.status)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{emergency.patientName}</p>
                          <p className="text-xs text-muted-foreground">{emergency.patientAge} años</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{emergency.address}</TableCell>
                      <TableCell>{format(new Date(emergency.requestedAt), "HH:mm", { locale: es })}</TableCell>
                      <TableCell>
                        {ambulance ? (
                          <Badge variant="outline">{ambulance.code}</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Sin asignar</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(emergency)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Tab Ambulancias */}
        <TabsContent value="ambulances" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ambulances.map((ambulance) => {
              const base = bases.find(b => b.id === ambulance.baseId);
              return (
                <Card key={ambulance.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Ambulance className="h-5 w-5" />
                        {ambulance.code}
                      </CardTitle>
                      {getAmbulanceStatusBadge(ambulance.status)}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Building2 className="h-3 w-3" />
                      {base?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      {getAmbulanceTypeBadge(ambulance.type)}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Tripulación:</span>
                      </div>
                      <div className="pl-6 space-y-1 text-xs text-muted-foreground">
                        <p>• Conductor: {ambulance.crew.driver}</p>
                        <p>• Paramédico: {ambulance.crew.paramedic}</p>
                        {ambulance.crew.doctor && <p>• Médico: {ambulance.crew.doctor}</p>}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Equipamiento:</p>
                      <div className="flex flex-wrap gap-1">
                        {ambulance.equipment.slice(0, 3).map((eq, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{eq}</Badge>
                        ))}
                        {ambulance.equipment.length > 3 && (
                          <Badge variant="secondary" className="text-xs">+{ambulance.equipment.length - 3}</Badge>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Último mantenimiento: {format(new Date(ambulance.lastMaintenance), "dd/MM/yyyy")}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Tab Bases */}
        <TabsContent value="bases" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bases.map((base) => (
              <Card key={base.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {base.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {base.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{base.phone}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div>
                      <p className="text-2xl font-bold">{base.ambulances}</p>
                      <p className="text-xs text-muted-foreground">Ambulancias</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{base.staff}</p>
                      <p className="text-xs text-muted-foreground">Personal</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Área de Cobertura:</p>
                    <div className="flex flex-wrap gap-1">
                      {base.coverageArea.map((area, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{area}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">{base.operatingHours}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Mapa */}
        <TabsContent value="map">
          <Card className="h-[600px] flex items-center justify-center bg-muted/30">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Mapa en Tiempo Real</h3>
                <p className="text-muted-foreground">Integración con Google Maps API</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Muestra ubicación de ambulancias, emergencias activas y bases
                </p>
              </div>
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-600">
                PREMIUM
              </Badge>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog Detalles Emergencia */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Detalles de Emergencia - {selectedEmergency?.code}
            </DialogTitle>
            <DialogDescription>
              Información completa y acciones disponibles
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmergency && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {getPriorityBadge(selectedEmergency.priority)}
                {getStatusBadge(selectedEmergency.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Paciente</Label>
                  <p className="font-medium">{selectedEmergency.patientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmergency.patientAge} años</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Hora de Solicitud</Label>
                  <p className="font-medium">
                    {format(new Date(selectedEmergency.requestedAt), "HH:mm:ss", { locale: es })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedEmergency.requestedAt), "dd/MM/yyyy", { locale: es })}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Dirección</Label>
                <p className="font-medium">{selectedEmergency.address}</p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Síntomas / Motivo</Label>
                <p className="text-sm">{selectedEmergency.symptoms}</p>
              </div>

              {selectedEmergency.assignedAmbulance && (
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <Label className="text-xs text-muted-foreground">Ambulancia Asignada</Label>
                  <p className="font-medium">{ambulances.find(a => a.id === selectedEmergency.assignedAmbulance)?.code}</p>
                  {selectedEmergency.estimatedArrival && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Llegada estimada: {format(new Date(selectedEmergency.estimatedArrival), "HH:mm", { locale: es })}
                    </p>
                  )}
                </div>
              )}

              {selectedEmergency.notes && (
                <div>
                  <Label className="text-xs text-muted-foreground">Notas</Label>
                  <p className="text-sm">{selectedEmergency.notes}</p>
                </div>
              )}

              {/* Acciones */}
              <div className="flex gap-2 pt-4">
                {selectedEmergency.status === "PENDIENTE" && (
                  <Button onClick={() => setIsAssignDialogOpen(true)} className="flex-1">
                    <Ambulance className="mr-2 h-4 w-4" />
                    Asignar Ambulancia
                  </Button>
                )}
                
                {selectedEmergency.status === "EN_CURSO" && (
                  <>
                    <Button onClick={handleResolve} className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Marcar como Resuelta
                    </Button>
                    <Button variant="outline" onClick={() => window.open(`tel:${bases[0].phone}`)}>
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Contactar Base
                    </Button>
                  </>
                )}

                {selectedEmergency.status !== "RESUELTA" && selectedEmergency.status !== "CANCELADA" && (
                  <Button variant="destructive" onClick={() => setIsCancelDialogOpen(true)}>
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog Nueva Emergencia */}
      <Dialog open={isNewEmergencyDialogOpen} onOpenChange={setIsNewEmergencyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Registrar Nueva Emergencia
            </DialogTitle>
            <DialogDescription>
              Completa la información del paciente y la urgencia
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Nombre del Paciente *</Label>
                <Input
                  id="patientName"
                  value={newEmergency.patientName}
                  onChange={(e) => setNewEmergency({...newEmergency, patientName: e.target.value})}
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientAge">Edad *</Label>
                <Input
                  id="patientAge"
                  type="number"
                  value={newEmergency.patientAge}
                  onChange={(e) => setNewEmergency({...newEmergency, patientAge: e.target.value})}
                  placeholder="Ej: 45"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                value={newEmergency.address}
                onChange={(e) => setNewEmergency({...newEmergency, address: e.target.value})}
                placeholder="Ej: Av. Corrientes 1234, CABA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Síntomas / Motivo *</Label>
              <Textarea
                id="symptoms"
                rows={3}
                value={newEmergency.symptoms}
                onChange={(e) => setNewEmergency({...newEmergency, symptoms: e.target.value})}
                placeholder="Describe los síntomas o motivo de la emergencia..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad *</Label>
              <Select
                value={newEmergency.priority}
                onValueChange={(value) => setNewEmergency({...newEmergency, priority: value as Emergency["priority"]})}
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CRITICA">CRÍTICA - Riesgo de vida inmediato</SelectItem>
                  <SelectItem value="ALTA">ALTA - Requiere atención urgente</SelectItem>
                  <SelectItem value="MEDIA">MEDIA - Atención necesaria</SelectItem>
                  <SelectItem value="BAJA">BAJA - No urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewEmergencyDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateEmergency} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                <>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Registrar Emergencia
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Asignar Ambulancia */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asignar Ambulancia</DialogTitle>
            <DialogDescription>
              Selecciona una ambulancia disponible para esta emergencia
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {ambulances.filter(a => a.status === "DISPONIBLE").map((ambulance) => {
                const base = bases.find(b => b.id === ambulance.baseId);
                return (
                  <Card
                    key={ambulance.id}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleAssignAmbulance(ambulance.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{ambulance.code}</p>
                          <p className="text-xs text-muted-foreground">{base?.name}</p>
                          <div className="mt-1">{getAmbulanceTypeBadge(ambulance.type)}</div>
                        </div>
                        <Radio className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Cancelar */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar emergencia?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción marcará la emergencia como cancelada. ¿Estás seguro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, volver</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} className="bg-red-600 hover:bg-red-700">
              Sí, cancelar emergencia
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
