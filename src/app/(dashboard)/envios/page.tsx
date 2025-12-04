"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Package,
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  Download,
  Plus,
  Phone,
  MessageSquare,
  Navigation,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Edit2,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Tipos
type ShipmentType = "receta" | "orden-estudios" | "certificado" | "resultados" | "muestras" | "documentacion" | "otro";
type ShipmentStatus = "pending" | "assigned" | "picked-up" | "in-transit" | "delivered" | "failed" | "cancelled";
type ShipmentPriority = "normal" | "express" | "urgent";
type ShipmentProvider = "pedidosya" | "cadeteria-propia" | "andreani" | "correo-argentino" | "oca";

interface Shipment {
  id: string;
  type: ShipmentType;
  priority: ShipmentPriority;
  provider: ShipmentProvider;
  status: ShipmentStatus;
  patientName: string;
  patientPhone: string;
  destinationAddress: string;
  destinationNeighborhood: string;
  description: string;
  requiresSignature: boolean;
  requiresColdChain: boolean;
  estimatedDeliveryTime?: string;
  trackingNumber?: string;
  courierName?: string;
  totalCost: number;
  paymentMethod: "consultorio" | "paciente";
  createdAt: string;
  notes?: string;
}

interface Courier {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  completedShipments: number;
  isActive: boolean;
}

interface CoverageZone {
  id: string;
  name: string;
  neighborhoods: string[];
  baseCost: number;
  estimatedTime: number;
  isActive: boolean;
}

// Mock Data
const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: "ENV-001",
    type: "receta",
    priority: "urgent",
    provider: "pedidosya",
    status: "in-transit",
    patientName: "Juan Pérez",
    patientPhone: "+54 11 1234-5678",
    destinationAddress: "Av. Santa Fe 1234, Piso 5, Depto B",
    destinationNeighborhood: "Palermo",
    description: "Receta médica + Orden de estudios",
    requiresSignature: true,
    requiresColdChain: false,
    estimatedDeliveryTime: "15 min",
    trackingNumber: "PY-2024-12345",
    courierName: "Mario González",
    totalCost: 800,
    paymentMethod: "consultorio",
    createdAt: "2024-12-04 10:30",
  },
  {
    id: "ENV-002",
    type: "resultados",
    priority: "express",
    provider: "pedidosya",
    status: "pending",
    patientName: "María García",
    patientPhone: "+54 11 2345-6789",
    destinationAddress: "Cabildo 2500, Planta Baja",
    destinationNeighborhood: "Belgrano",
    description: "Resultados de laboratorio",
    requiresSignature: true,
    requiresColdChain: false,
    totalCost: 500,
    paymentMethod: "paciente",
    createdAt: "2024-12-04 11:15",
  },
  {
    id: "ENV-003",
    type: "muestras",
    priority: "urgent",
    provider: "cadeteria-propia",
    status: "picked-up",
    patientName: "Carlos López",
    patientPhone: "+54 11 3456-7890",
    destinationAddress: "Laboratorio Central - Libertador 4500",
    destinationNeighborhood: "Núñez",
    description: "Muestras de sangre - Requiere cadena de frío",
    requiresSignature: true,
    requiresColdChain: true,
    estimatedDeliveryTime: "20 min",
    courierName: "Ana Martínez",
    totalCost: 1200,
    paymentMethod: "consultorio",
    createdAt: "2024-12-04 09:45",
  },
  {
    id: "ENV-004",
    type: "certificado",
    priority: "normal",
    provider: "andreani",
    status: "delivered",
    patientName: "Laura Fernández",
    patientPhone: "+54 11 4567-8901",
    destinationAddress: "Corrientes 1500, Of. 302",
    destinationNeighborhood: "Recoleta",
    description: "Certificado médico para empleador",
    requiresSignature: true,
    requiresColdChain: false,
    totalCost: 350,
    paymentMethod: "paciente",
    createdAt: "2024-12-04 08:00",
  },
  {
    id: "ENV-005",
    type: "orden-estudios",
    priority: "normal",
    provider: "correo-argentino",
    status: "assigned",
    patientName: "Roberto Díaz",
    patientPhone: "+54 11 5678-9012",
    destinationAddress: "Callao 800, 2do piso",
    destinationNeighborhood: "Balvanera",
    description: "Orden de resonancia magnética",
    requiresSignature: false,
    requiresColdChain: false,
    estimatedDeliveryTime: "60 min",
    totalCost: 300,
    paymentMethod: "consultorio",
    createdAt: "2024-12-04 10:00",
  },
  {
    id: "ENV-006",
    type: "documentacion",
    priority: "express",
    provider: "oca",
    status: "failed",
    patientName: "Silvia Romero",
    patientPhone: "+54 11 6789-0123",
    destinationAddress: "Rivadavia 3000",
    destinationNeighborhood: "Caballito",
    description: "Historia clínica para segunda opinión",
    requiresSignature: true,
    requiresColdChain: false,
    totalCost: 450,
    paymentMethod: "paciente",
    createdAt: "2024-12-03 16:30",
    notes: "Dirección incorrecta - Paciente no estaba",
  },
];

const MOCK_COURIERS: Courier[] = [
  {
    id: "C001",
    name: "PedidosYa",
    phone: "0810-222-2222",
    vehicle: "Moto",
    rating: 4.8,
    completedShipments: 1247,
    isActive: true,
  },
  {
    id: "C002",
    name: "Cadetería Propia",
    phone: "+54 11 9999-8888",
    vehicle: "Auto",
    rating: 4.9,
    completedShipments: 563,
    isActive: true,
  },
  {
    id: "C003",
    name: "Andreani",
    phone: "0810-122-1222",
    vehicle: "Camioneta",
    rating: 4.5,
    completedShipments: 892,
    isActive: true,
  },
  {
    id: "C004",
    name: "Correo Argentino",
    phone: "0810-333-3333",
    vehicle: "Moto",
    rating: 4.2,
    completedShipments: 345,
    isActive: true,
  },
];

const MOCK_ZONES: CoverageZone[] = [
  {
    id: "Z001",
    name: "Zona Norte Premium",
    neighborhoods: ["Palermo", "Belgrano", "Núñez", "Recoleta"],
    baseCost: 400,
    estimatedTime: 30,
    isActive: true,
  },
  {
    id: "Z002",
    name: "Zona Centro",
    neighborhoods: ["Balvanera", "San Nicolás", "Monserrat", "Constitución"],
    baseCost: 300,
    estimatedTime: 45,
    isActive: true,
  },
  {
    id: "Z003",
    name: "Zona Oeste",
    neighborhoods: ["Caballito", "Flores", "Almagro", "Villa Crespo"],
    baseCost: 350,
    estimatedTime: 40,
    isActive: true,
  },
];

// Datos para gráficos
const STATS_LAST_30_DAYS = [
  { date: "05/11", envios: 12 },
  { date: "08/11", envios: 15 },
  { date: "11/11", envios: 18 },
  { date: "14/11", envios: 14 },
  { date: "17/11", envios: 20 },
  { date: "20/11", envios: 22 },
  { date: "23/11", envios: 19 },
  { date: "26/11", envios: 25 },
  { date: "29/11", envios: 23 },
  { date: "02/12", envios: 27 },
  { date: "04/12", envios: 18 },
];

const PROVIDER_DISTRIBUTION = [
  { name: "PedidosYa", value: 45 },
  { name: "Cadetería Propia", value: 25 },
  { name: "Andreani", value: 15 },
  { name: "Correo", value: 10 },
  { name: "OCA", value: 5 },
];

const COLORS = ["#06b6d4", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

export default function EnviosPage() {
  const [shipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
  const [couriers, setCouriers] = useState<Courier[]>(MOCK_COURIERS);
  const [zones, setZones] = useState<CoverageZone[]>(MOCK_ZONES);
  const [showNewShipmentDialog, setShowNewShipmentDialog] = useState(false);
  const [showNewCourierDialog, setShowNewCourierDialog] = useState(false);
  const [showNewZoneDialog, setShowNewZoneDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form states
  const [newShipmentStep, setNewShipmentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<ShipmentType>("receta");
  const [selectedPriority, setSelectedPriority] = useState<ShipmentPriority>("normal");
  const [selectedProvider, setSelectedProvider] = useState<ShipmentProvider>("pedidosya");

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Stats
  const totalShipments = shipments.length;
  const inTransitShipments = shipments.filter(s => s.status === "in-transit").length;
  const todayShipments = shipments.filter(s => s.createdAt.startsWith("2024-12-04")).length;
  const monthlyRevenue = shipments.reduce((acc, s) => acc + s.totalCost, 0);

  // Filtered shipments
  const filteredShipments = shipments.filter(s => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (priorityFilter !== "all" && s.priority !== priorityFilter) return false;
    return true;
  });

  const getStatusBadge = (status: ShipmentStatus) => {
    const config = {
      pending: { label: "Pendiente", color: "bg-yellow-500" },
      assigned: { label: "Asignado", color: "bg-blue-500" },
      "picked-up": { label: "Retirado", color: "bg-purple-500" },
      "in-transit": { label: "En Camino", color: "bg-cyan-500" },
      delivered: { label: "Entregado", color: "bg-green-500" },
      failed: { label: "Falló", color: "bg-red-500" },
      cancelled: { label: "Cancelado", color: "bg-gray-500" },
    };
    return <Badge className={config[status].color}>{config[status].label}</Badge>;
  };

  const getPriorityBadge = (priority: ShipmentPriority) => {
    const config = {
      normal: { label: "Normal", color: "bg-gray-500" },
      express: { label: "Express", color: "bg-orange-500" },
      urgent: { label: "Urgente", color: "bg-red-500" },
    };
    return <Badge className={config[priority].color}>{config[priority].label}</Badge>;
  };

  const handleCreateShipment = async () => {
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Envío creado exitosamente", {
      description: "El envío ha sido asignado y notificado al paciente por WhatsApp",
    });
    setIsCreating(false);
    setShowNewShipmentDialog(false);
    setNewShipmentStep(1);
  };

  const handleCreateCourier = async () => {
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Cadetería agregada exitosamente");
    setIsCreating(false);
    setShowNewCourierDialog(false);
  };

  const handleCreateZone = async () => {
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Zona de cobertura creada exitosamente");
    setIsCreating(false);
    setShowNewZoneDialog(false);
  };

  const handleToggleCourier = (courierId: string) => {
    setCouriers(couriers.map(c => 
      c.id === courierId ? { ...c, isActive: !c.isActive } : c
    ));
    toast.success("Estado de cadetería actualizado");
  };

  const handleToggleZone = (zoneId: string) => {
    setZones(zones.map(z => 
      z.id === zoneId ? { ...z, isActive: !z.isActive } : z
    ));
    toast.success("Estado de zona actualizado");
  };

  const handleContactCourier = (phone: string, courierName: string) => {
    toast.success(`Abriendo WhatsApp con ${courierName}...`);
    // En producción: window.open(`https://wa.me/${phone.replace(/\D/g, "")}`)
  };

  const handleViewOnMap = () => {
    toast.info("Abriendo tracking en mapa...", {
      description: "Esta funcionalidad requiere integración con Google Maps",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            Gestión de Envíos
          </h1>
          <p className="text-muted-foreground">Coordina entregas médicas con PedidosYa y cadeterías</p>
        </div>
        <Badge className="bg-purple-500 text-white">PREMIUM</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Envíos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShipments}</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Camino</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inTransitShipments}</div>
            <p className="text-xs text-muted-foreground">Activos ahora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoy</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayShipments}</div>
            <p className="text-xs text-muted-foreground">Envíos despachados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Mensual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(monthlyRevenue / 1000).toFixed(1)}K</div>
            <p className="text-xs text-muted-foreground">Total gastado</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="envios" className="space-y-6">
        <TabsList>
          <TabsTrigger value="envios">
            <Package className="mr-2 h-4 w-4" />
            Envíos
          </TabsTrigger>
          <TabsTrigger value="tracking">
            <Navigation className="mr-2 h-4 w-4" />
            Tracking
          </TabsTrigger>
          <TabsTrigger value="cadeterias">
            <Truck className="mr-2 h-4 w-4" />
            Cadeterías
          </TabsTrigger>
          <TabsTrigger value="zonas">
            <MapPin className="mr-2 h-4 w-4" />
            Zonas
          </TabsTrigger>
          <TabsTrigger value="estadisticas">
            <TrendingUp className="mr-2 h-4 w-4" />
            Estadísticas
          </TabsTrigger>
        </TabsList>

        {/* Tab: Envíos */}
        <TabsContent value="envios" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Envíos</CardTitle>
                  <CardDescription>Todos los envíos médicos registrados</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="in-transit">En Camino</SelectItem>
                      <SelectItem value="delivered">Entregado</SelectItem>
                      <SelectItem value="failed">Falló</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setShowNewShipmentDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Envío
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    {/* Priority Indicator */}
                    <div className="flex h-full items-start pt-1">
                      {shipment.priority === "urgent" && <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                      {shipment.priority === "express" && <div className="h-2 w-2 rounded-full bg-orange-500" />}
                      {shipment.priority === "normal" && <div className="h-2 w-2 rounded-full bg-gray-400" />}
                    </div>

                    {/* Shipment Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{shipment.patientName}</h3>
                            {getPriorityBadge(shipment.priority)}
                            {getStatusBadge(shipment.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{shipment.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${shipment.totalCost}</p>
                          <p className="text-xs text-muted-foreground">
                            {shipment.paymentMethod === "consultorio" ? "Paga Consultorio" : "Paga Paciente"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{shipment.destinationNeighborhood}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          <span className="capitalize">{shipment.provider.replace("-", " ")}</span>
                        </div>
                        {shipment.estimatedDeliveryTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>ETA: {shipment.estimatedDeliveryTime}</span>
                          </div>
                        )}
                        {shipment.courierName && (
                          <div className="flex items-center gap-1">
                            <span>Cadete: {shipment.courierName}</span>
                          </div>
                        )}
                      </div>

                      {shipment.requiresColdChain && (
                        <Badge variant="outline" className="text-xs">
                          ❄️ Requiere Cadena de Frío
                        </Badge>
                      )}

                      {shipment.notes && (
                        <div className="flex items-start gap-2 rounded bg-amber-50 dark:bg-amber-950 p-2 text-xs">
                          <AlertCircle className="h-3 w-3 text-amber-600 shrink-0 mt-0.5" />
                          <span className="text-amber-900 dark:text-amber-100">{shipment.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1">
                      {(shipment.status === "in-transit" || shipment.status === "picked-up") && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleViewOnMap}
                        >
                          <Navigation className="h-4 w-4" />
                        </Button>
                      )}
                      {shipment.courierName && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleContactCourier(shipment.patientPhone, shipment.courierName!)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Tracking */}
        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tracking en Tiempo Real</CardTitle>
              <CardDescription>Mapa interactivo con envíos activos (Próximamente)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
                <div className="text-center space-y-3">
                  <Navigation className="h-16 w-16 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">Mapa de Tracking</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Visualización en tiempo real de envíos activos con Google Maps API.
                    Esta funcionalidad estará disponible en la integración backend.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Cadeterías */}
        <TabsContent value="cadeterias" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cadeterías y Proveedores</CardTitle>
                  <CardDescription>Gestiona tus proveedores de envío</CardDescription>
                </div>
                <Button onClick={() => setShowNewCourierDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Cadetería
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Vehículo</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Envíos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {couriers.map((courier) => (
                    <TableRow key={courier.id}>
                      <TableCell className="font-medium">{courier.name}</TableCell>
                      <TableCell>{courier.phone}</TableCell>
                      <TableCell>{courier.vehicle}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{courier.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{courier.completedShipments}</TableCell>
                      <TableCell>
                        <Badge className={courier.isActive ? "bg-green-500" : "bg-gray-500"}>
                          {courier.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleCourier(courier.id)}
                          >
                            {courier.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Zonas */}
        <TabsContent value="zonas" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Zonas de Cobertura</CardTitle>
                  <CardDescription>Define barrios y costos por zona</CardDescription>
                </div>
                <Button onClick={() => setShowNewZoneDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Zona
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {zones.map((zone) => (
                  <Card key={zone.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{zone.name}</CardTitle>
                        <Badge className={zone.isActive ? "bg-green-500" : "bg-gray-500"}>
                          {zone.isActive ? "Activa" : "Inactiva"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Barrios incluidos:</p>
                        <div className="flex flex-wrap gap-1">
                          {zone.neighborhoods.map((n, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {n}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-muted-foreground">Costo Base</p>
                          <p className="font-semibold">${zone.baseCost}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tiempo Est.</p>
                          <p className="font-semibold">{zone.estimatedTime} min</p>
                        </div>
                      </div>
                      <div className="flex gap-1 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleToggleZone(zone.id)}
                        >
                          {zone.isActive ? "Desactivar" : "Activar"}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Estadísticas */}
        <TabsContent value="estadisticas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Envíos Últimos 30 Días</CardTitle>
                <CardDescription>Evolución diaria de envíos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={STATS_LAST_30_DAYS}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="envios" stroke="#06b6d4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Proveedor</CardTitle>
                <CardDescription>Uso de cadeterías</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={PROVIDER_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {PROVIDER_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog: Nuevo Envío */}
      <Dialog open={showNewShipmentDialog} onOpenChange={setShowNewShipmentDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Envío Médico</DialogTitle>
            <DialogDescription>Paso {newShipmentStep} de 4</DialogDescription>
          </DialogHeader>

          {newShipmentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Tipo de Envío</Label>
                <Select value={selectedType} onValueChange={(v) => setSelectedType(v as ShipmentType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receta">📄 Receta Médica</SelectItem>
                    <SelectItem value="orden-estudios">🔬 Orden de Estudios</SelectItem>
                    <SelectItem value="certificado">📋 Certificado Médico</SelectItem>
                    <SelectItem value="resultados">📊 Resultados</SelectItem>
                    <SelectItem value="muestras">🧪 Muestras de Laboratorio</SelectItem>
                    <SelectItem value="documentacion">📁 Documentación</SelectItem>
                    <SelectItem value="otro">📦 Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Paciente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">Juan Pérez</SelectItem>
                    <SelectItem value="p2">María García</SelectItem>
                    <SelectItem value="p3">Carlos López</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Prioridad</Label>
                <Select value={selectedPriority} onValueChange={(v) => setSelectedPriority(v as ShipmentPriority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (60-90 min)</SelectItem>
                    <SelectItem value="express">Express (30-45 min) +$200</SelectItem>
                    <SelectItem value="urgent">Urgente (15-30 min) +$500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {newShipmentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label>Dirección de Destino</Label>
                <Input placeholder="Ej: Av. Santa Fe 1234, Piso 5, Depto B" />
              </div>
              <div>
                <Label>Barrio</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar barrio..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="palermo">Palermo</SelectItem>
                    <SelectItem value="belgrano">Belgrano</SelectItem>
                    <SelectItem value="recoleta">Recoleta</SelectItem>
                    <SelectItem value="caballito">Caballito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Notas de Entrega (Opcional)</Label>
                <Textarea placeholder="Ej: Timbre B, portero eléctrico..." rows={2} />
              </div>
            </div>
          )}

          {newShipmentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Descripción del Contenido</Label>
                <Textarea placeholder="Describe qué se está enviando..." rows={3} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="signature" />
                  <label htmlFor="signature" className="text-sm font-medium">
                    Requiere Firma del Receptor
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="coldchain" />
                  <label htmlFor="coldchain" className="text-sm font-medium">
                    Requiere Cadena de Frío (Muestras)
                  </label>
                </div>
              </div>
            </div>
          )}

          {newShipmentStep === 4 && (
            <div className="space-y-4">
              <div>
                <Label>Proveedor de Envío</Label>
                <Select value={selectedProvider} onValueChange={(v) => setSelectedProvider(v as ShipmentProvider)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pedidosya">🚚 PedidosYa (Recomendado)</SelectItem>
                    <SelectItem value="cadeteria-propia">🏍️ Cadetería Propia</SelectItem>
                    <SelectItem value="andreani">📦 Andreani</SelectItem>
                    <SelectItem value="correo-argentino">📮 Correo Argentino</SelectItem>
                    <SelectItem value="oca">🚐 OCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Costo Base:</span>
                      <span className="font-semibold">$400</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Prioridad ({selectedPriority}):</span>
                      <span className="font-semibold">
                        {selectedPriority === "urgent" ? "+$500" : selectedPriority === "express" ? "+$200" : "$0"}
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="text-lg font-bold">
                        ${400 + (selectedPriority === "urgent" ? 500 : selectedPriority === "express" ? 200 : 0)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Tiempo estimado: 30-45 min</p>
                  </div>
                </CardContent>
              </Card>

              <div>
                <Label>Método de Pago</Label>
                <Select defaultValue="consultorio">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultorio">Paga el Consultorio</SelectItem>
                    <SelectItem value="paciente">Paga el Paciente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setNewShipmentStep(Math.max(1, newShipmentStep - 1))}
              disabled={newShipmentStep === 1}
            >
              Anterior
            </Button>
            {newShipmentStep < 4 ? (
              <Button onClick={() => setNewShipmentStep(newShipmentStep + 1)}>
                Siguiente
              </Button>
            ) : (
              <Button onClick={handleCreateShipment} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Confirmar y Despachar"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Nueva Cadetería */}
      <Dialog open={showNewCourierDialog} onOpenChange={setShowNewCourierDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Cadetería</DialogTitle>
            <DialogDescription>Nueva cadetería o proveedor de envío</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input placeholder="Ej: Rappi, Glovo, etc." />
            </div>
            <div>
              <Label>Teléfono</Label>
              <Input placeholder="+54 11 1234-5678" />
            </div>
            <div>
              <Label>Tipo de Vehículo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moto">🏍️ Moto</SelectItem>
                  <SelectItem value="auto">🚗 Auto</SelectItem>
                  <SelectItem value="bicicleta">🚲 Bicicleta</SelectItem>
                  <SelectItem value="camioneta">🚐 Camioneta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCourierDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateCourier} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Cadetería"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Nueva Zona */}
      <Dialog open={showNewZoneDialog} onOpenChange={setShowNewZoneDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Zona de Cobertura</DialogTitle>
            <DialogDescription>Define una zona con sus barrios y costos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nombre de la Zona</Label>
              <Input placeholder="Ej: Zona Norte Premium" />
            </div>
            <div>
              <Label>Barrios (separados por coma)</Label>
              <Textarea placeholder="Ej: Palermo, Belgrano, Núñez, Recoleta" rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Costo Base ($)</Label>
                <Input type="number" placeholder="400" />
              </div>
              <div>
                <Label>Tiempo Estimado (min)</Label>
                <Input type="number" placeholder="30" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewZoneDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateZone} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Zona"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
