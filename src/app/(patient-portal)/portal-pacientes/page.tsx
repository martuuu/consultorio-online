"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  LogOut,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Eye,
  Heart,
  Activity,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

// Mock data - Paciente actual
const CURRENT_PATIENT = {
  id: 1,
  firstName: "Juan",
  lastName: "Perez",
  email: "juan.perez@email.com",
  phone: "+54 11 1234-5678",
  dni: "35123456",
  birthDate: "1990-05-15",
  age: 34,
  bloodType: "O+",
  insuranceProvider: "OSDE",
  insuranceNumber: "2-3512345-6",
  avatar: "JP",
  address: "Av. Corrientes 1234, CABA"
};

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    date: "2025-12-05",
    time: "10:00",
    doctor: "Dr. Navarro",
    type: "Control de Rutina",
    status: "confirmed",
    location: "Consultorio 1"
  },
  {
    id: 2,
    date: "2025-12-10",
    time: "15:30",
    doctor: "Dra. Lopez",
    type: "Consulta General",
    status: "pending",
    location: "Consultorio 2"
  },
  {
    id: 3,
    date: "2025-11-28",
    time: "09:00",
    doctor: "Dr. Navarro",
    type: "Control",
    status: "completed",
    location: "Consultorio 1"
  },
  {
    id: 4,
    date: "2025-11-15",
    time: "16:00",
    doctor: "Dra. Lopez",
    type: "Primera Consulta",
    status: "absent",
    location: "Consultorio 2"
  },
];

const MOCK_DOCUMENTS = [
  {
    id: 1,
    type: "Receta Médica",
    date: "2025-11-28",
    doctor: "Dr. Navarro",
    description: "Ibuprofeno 400mg"
  },
  {
    id: 2,
    type: "Orden de Estudios",
    date: "2025-11-15",
    doctor: "Dr. Navarro",
    description: "Análisis de sangre completo"
  },
  {
    id: 3,
    type: "Certificado Médico",
    date: "2025-10-20",
    doctor: "Dra. Lopez",
    description: "Reposo por 3 días"
  },
];

const MOCK_VITAL_SIGNS = {
  weight: "82 kg",
  height: "175 cm",
  bloodPressure: "130/85 mmHg",
  heartRate: "72 bpm",
  lastUpdate: "28/11/2025"
};

export default function PortalPacientesPage() {
  const [selectedTab, setSelectedTab] = useState("home");

  const getStatusInfo = (status: string) => {
    switch(status) {
      case "confirmed":
        return { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950", label: "Confirmado" };
      case "pending":
        return { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950", label: "Pendiente" };
      case "completed":
        return { icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950", label: "Completado" };
      case "absent":
        return { icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950", label: "Ausente" };
      default:
        return { icon: Clock, color: "text-gray-500", bg: "bg-gray-50", label: "Desconocido" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Header diferenciado */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Mi Portal de Salud
              </h1>
              <p className="text-xs text-muted-foreground">Consultorio Light</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            <Avatar className="h-9 w-9 ring-2 ring-cyan-500/20">
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold">
                {CURRENT_PATIENT.avatar}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Welcome Banner */}
        <Card className="border-none shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          <CardContent className="relative p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  ¡Hola, {CURRENT_PATIENT.firstName}! 👋
                </h2>
                <p className="text-white/90 text-lg">
                  Bienvenido a tu portal personal de salud
                </p>
                <div className="flex items-center gap-6 mt-6 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Próximo turno: 5 de Diciembre</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>3 documentos disponibles</span>
                  </div>
                </div>
              </div>
              <Avatar className="h-20 w-20 ring-4 ring-white/30">
                <AvatarFallback className="bg-white text-cyan-600 text-2xl font-bold">
                  {CURRENT_PATIENT.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Consultas</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Próximos</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Documentos</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ausencias</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-900 shadow-md border">
            <TabsTrigger value="home" className="gap-2">
              <Activity className="h-4 w-4" />
              Inicio
            </TabsTrigger>
            <TabsTrigger value="appointments" className="gap-2">
              <Calendar className="h-4 w-4" />
              Mis Turnos
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="h-4 w-4" />
              Documentos
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Mi Perfil
            </TabsTrigger>
          </TabsList>

          {/* Inicio */}
          <TabsContent value="home" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Signos Vitales */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Signos Vitales
                  </CardTitle>
                  <CardDescription>Última actualización: {MOCK_VITAL_SIGNS.lastUpdate}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
                      <p className="text-sm text-muted-foreground mb-1">Peso</p>
                      <p className="text-2xl font-bold text-red-600">{MOCK_VITAL_SIGNS.weight}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                      <p className="text-sm text-muted-foreground mb-1">Altura</p>
                      <p className="text-2xl font-bold text-blue-600">{MOCK_VITAL_SIGNS.height}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
                      <p className="text-sm text-muted-foreground mb-1">Presión</p>
                      <p className="text-xl font-bold text-purple-600">{MOCK_VITAL_SIGNS.bloodPressure}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                      <p className="text-sm text-muted-foreground mb-1">Frecuencia</p>
                      <p className="text-xl font-bold text-green-600">{MOCK_VITAL_SIGNS.heartRate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Próximo Turno */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cyan-600" />
                    Próximo Turno
                  </CardTitle>
                  <CardDescription>Tu próxima cita programada</CardDescription>
                </CardHeader>
                <CardContent>
                  {MOCK_APPOINTMENTS.filter(a => a.status === "confirmed" || a.status === "pending")[0] && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                          <div className="text-center">
                            <p className="text-2xl font-bold">05</p>
                            <p className="text-xs">DIC</p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{MOCK_APPOINTMENTS[0].type}</p>
                          <p className="text-sm text-muted-foreground">con {MOCK_APPOINTMENTS[0].doctor}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {MOCK_APPOINTMENTS[0].time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {MOCK_APPOINTMENTS[0].location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                          Confirmar Asistencia
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Reprogramar
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Documentos Recientes */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Documentos Recientes</CardTitle>
                  <Button variant="ghost" size="sm">Ver todos</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {MOCK_DOCUMENTS.slice(0, 3).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.type}</p>
                          <p className="text-sm text-muted-foreground">{doc.doctor} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mis Turnos */}
          <TabsContent value="appointments" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Historial de Turnos</CardTitle>
                    <CardDescription>Todos tus turnos programados y pasados</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Solicitar Turno
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {MOCK_APPOINTMENTS.map((appointment) => {
                    const statusInfo = getStatusInfo(appointment.status);
                    const StatusIcon = statusInfo.icon;

                    return (
                      <div key={appointment.id} className={`flex items-center justify-between p-4 rounded-lg border-2 ${statusInfo.bg} transition-all duration-300 hover:shadow-md`}>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-md">
                              <div className="text-center">
                                <p className="text-2xl font-bold">{new Date(appointment.date).getDate()}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(appointment.date).toLocaleDateString('es-AR', { month: 'short' }).toUpperCase()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-lg">{appointment.type}</p>
                            <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                            <div className="flex items-center gap-3 mt-1 text-sm">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {appointment.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {appointment.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${statusInfo.color} border-0`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                          {(appointment.status === "confirmed" || appointment.status === "pending") && (
                            <Button size="sm" variant="outline">Cancelar</Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {MOCK_APPOINTMENTS.some(a => a.status === "absent") && (
              <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 dark:text-red-300">Aviso de Ausencia</p>
                      <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                        Registramos que no asististe a algunos turnos programados. Por favor, intenta avisar con anticipación si no puedes asistir para liberar el horario para otros pacientes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Documentos */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Mis Documentos Médicos</CardTitle>
                <CardDescription>Recetas, órdenes y certificados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {MOCK_DOCUMENTS.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <Badge variant="outline">{doc.date}</Badge>
                        </div>
                        <h3 className="font-semibold mb-1">{doc.type}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{doc.doctor}</p>
                        <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="mr-1 h-3 w-3" />
                            Ver
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="mr-1 h-3 w-3" />
                            Descargar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mi Perfil */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Tus datos personales y de contacto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center mb-6">
                    <Avatar className="h-24 w-24 ring-4 ring-cyan-500/20">
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-3xl font-bold">
                        {CURRENT_PATIENT.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Nombre Completo</p>
                        <p className="font-medium">{CURRENT_PATIENT.firstName} {CURRENT_PATIENT.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{CURRENT_PATIENT.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Teléfono</p>
                        <p className="font-medium">{CURRENT_PATIENT.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Dirección</p>
                        <p className="font-medium">{CURRENT_PATIENT.address}</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">Editar Información</Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Datos Médicos</CardTitle>
                  <CardDescription>Información clínica relevante</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">DNI</p>
                      <p className="font-semibold">{CURRENT_PATIENT.dni}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Edad</p>
                      <p className="font-semibold">{CURRENT_PATIENT.age} años</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Grupo Sanguíneo</p>
                      <p className="font-semibold">{CURRENT_PATIENT.bloodType}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Fecha Nac.</p>
                      <p className="font-semibold">{new Date(CURRENT_PATIENT.birthDate).toLocaleDateString('es-AR')}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
                    <p className="text-sm text-muted-foreground mb-1">Obra Social / Prepaga</p>
                    <p className="font-semibold text-lg">{CURRENT_PATIENT.insuranceProvider}</p>
                    <p className="text-sm text-muted-foreground mt-1">N° {CURRENT_PATIENT.insuranceNumber}</p>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pagar Consulta
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Configuración de Cuenta</CardTitle>
                <CardDescription>Preferencias y seguridad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Notificaciones por Email</p>
                    <p className="text-sm text-muted-foreground">Recibir recordatorios de turnos</p>
                  </div>
                  <Button variant="outline" size="sm">Activar</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Recordatorios por WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Mensajes 24hs antes del turno</p>
                  </div>
                  <Button variant="outline" size="sm">Activar</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Cambiar Contraseña</p>
                    <p className="text-sm text-muted-foreground">Actualiza tu contraseña de acceso</p>
                  </div>
                  <Button variant="outline" size="sm">Cambiar</Button>
                </div>
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
