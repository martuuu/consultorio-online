"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Home,
  MapPin,
  Clock,
  Navigation,
  Route,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Phone,
  MessageSquare,
  Car,
  Package,
  Stethoscope,
  Syringe,
  Heart,
  Activity,
} from "lucide-react";

// Tipos de profesionales y sus configuraciones
const PROFESSIONAL_TYPES = [
  {
    id: "kinesiologo",
    name: "Kinesiólogo / Fisioterapeuta",
    icon: Activity,
    color: "bg-blue-500",
    defaultDuration: 60,
    travelBuffer: 30,
    requiresEquipment: true,
    description: "Sesiones de 45-60 min. Llevan equipos (magneto, ultrasonido). Necesitan buffer de carga/descarga.",
  },
  {
    id: "enfermeria",
    name: "Enfermería (Inyectables/Curaciones)",
    icon: Syringe,
    color: "bg-red-500",
    defaultDuration: 15,
    travelBuffer: 15,
    requiresEquipment: false,
    description: "Visitas cortas (15 min) pero muchas al día. Ruteo inteligente crítico para eficiencia.",
  },
  {
    id: "medico",
    name: "Médico Clínico / Pediatra",
    icon: Stethoscope,
    color: "bg-green-500",
    defaultDuration: 40,
    travelBuffer: 20,
    requiresEquipment: false,
    description: "Consultas estándar con alta incertidumbre de tiempo. Alertas de demora importantes.",
  },
  {
    id: "fonoaudiologo",
    name: "Fonoaudiólogo / Terapista Ocupacional",
    icon: Heart,
    color: "bg-purple-500",
    defaultDuration: 60,
    travelBuffer: 20,
    requiresEquipment: true,
    description: "Tratamientos largos y recurrentes. Agendamiento recurrente esencial.",
  },
  {
    id: "extraccionista",
    name: "Extraccionista (Laboratorio)",
    icon: Package,
    color: "bg-orange-500",
    defaultDuration: 10,
    travelBuffer: 15,
    requiresEquipment: true,
    description: "Ventana horaria estricta (7-10 AM). Rutas optimizadas son críticas.",
  },
];

// Zonas de cobertura mock
const MOCK_COVERAGE_ZONES = [
  { id: "1", name: "Palermo", postalCodes: ["1414", "1425", "1426"], radiusKm: 5, isActive: true },
  { id: "2", name: "Belgrano", postalCodes: ["1428", "1429"], radiusKm: 5, isActive: true },
  { id: "3", name: "Recoleta", postalCodes: ["1011", "1013", "1425"], radiusKm: 3, isActive: false },
];

// Turnos domiciliarios mock
const MOCK_HOME_VISITS = [
  {
    id: "1",
    patientName: "María González",
    address: "Av. Santa Fe 3421, Piso 5, Depto B",
    phone: "+54 9 11 5555-1234",
    lat: -34.5945,
    lng: -58.4020,
    time: "10:00",
    duration: 60,
    status: "pending",
    professionalType: "kinesiologo",
    floor: "5",
    bell: "5B - González",
    notes: "Paciente con movilidad reducida. Llevar camilla portátil.",
  },
  {
    id: "2",
    patientName: "Roberto Pérez",
    address: "Cerviño 4255, Casa",
    phone: "+54 9 11 5555-5678",
    lat: -34.5789,
    lng: -58.4156,
    time: "11:30",
    duration: 15,
    status: "on_way",
    professionalType: "enfermeria",
    notes: "Aplicar insulina. Traer jeringas nuevas.",
  },
  {
    id: "3",
    patientName: "Laura Martínez",
    address: "Las Heras 2890, Piso 2, Depto A",
    phone: "+54 9 11 5555-9012",
    lat: -34.5901,
    lng: -58.4001,
    time: "14:00",
    duration: 40,
    status: "completed",
    professionalType: "medico",
    floor: "2",
    bell: "2A",
    notes: "Control post-operatorio. Revisar puntos.",
  },
];

// Estadísticas mock
const MOCK_STATS = {
  todayVisits: 8,
  completedVisits: 3,
  averageTravelTime: 22,
  totalKmToday: 45,
  onTimePercentage: 87,
};

export default function AmbulatoriosPage() {
  const [selectedProfessionalType, setSelectedProfessionalType] = useState(PROFESSIONAL_TYPES[0].id);
  const [coverageZones, setCoverageZones] = useState(MOCK_COVERAGE_ZONES);
  const [homeVisits] = useState(MOCK_HOME_VISITS);
  const [showNewZoneDialog, setShowNewZoneDialog] = useState(false);
  const [showNewVisitDialog, setShowNewVisitDialog] = useState(false);

  const handleSendWhatsApp = (visit: typeof MOCK_HOME_VISITS[0]) => {
    const message = encodeURIComponent(
      `Hola ${visit.patientName}, soy del consultorio. Estoy saliendo para tu domicilio. Llego en aproximadamente 20 minutos. Saludos!`
    );
    window.open(`https://wa.me/${visit.phone.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
    toast.success("WhatsApp abierto", {
      description: "Mensaje pre-cargado listo para enviar",
    });
  };

  const handleOpenMaps = (visit: typeof MOCK_HOME_VISITS[0]) => {
    const address = encodeURIComponent(visit.address);
    // Detectar sistema operativo para usar Waze o Google Maps
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Intentar abrir Waze primero en mobile
      window.open(`waze://?q=${address}`, "_blank");
      setTimeout(() => {
        // Fallback a Google Maps si Waze no está instalado
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, "_blank");
      }, 500);
    } else {
      // Desktop: Google Maps directo
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, "_blank");
    }
    toast.success("Navegación iniciada", {
      description: "Se abrió la aplicación de mapas",
    });
  };

  const handleMarkAsOnWay = () => {
    toast.success("Estado actualizado", {
      description: "Turno marcado como 'En Camino'",
    });
  };

  const handleMarkAsCompleted = () => {
    toast.success("Visita completada", {
      description: "Turno marcado como completado exitosamente",
    });
  };

  const handleToggleZone = (zoneId: string) => {
    setCoverageZones(zones =>
      zones.map(z => z.id === zoneId ? { ...z, isActive: !z.isActive } : z)
    );
    toast.success("Zona actualizada", {
      description: "Configuración de cobertura guardada",
    });
  };

  const handleCreateZone = () => {
    toast.success("Zona creada", {
      description: "Nueva zona de cobertura agregada",
    });
    setShowNewZoneDialog(false);
  };

  const selectedProfessional = PROFESSIONAL_TYPES.find(p => p.id === selectedProfessionalType);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Atención Domiciliaria</h1>
              <p className="text-sm text-muted-foreground">
                Gestión de visitas a domicilio con ruteo inteligente
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showNewVisitDialog} onOpenChange={setShowNewVisitDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Visita
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Programar Visita a Domicilio</DialogTitle>
                  <DialogDescription>
                    Complete los datos del paciente y la dirección del domicilio
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Paciente</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">María González</SelectItem>
                        <SelectItem value="2">Roberto Pérez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Fecha</Label>
                      <Input type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Hora</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Dirección</Label>
                    <Input placeholder="Ej: Av. Santa Fe 3421" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label>Piso</Label>
                      <Input placeholder="Ej: 5" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Depto</Label>
                      <Input placeholder="Ej: B" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Timbre</Label>
                      <Input placeholder="Ej: 5B" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Notas</Label>
                    <Input placeholder="Información adicional sobre la visita" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewVisitDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => {
                    toast.success("Visita programada", {
                      description: "La visita se agregó al calendario",
                    });
                    setShowNewVisitDialog(false);
                  }}>
                    Programar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitas Hoy</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.todayVisits}</div>
              <p className="text-xs text-muted-foreground">
                {MOCK_STATS.completedVisits} completadas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.averageTravelTime} min</div>
              <p className="text-xs text-muted-foreground">
                Tiempo entre visitas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Km Recorridos</CardTitle>
              <Route className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.totalKmToday} km</div>
              <p className="text-xs text-muted-foreground">
                Hoy
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Puntualidad</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.onTimePercentage}%</div>
              <p className="text-xs text-green-600">
                +5% vs. mes pasado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">En Ruta</div>
              <p className="text-xs text-muted-foreground">
                Próxima: 11:30 AM
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList>
            <TabsTrigger value="today">Visitas de Hoy</TabsTrigger>
            <TabsTrigger value="zones">Zonas de Cobertura</TabsTrigger>
            <TabsTrigger value="config">Configuración</TabsTrigger>
            <TabsTrigger value="routing">
              Ruteo Inteligente
              <Badge className="ml-2 bg-purple-500" variant="secondary">PREMIUM</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Today's Visits */}
          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ruta de Hoy</CardTitle>
                <CardDescription>
                  Visitas programadas en orden óptimo según ubicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {homeVisits.map((visit, index) => {
                    const professional = PROFESSIONAL_TYPES.find(p => p.id === visit.professionalType);
                    const Icon = professional?.icon || Home;
                    
                    return (
                      <div
                        key={visit.id}
                        className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        {/* Order Number */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                          {index + 1}
                        </div>

                        {/* Visit Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{visit.patientName}</h3>
                                <Badge className={professional?.color}>
                                  <Icon className="mr-1 h-3 w-3" />
                                  {professional?.name}
                                </Badge>
                                <Badge
                                  variant={
                                    visit.status === "completed" ? "default" :
                                    visit.status === "on_way" ? "secondary" :
                                    "outline"
                                  }
                                >
                                  {visit.status === "completed" ? "✓ Completada" :
                                   visit.status === "on_way" ? "En Camino" :
                                   "Pendiente"}
                                </Badge>
                              </div>
                              <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {visit.time} - {visit.duration} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {visit.address}
                                </span>
                              </div>
                              {visit.floor && (
                                <p className="text-sm text-muted-foreground">
                                  Piso {visit.floor} - Timbre: {visit.bell}
                                </p>
                              )}
                              {visit.notes && (
                                <p className="text-sm text-muted-foreground italic">
                                  📝 {visit.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenMaps(visit)}
                            >
                              <Navigation className="mr-2 h-4 w-4" />
                              Ir con Waze/Maps
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendWhatsApp(visit)}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Avisar Llegada
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`tel:${visit.phone}`)}
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Llamar
                            </Button>
                            {visit.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={handleMarkAsOnWay}
                              >
                                <Car className="mr-2 h-4 w-4" />
                                En Camino
                              </Button>
                            )}
                            {visit.status === "on_way" && (
                              <Button
                                size="sm"
                                onClick={handleMarkAsCompleted}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Completar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coverage Zones */}
          <TabsContent value="zones" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Zonas de Cobertura</CardTitle>
                    <CardDescription>
                      Define las áreas donde realizas visitas domiciliarias
                    </CardDescription>
                  </div>
                  <Dialog open={showNewZoneDialog} onOpenChange={setShowNewZoneDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Zona
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nueva Zona de Cobertura</DialogTitle>
                        <DialogDescription>
                          Define una nueva zona donde realizas visitas
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Nombre de la Zona</Label>
                          <Input placeholder="Ej: Palermo" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Códigos Postales (separados por coma)</Label>
                          <Input placeholder="Ej: 1414, 1425, 1426" />
                        </div>
                        <div className="grid gap-2">
                          <Label>Radio de Cobertura (km)</Label>
                          <Input type="number" placeholder="5" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowNewZoneDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateZone}>
                          Crear Zona
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coverageZones.map((zone) => (
                    <div key={zone.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-semibold">{zone.name}</h3>
                          {zone.isActive ? (
                            <Badge variant="default">Activa</Badge>
                          ) : (
                            <Badge variant="outline">Inactiva</Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          CP: {zone.postalCodes.join(", ")} • Radio: {zone.radiusKm} km
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={zone.isActive}
                          onCheckedChange={() => handleToggleZone(zone.id)}
                        />
                        <Button size="sm" variant="ghost">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                        Validación Automática
                      </h4>
                      <p className="mt-1 text-sm text-orange-800 dark:text-orange-200">
                        Cuando un paciente solicita turno a domicilio, el sistema validará automáticamente
                        que su dirección esté dentro de alguna zona activa. Si no es así, se mostrará un
                        mensaje informando que no se llega a esa ubicación.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration */}
          <TabsContent value="config" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tipo de Profesional</CardTitle>
                <CardDescription>
                  Selecciona tu especialidad para configurar tiempos y equipamiento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {PROFESSIONAL_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedProfessionalType === type.id;
                    
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedProfessionalType(type.id)}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-colors",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div className={cn("rounded-lg p-2", type.color)}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="font-semibold">{type.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                        <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                          <span>⏱ Duración: {type.defaultDuration}min</span>
                          <span>🚗 Viaje: {type.travelBuffer}min</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedProfessional && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-semibold">Configuración Específica</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label>Duración Consulta (minutos)</Label>
                          <Input
                            type="number"
                            defaultValue={selectedProfessional.defaultDuration}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Buffer de Traslado (minutos)</Label>
                          <Input
                            type="number"
                            defaultValue={selectedProfessional.travelBuffer}
                          />
                          <p className="text-xs text-muted-foreground">
                            Tiempo adicional entre turnos para viajar
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label>Requiere Equipamiento</Label>
                          <p className="text-sm text-muted-foreground">
                            Agregar tiempo extra para carga/descarga de equipos
                          </p>
                        </div>
                        <Switch defaultChecked={selectedProfessional.requiresEquipment} />
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label>Alertas de Demora</Label>
                          <p className="text-sm text-muted-foreground">
                            Notificar automáticamente al siguiente paciente si hay retraso
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Button className="w-full" onClick={() => {
                        toast.success("Configuración guardada", {
                          description: "Los cambios se aplicarán a nuevos turnos",
                        });
                      }}>
                        Guardar Configuración
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Routing (Premium Feature) */}
          <TabsContent value="routing" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ruteo Inteligente</CardTitle>
                    <CardDescription>
                      Optimización automática de rutas con IA
                    </CardDescription>
                  </div>
                  <Badge className="bg-purple-500" variant="secondary">PREMIUM</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-8 text-center dark:border-purple-900 dark:bg-purple-950">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <Route className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Feature Premium</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    El ruteo inteligente reorganiza automáticamente los turnos del día para minimizar
                    la distancia recorrida, ahorrando tiempo y combustible.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Optimización con Google Maps Route API</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Ahorro promedio de 30% en tiempo de viaje</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Actualización en tiempo real con tráfico</span>
                    </div>
                  </div>
                  <Button className="mt-6" size="lg">
                    Actualizar a Premium
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Otras Features Premium</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Check-in con Geolocalización</h4>
                    <p className="text-sm text-muted-foreground">
                      Validación por GPS que confirma que el profesional llegó al domicilio
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                    <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Historia Clínica Offline (PWA)</h4>
                    <p className="text-sm text-muted-foreground">
                      Registra evoluciones sin internet y sincroniza automáticamente
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                    <Edit2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Firma Digital del Paciente</h4>
                    <p className="text-sm text-muted-foreground">
                      El paciente firma en el celular para dar conformidad de la prestación
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
