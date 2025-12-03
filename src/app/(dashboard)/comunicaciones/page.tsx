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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Mail, Phone, Send, Clock, CheckCheck, Users, Search } from "lucide-react";

// Mock data
const MOCK_MESSAGES = [
  {
    id: 1,
    patientName: "Juan Perez",
    channel: "WhatsApp",
    message: "Recordatorio: Turno mañana 10:00hs",
    date: "2025-12-02 09:00",
    status: "Entregado",
  },
  {
    id: 2,
    patientName: "Maria Garcia",
    channel: "Email",
    message: "Resultados de análisis disponibles",
    date: "2025-12-01 15:30",
    status: "Leído",
  },
  {
    id: 3,
    patientName: "Carlos Lopez",
    channel: "SMS",
    message: "Confirmación de turno recibida",
    date: "2025-12-01 11:20",
    status: "Entregado",
  },
];

const MOCK_TEMPLATES = [
  { id: 1, name: "Recordatorio de Turno", content: "Hola {nombre}, te recordamos tu turno para el {fecha} a las {hora}. Consultorio: {direccion}" },
  { id: 2, name: "Confirmación de Turno", content: "Tu turno ha sido confirmado para el {fecha} a las {hora}. ¡Te esperamos!" },
  { id: 3, name: "Resultados Disponibles", content: "Hola {nombre}, tus resultados de estudios ya están disponibles. Podés retirarlos en el consultorio." },
  { id: 4, name: "Post-Consulta", content: "Gracias por tu visita. Recordá seguir las indicaciones y cualquier consulta, no dudes en contactarnos." },
];

const MOCK_TEAM_CHAT = [
  { id: 1, user: "Dr. Navarro", message: "¿Alguien sabe si llegó el paciente de las 11?", time: "10:55", avatar: "DN" },
  { id: 2, user: "Clara (Admin)", message: "Sí, está en sala de espera", time: "10:56", avatar: "CS" },
  { id: 3, user: "Dra. Lopez", message: "Necesito la historia clínica de María García urgente", time: "11:20", avatar: "AL" },
  { id: 4, user: "Dr. Navarro", message: "Ya te la comparto por el sistema", time: "11:22", avatar: "DN" },
];

export default function ComunicacionesPage() {
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comunicaciones</h1>
          <p className="text-muted-foreground">Gestiona WhatsApp, Email, SMS y Chat Interno</p>
        </div>
        <Badge className="bg-blue-500 text-white">PRO</Badge>
      </div>

      <Tabs defaultValue="send" className="space-y-6">
        <TabsList>
          <TabsTrigger value="send">
            <Send className="mr-2 h-4 w-4" />
            Enviar Mensaje
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" />
            Historial
          </TabsTrigger>
          <TabsTrigger value="templates">
            <MessageSquare className="mr-2 h-4 w-4" />
            Plantillas
          </TabsTrigger>
          <TabsTrigger value="chat">
            <Users className="mr-2 h-4 w-4" />
            Chat Interno
          </TabsTrigger>
        </TabsList>

        {/* Enviar Mensaje */}
        <TabsContent value="send" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Selector de Canal */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Canal de Envío</CardTitle>
                <CardDescription>Selecciona cómo quieres comunicarte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => setSelectedChannel("whatsapp")}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border ${
                    selectedChannel === "whatsapp" ? "border-green-500 bg-green-50" : "border-border"
                  } hover:bg-muted/50 transition-colors`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Mensajería instantánea</p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedChannel("email")}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border ${
                    selectedChannel === "email" ? "border-blue-500 bg-blue-50" : "border-border"
                  } hover:bg-muted/50 transition-colors`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Email</p>
                    <p className="text-xs text-muted-foreground">Correo electrónico</p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedChannel("sms")}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border ${
                    selectedChannel === "sms" ? "border-purple-500 bg-purple-50" : "border-border"
                  } hover:bg-muted/50 transition-colors`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500 text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">SMS</p>
                    <p className="text-xs text-muted-foreground">Mensaje de texto</p>
                  </div>
                </button>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Estadísticas del Mes</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>WhatsApp:</span>
                      <span className="font-semibold">156 enviados</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-semibold">89 enviados</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SMS:</span>
                      <span className="font-semibold">23 enviados</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulario */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Nuevo Mensaje</CardTitle>
                <CardDescription>Completa los datos y envía tu mensaje</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Destinatario</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Buscar paciente..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Juan Perez - +54 11 1234-5678</SelectItem>
                      <SelectItem value="2">Maria Garcia - +54 11 8765-4321</SelectItem>
                      <SelectItem value="3">Carlos Lopez - +54 11 5555-6666</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedChannel === "email" && (
                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto</Label>
                    <Input id="subject" placeholder="Asunto del email..." />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Escribe tu mensaje aquí..."
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground">
                    Variables disponibles: {"{nombre}"}, {"{fecha}"}, {"{hora}"}, {"{direccion}"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Usar Plantilla</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plantilla..." />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_TEMPLATES.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => alert("Borrador guardado exitosamente")}
                    title="Guarda el mensaje para enviarlo más tarde"
                  >
                    Guardar Borrador
                  </Button>
                  <Button 
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                    onClick={() => alert(`Mensaje enviado por ${selectedChannel === "whatsapp" ? "WhatsApp" : selectedChannel === "email" ? "Email" : "SMS"}`)}
                    title="Envía el mensaje inmediatamente"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Ahora
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => alert("Programar envío: Selecciona fecha y hora")}
                    title="Programa el envío para una fecha y hora específica"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Programar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Historial */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historial de Mensajes</CardTitle>
                  <CardDescription>Todos los mensajes enviados</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_MESSAGES.map((msg) => (
                  <div key={msg.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        msg.channel === "WhatsApp" ? "bg-green-500" :
                        msg.channel === "Email" ? "bg-blue-500" : "bg-purple-500"
                      } text-white`}>
                        {msg.channel === "WhatsApp" && <Phone className="h-5 w-5" />}
                        {msg.channel === "Email" && <Mail className="h-5 w-5" />}
                        {msg.channel === "SMS" && <MessageSquare className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{msg.patientName}</p>
                        <p className="text-sm text-muted-foreground">{msg.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{msg.date}</p>
                      <Badge variant="outline" className="text-xs">
                        <CheckCheck className="mr-1 h-3 w-3" />
                        {msg.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plantillas */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {MOCK_TEMPLATES.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">Plantilla</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.content}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => alert(`Editando plantilla: ${template.name}`)}
                      title="Modifica el contenido de esta plantilla"
                    >
                      Editar
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                      onClick={() => alert(`Plantilla "${template.name}" cargada en el editor`)}
                      title="Usa esta plantilla para enviar un mensaje"
                    >
                      Usar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Plantilla</CardTitle>
              <CardDescription>Guarda mensajes que usas frecuentemente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre de la Plantilla</Label>
                <Input placeholder="Ej: Recordatorio 48hs" />
              </div>
              <div className="space-y-2">
                <Label>Contenido</Label>
                <Textarea placeholder="Contenido del mensaje..." rows={4} />
              </div>
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => alert("Plantilla creada exitosamente")}
                title="Guarda esta plantilla para usarla en futuros mensajes"
              >
                Guardar Plantilla
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chat Interno del Equipo */}
        <TabsContent value="chat" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Lista de Conversaciones */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Equipo Médico</CardTitle>
                <CardDescription>Chat interno del consultorio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors bg-muted">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">GG</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">General</p>
                      <p className="text-xs text-muted-foreground">4 mensajes nuevos</p>
                    </div>
                    <Badge className="bg-primary">4</Badge>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar>
                      <AvatarFallback className="bg-blue-500 text-white">AL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">Dra. Lopez</p>
                      <p className="text-xs text-muted-foreground">Mensaje directo</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar>
                      <AvatarFallback className="bg-green-500 text-white">CS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">Clara (Admin)</p>
                      <p className="text-xs text-muted-foreground">Mensaje directo</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">GG</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">General</CardTitle>
                      <CardDescription>3 miembros online</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {MOCK_TEAM_CHAT.map((chat) => (
                      <div key={chat.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{chat.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <p className="font-semibold text-sm">{chat.user}</p>
                            <p className="text-xs text-muted-foreground">{chat.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{chat.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Input 
                    placeholder="Escribe un mensaje..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setNewMessage("");
                      }
                    }}
                  />
                  <Button size="icon" className="bg-blue-500 hover:bg-blue-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
