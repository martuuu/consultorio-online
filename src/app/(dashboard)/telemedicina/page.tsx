"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Video, 
  Phone,
  Monitor,
  Users,
  Calendar,
  Clock,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  MessageSquare,
  FileText,
  Share2,
  Download,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock data
const UPCOMING_VIDEO_CALLS = [
  {
    id: 1,
    paciente: "María González",
    fecha: "2024-01-22",
    hora: "15:00",
    estado: "confirmada",
    duracion: 30,
  },
  {
    id: 2,
    paciente: "Carlos Rodríguez",
    fecha: "2024-01-22",
    hora: "16:00",
    estado: "pendiente",
    duracion: 30,
  },
  {
    id: 3,
    paciente: "Ana Martínez",
    fecha: "2024-01-23",
    hora: "10:00",
    estado: "confirmada",
    duracion: 45,
  },
];

const WAITING_ROOM = [
  {
    id: 1,
    paciente: "Jorge López",
    horaTurno: "14:30",
    esperando: "5 min",
    avatar: "JL",
  },
  {
    id: 2,
    paciente: "Laura Fernández",
    horaTurno: "14:45",
    esperando: "2 min",
    avatar: "LF",
  },
];

const RECENT_SESSIONS = [
  {
    id: 1,
    paciente: "María González",
    fecha: "2024-01-20",
    duracion: "28 min",
    grabacion: true,
    notas: true,
  },
  {
    id: 2,
    paciente: "Carlos Rodríguez",
    fecha: "2024-01-19",
    duracion: "35 min",
    grabacion: true,
    notas: true,
  },
  {
    id: 3,
    paciente: "Ana Martínez",
    fecha: "2024-01-18",
    duracion: "42 min",
    grabacion: false,
    notas: true,
  },
];

export default function TelemedicinaPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Telemedicina</h1>
          <p className="text-muted-foreground">Consultas por videollamada con calidad HD</p>
        </div>
        <Badge className="bg-amber-500 text-white">ENTERPRISE</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Hoy</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">2 pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sala de Espera</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Pacientes esperando</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Duración</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 min</div>
            <p className="text-xs text-muted-foreground">Por sesión</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sala" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sala">
            <Video className="mr-2 h-4 w-4" />
            Sala de Videollamada
          </TabsTrigger>
          <TabsTrigger value="espera">
            <Users className="mr-2 h-4 w-4" />
            Sala de Espera
          </TabsTrigger>
          <TabsTrigger value="agenda">
            <Calendar className="mr-2 h-4 w-4" />
            Agenda
          </TabsTrigger>
          <TabsTrigger value="historial">
            <FileText className="mr-2 h-4 w-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        {/* Sala de Videollamada */}
        <TabsContent value="sala" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sala de Videollamada Principal</CardTitle>
              <CardDescription>Consultas virtuales en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-slate-900 min-h-[500px] flex items-center justify-center relative overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                
                {/* Main Video Area */}
                <div className="relative z-10 text-center space-y-4 p-8">
                  <div className="flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-700">
                      <Video className="h-16 w-16 text-slate-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Sala de Videollamada</h3>
                    <p className="text-slate-400">No hay consulta activa en este momento</p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button className="bg-green-500 hover:bg-green-600 text-white" size="lg">
                      <Phone className="mr-2 h-5 w-5" />
                      Iniciar Próxima Consulta
                    </Button>
                  </div>
                </div>

                {/* Small Self Video Preview (Bottom Right) */}
                <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                  <div className="text-center">
                    <Monitor className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Tu cámara</p>
                  </div>
                </div>

                {/* Control Bar (Bottom Center) */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                  <Button size="icon" className="rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-slate-600">
                    <Mic className="h-5 w-5 text-white" />
                  </Button>
                  <Button size="icon" className="rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-slate-600">
                    <Video className="h-5 w-5 text-white" />
                  </Button>
                  <Button size="icon" className="rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-slate-600">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </Button>
                  <Button size="icon" className="rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-slate-600">
                    <Share2 className="h-5 w-5 text-white" />
                  </Button>
                  <Button size="icon" className="rounded-full bg-red-500 hover:bg-red-600">
                    <Phone className="h-5 w-5 text-white transform rotate-[135deg]" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Controles de Videollamada</CardTitle>
                <CardDescription>Configuración de audio y video</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Mic className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Micrófono</p>
                        <p className="text-xs text-muted-foreground">MacBook Pro Microphone</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Cámara</p>
                        <p className="text-xs text-muted-foreground">FaceTime HD Camera</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Calidad de Video</p>
                        <p className="text-xs text-muted-foreground">HD 720p</p>
                      </div>
                    </div>
                    <Select defaultValue="hd">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sd">SD</SelectItem>
                        <SelectItem value="hd">HD</SelectItem>
                        <SelectItem value="fhd">Full HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funciones Avanzadas</CardTitle>
                <CardDescription>Herramientas durante la consulta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Compartir HC</p>
                      <p className="text-xs text-muted-foreground">Mostrar historia clínica en pantalla</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Chat en Vivo</p>
                      <p className="text-xs text-muted-foreground">Mensajes de texto durante consulta</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Grabar Consulta</p>
                      <p className="text-xs text-muted-foreground">Con consentimiento del paciente</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                      <Share2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Compartir Pantalla</p>
                      <p className="text-xs text-muted-foreground">Mostrar documentos o imágenes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sala de Espera */}
        <TabsContent value="espera" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pacientes en Sala de Espera Virtual</CardTitle>
              <CardDescription>Esperando ser atendidos</CardDescription>
            </CardHeader>
            <CardContent>
              {WAITING_ROOM.length > 0 ? (
                <div className="space-y-4">
                  {WAITING_ROOM.map((paciente) => (
                    <div key={paciente.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
                          {paciente.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold">{paciente.paciente}</h3>
                          <div className="flex gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Turno: {paciente.horaTurno}
                            </span>
                            <span className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3 text-yellow-500" />
                              Esperando: {paciente.esperando}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Ver HC
                        </Button>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <Phone className="mr-2 h-4 w-4" />
                          Llamar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay pacientes esperando</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Sala de Espera</CardTitle>
                <CardDescription>Personalizar experiencia del paciente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Mensaje de Bienvenida</label>
                    <Input 
                      placeholder="Ej: Bienvenido! El médico lo atenderá en breve"
                      defaultValue="Por favor aguarde, será atendido en orden de llegada"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tiempo Máximo de Espera</label>
                    <Select defaultValue="15">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="20">20 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" className="w-full">
                    Guardar Configuración
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Espera</CardTitle>
                <CardDescription>Tiempos promedio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">Promedio de Espera</span>
                    <span className="text-lg font-bold">4 min</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">Máximo Hoy</span>
                    <span className="text-lg font-bold">8 min</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">Pacientes Atendidos</span>
                    <span className="text-lg font-bold">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Agenda */}
        <TabsContent value="agenda" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Próximas Videoconsultas</CardTitle>
                  <CardDescription>Turnos confirmados</CardDescription>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Video className="mr-2 h-4 w-4" />
                  Agendar Nueva
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {UPCOMING_VIDEO_CALLS.map((turno) => (
                  <div key={turno.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                        <span className="text-2xl font-bold">{new Date(turno.fecha).getDate()}</span>
                        <span className="text-xs text-muted-foreground uppercase">
                          {new Date(turno.fecha).toLocaleDateString('es-AR', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{turno.paciente}</h3>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {turno.hora}
                          </span>
                          <span>•</span>
                          <span>{turno.duracion} min</span>
                          <span>•</span>
                          <Badge 
                            variant={turno.estado === "confirmada" ? "default" : "outline"}
                            className={turno.estado === "confirmada" ? "bg-green-500 text-white" : ""}
                          >
                            {turno.estado === "confirmada" ? (
                              <><CheckCircle className="mr-1 h-3 w-3" />Confirmada</>
                            ) : (
                              <><Clock className="mr-1 h-3 w-3" />Pendiente</>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Ver HC
                      </Button>
                      <Button size="sm" variant="outline">
                        Enviar Link
                      </Button>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historial */}
        <TabsContent value="historial" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sesiones Recientes</CardTitle>
                  <CardDescription>Historial de videoconsultas</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Buscar paciente..." className="w-64" />
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_SESSIONS.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Video className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{session.paciente}</h3>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          <span>{new Date(session.fecha).toLocaleDateString('es-AR')}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.duracion}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        {session.grabacion && (
                          <Badge variant="outline" className="text-xs">
                            <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
                            Grabada
                          </Badge>
                        )}
                        {session.notas && (
                          <Badge variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            Con Notas
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {session.grabacion && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Este Mes</CardTitle>
                <CardDescription>Videoconsultas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">89</div>
                <p className="text-sm text-muted-foreground mt-2">+12% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duración Promedio</CardTitle>
                <CardDescription>Tiempo por sesión</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">32 min</div>
                <p className="text-sm text-muted-foreground mt-2">Dentro del rango esperado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfacción</CardTitle>
                <CardDescription>Puntuación promedio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">4.8/5</div>
                <p className="text-sm text-muted-foreground mt-2">Basado en 67 encuestas</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Acerca de la Telemedicina</CardTitle>
          <CardDescription>Funcionalidades y compatibilidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold">✅ Incluye:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Videollamadas HD con audio de alta calidad
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Sala de espera virtual personalizable
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Grabación de consultas con consentimiento
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Compartir pantalla y documentos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Chat en tiempo real durante la consulta
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Integración con historia clínica
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">🌐 Compatibilidad:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Navegadores: Chrome, Firefox, Safari, Edge</li>
                <li>• Dispositivos: PC, Mac, Tablet, Smartphone</li>
                <li>• Sin instalación requerida para pacientes</li>
                <li>• Encriptación end-to-end de video y audio</li>
                <li>• Cumple con HIPAA y Ley 25.326</li>
                <li>• Ancho de banda adaptativo (mínimo 1 Mbps)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
