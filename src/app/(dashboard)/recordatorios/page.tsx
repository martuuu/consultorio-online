"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Bell, Clock, CheckCircle, AlertCircle, Calendar, Send, Settings } from "lucide-react";

// Mock data
const MOCK_REMINDERS = [
  {
    id: 1,
    type: "pre-appointment",
    title: "Recordatorio 24hs antes",
    schedule: "24 horas antes del turno",
    channel: "WhatsApp",
    status: "active",
    sent: 156,
  },
  {
    id: 2,
    type: "confirmation",
    title: "Confirmación de turno",
    schedule: "Inmediato al agendar",
    channel: "SMS",
    status: "active",
    sent: 89,
  },
  {
    id: 3,
    type: "post-consultation",
    title: "Seguimiento post-consulta",
    schedule: "48 horas después de consulta",
    channel: "Email",
    status: "active",
    sent: 42,
  },
  {
    id: 4,
    type: "pending-studies",
    title: "Estudios pendientes",
    schedule: "7 días después sin resultados",
    channel: "WhatsApp",
    status: "paused",
    sent: 12,
  },
];

const REMINDER_TEMPLATES = [
  {
    id: 1,
    name: "Recordatorio 24hs",
    content: "Hola {nombre}, te recordamos tu turno mañana {fecha} a las {hora} con {medico}. Consultorio: {direccion}",
    variables: ["nombre", "fecha", "hora", "medico", "direccion"],
  },
  {
    id: 2,
    name: "Recordatorio 2hs",
    content: "¡Hola {nombre}! Tu consulta es en 2 horas ({hora}). Te esperamos en {direccion}",
    variables: ["nombre", "hora", "direccion"],
  },
  {
    id: 3,
    name: "Control en 6 meses",
    content: "Hola {nombre}, recordamos que debes realizar un control en 6 meses. Comunicate para agendar tu turno.",
    variables: ["nombre"],
  },
];

const LOGS = [
  { id: 1, patient: "Juan Perez", type: "Pre-turno", date: "2025-12-02 09:00", status: "delivered" },
  { id: 2, patient: "Maria Garcia", type: "Confirmación", date: "2025-12-02 10:30", status: "delivered" },
  { id: 3, patient: "Carlos Lopez", type: "Seguimiento", date: "2025-12-01 15:00", status: "read" },
  { id: 4, patient: "Laura Martinez", type: "Pre-turno", date: "2025-12-01 11:00", status: "failed" },
];

export default function RecordatoriosPage() {
  const [selectedReminder, setSelectedReminder] = useState("");

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recordatorios Automáticos</h1>
          <p className="text-muted-foreground">Reduce el ausentismo hasta 40% con recordatorios inteligentes</p>
        </div>
        <Badge className="bg-purple-500 text-white">PREMIUM</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recordatorios Enviados</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">299</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Entrega</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2.1%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reducción Ausentismo</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <p className="text-xs text-muted-foreground">Desde activación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 pausado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reminders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reminders">
            <Bell className="mr-2 h-4 w-4" />
            Recordatorios
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Settings className="mr-2 h-4 w-4" />
            Plantillas
          </TabsTrigger>
          <TabsTrigger value="logs">
            <Clock className="mr-2 h-4 w-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        {/* Recordatorios */}
        <TabsContent value="reminders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recordatorios Configurados</CardTitle>
                  <CardDescription>Gestiona los recordatorios automáticos de tu consultorio</CardDescription>
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  <Bell className="mr-2 h-4 w-4" />
                  Nuevo Recordatorio
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_REMINDERS.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                        reminder.status === "active" ? "bg-purple-500/10" : "bg-muted"
                      }`}>
                        <Bell className={`h-6 w-6 ${reminder.status === "active" ? "text-purple-500" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{reminder.title}</p>
                          <Badge variant={reminder.status === "active" ? "default" : "secondary"} className="text-xs">
                            {reminder.status === "active" ? "Activo" : "Pausado"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {reminder.schedule} · {reminder.channel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{reminder.sent} enviados</p>
                        <p className="text-xs text-muted-foreground">Este mes</p>
                      </div>
                      <Switch checked={reminder.status === "active"} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Crear Recordatorio */}
          <Card>
            <CardHeader>
              <CardTitle>Configurar Nuevo Recordatorio</CardTitle>
              <CardDescription>Define cuándo y cómo enviar recordatorios automáticos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nombre del Recordatorio</Label>
                  <Input placeholder="Ej: Recordatorio 48hs antes" />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Recordatorio</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-appointment">Pre-turno</SelectItem>
                      <SelectItem value="confirmation">Confirmación</SelectItem>
                      <SelectItem value="post-consultation">Post-consulta</SelectItem>
                      <SelectItem value="follow-up">Seguimiento</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Cuándo Enviar</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar momento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2h">2 horas antes</SelectItem>
                      <SelectItem value="24h">24 horas antes</SelectItem>
                      <SelectItem value="48h">48 horas antes</SelectItem>
                      <SelectItem value="7d">7 días después</SelectItem>
                      <SelectItem value="30d">30 días después</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Canal de Envío</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mensaje</Label>
                <Textarea 
                  placeholder="Escribe el mensaje que se enviará..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Variables disponibles: {"{nombre}"}, {"{fecha}"}, {"{hora}"}, {"{medico}"}, {"{direccion}"}
                </p>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Activar recordatorio</p>
                  <p className="text-sm text-muted-foreground">Comienza a enviar automáticamente</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Guardar Recordatorio
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plantillas */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {REMINDER_TEMPLATES.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">Plantilla</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.variables.map((variable) => (
                      <Badge key={variable} variant="secondary" className="text-xs">
                        {"{" + variable + "}"}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Editar</Button>
                    <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600">Usar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Variables Dinámicas Disponibles</CardTitle>
              <CardDescription>Usa estas variables en tus mensajes para personalizarlos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{"{nombre}"}</span>
                    <span className="text-xs text-muted-foreground">Nombre del paciente</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{"{fecha}"}</span>
                    <span className="text-xs text-muted-foreground">Fecha del turno</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{"{hora}"}</span>
                    <span className="text-xs text-muted-foreground">Hora del turno</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{"{medico}"}</span>
                    <span className="text-xs text-muted-foreground">Nombre del médico</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{"{direccion}"}</span>
                    <span className="text-xs text-muted-foreground">Dirección consultorio</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm font-medium">{"{sala}"}</span>
                    <span className="text-xs text-muted-foreground">Nombre de la sala</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historial */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Envíos</CardTitle>
              <CardDescription>Registro de todos los recordatorios enviados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {LOGS.map((log) => (
                  <div key={log.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        log.status === "delivered" ? "bg-green-500/10" :
                        log.status === "read" ? "bg-blue-500/10" :
                        "bg-red-500/10"
                      }`}>
                        {log.status === "delivered" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {log.status === "read" && <CheckCircle className="h-5 w-5 text-blue-500" />}
                        {log.status === "failed" && <AlertCircle className="h-5 w-5 text-red-500" />}
                      </div>
                      <div>
                        <p className="font-medium">{log.patient}</p>
                        <p className="text-sm text-muted-foreground">{log.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{log.date}</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          log.status === "delivered" ? "border-green-500 text-green-500" :
                          log.status === "read" ? "border-blue-500 text-blue-500" :
                          "border-red-500 text-red-500"
                        }`}
                      >
                        {log.status === "delivered" ? "Entregado" :
                         log.status === "read" ? "Leído" : "Fallido"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
