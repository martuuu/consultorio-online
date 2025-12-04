"use client";

import { useState, useEffect } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  MessageSquare, Mail, Phone, Send, Clock, CheckCheck, Users, Paperclip, 
  Calendar, Filter, Eye, Info, User, MapPin, FileText, AlertCircle, 
  Building, Edit, Plus, Save, Stethoscope 
} from "lucide-react";
import { toast } from "sonner";

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

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: string;
  avatar: string;
  isCurrentUser?: boolean;
}

const INITIAL_MOCK_CHAT: ChatMessage[] = [
  { id: "1", user: "Dr. Navarro", message: "¿Alguien sabe si llegó el paciente de las 11?", time: "10:55", avatar: "DN" },
  { id: "2", user: "Clara (Admin)", message: "Sí, está en sala de espera", time: "10:56", avatar: "CS" },
  { id: "3", user: "Dra. Lopez", message: "Necesito la historia clínica de María García urgente", time: "11:20", avatar: "AL" },
  { id: "4", user: "Dr. Navarro", message: "Ya te la comparto por el sistema", time: "11:22", avatar: "DN" },
];

// Enviar notificación al header
const sendNotification = (title: string, message: string, link?: string) => {
  const notification = {
    id: Date.now().toString(),
    type: "chat" as const,
    title,
    message,
    timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    read: false,
    link
  };

  // Guardar en localStorage
  const stored = localStorage.getItem("notifications");
  const notifications = stored ? JSON.parse(stored) : [];
  const updated = [notification, ...notifications].slice(0, 10);
  localStorage.setItem("notifications", JSON.stringify(updated));

  // Disparar evento personalizado para que el header se actualice
  const event = new CustomEvent("newNotification", { detail: notification });
  window.dispatchEvent(event);
};

export default function ComunicacionesPage() {
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  const [newMessage, setNewMessage] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [charCount, setCharCount] = useState(0);
  
  // Chat states - inicializar con localStorage
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return INITIAL_MOCK_CHAT;
    
    const stored = localStorage.getItem("teamChatMessages");
    if (stored) {
      return JSON.parse(stored);
    } else {
      localStorage.setItem("teamChatMessages", JSON.stringify(INITIAL_MOCK_CHAT));
      return INITIAL_MOCK_CHAT;
    }
  });

  // Escuchar cambios en localStorage (para sincronizar entre tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("teamChatMessages");
      if (stored) {
        setChatMessages(JSON.parse(stored));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Cargar plantilla en el textarea
  const handleLoadTemplate = (templateId: string) => {
    const template = MOCK_TEMPLATES.find(t => t.id.toString() === templateId);
    if (template) {
      setMessageContent(template.content);
      setCharCount(template.content.length);
      toast.success(`Plantilla "${template.name}" cargada`);
    }
  };

  // Programar envío
  const handleScheduleSend = () => {
    if (!scheduleDate || !scheduleTime) {
      toast.error("Por favor selecciona fecha y hora");
      return;
    }
    toast.success("Mensaje programado exitosamente", {
      description: `Se enviará el ${scheduleDate} a las ${scheduleTime}`
    });
    setShowScheduleDialog(false);
    setScheduleDate("");
    setScheduleTime("");
  };

  // Preview del mensaje
  const handlePreview = () => {
    if (!messageContent) {
      toast.error("Escribe un mensaje para ver la vista previa");
      return;
    }
    setShowPreviewDialog(true);
  };

  // Actualizar contador de caracteres
  const handleMessageChange = (value: string) => {
    setMessageContent(value);
    setCharCount(value.length);
  };

  // Enviar mensaje en el chat interno
  const handleSendChatMessage = () => {
    if (!newMessage.trim()) {
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "Dr. Navarro",
      message: newMessage.trim(),
      time: timeString,
      avatar: "DN",
      isCurrentUser: true
    };

    // Actualizar mensajes
    const updatedMessages = [...chatMessages, message];
    setChatMessages(updatedMessages);
    
    // Guardar en localStorage
    localStorage.setItem("teamChatMessages", JSON.stringify(updatedMessages));

    // Enviar notificación al header
    sendNotification(
      "Nuevo mensaje en Chat Interno",
      newMessage.trim(),
      "/comunicaciones"
    );

    // Limpiar input y mostrar toast
    setNewMessage("");
    toast.success("Mensaje enviado");
  };

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
                    <Input 
                      id="subject" 
                      placeholder="Asunto del email..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message">Mensaje</Label>
                    <div className="flex items-center gap-2">
                      {selectedChannel === "sms" && charCount > 160 && (
                        <Badge variant="destructive" className="text-xs">
                          Excede límite SMS
                        </Badge>
                      )}
                      <span className={`text-xs ${charCount > 160 && selectedChannel === "sms" ? "text-red-500 font-bold" : "text-muted-foreground"}`}>
                        {charCount} caracteres
                        {selectedChannel === "sms" && " (máx 160)"}
                      </span>
                    </div>
                  </div>
                  <Textarea 
                    id="message" 
                    placeholder="Escribe tu mensaje aquí..."
                    rows={8}
                    value={messageContent}
                    onChange={(e) => handleMessageChange(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Variables disponibles: {"{nombre}"}, {"{fecha}"}, {"{hora}"}, {"{direccion}"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Usar Plantilla</Label>
                  <Select value={selectedTemplate} onValueChange={(value) => {
                    setSelectedTemplate(value);
                    handleLoadTemplate(value);
                  }}>
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

                <div className="flex flex-wrap gap-2 pt-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handlePreview}
                    title="Ver cómo se verá el mensaje"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Vista Previa
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info("Función de adjuntar archivo disponible próximamente")}
                    title="Adjuntar archivo (próximamente)"
                  >
                    <Paperclip className="mr-2 h-4 w-4" />
                    Adjuntar
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast.success("Borrador guardado exitosamente");
                    }}
                    title="Guarda el mensaje para enviarlo más tarde"
                  >
                    Guardar Borrador
                  </Button>
                  <div className="flex-1 flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                      onClick={() => {
                        const channelName = selectedChannel === "whatsapp" ? "WhatsApp" : selectedChannel === "email" ? "Email" : "SMS";
                        toast.success(`Mensaje enviado por ${channelName}`, {
                          description: "El destinatario recibirá tu mensaje"
                        });
                      }}
                      title="Envía el mensaje inmediatamente"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Ahora
                    </Button>
                    <Button 
                      className="flex-1" 
                      variant="outline"
                      onClick={() => setShowScheduleDialog(true)}
                      title="Programa el envío para una fecha y hora específica"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Programar
                    </Button>
                  </div>
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
                <div className="flex gap-2">
                  <Select defaultValue="all-dates">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-dates">Todas las fechas</SelectItem>
                      <SelectItem value="today">Hoy</SelectItem>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-channels">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-channels">Todos los canales</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-status">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">Todos</SelectItem>
                      <SelectItem value="delivered">Entregado</SelectItem>
                      <SelectItem value="read">Leído</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                </div>
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
          {/* Variables Disponibles */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-blue-900 dark:text-blue-100">Variables Disponibles</CardTitle>
              </div>
              <CardDescription className="text-blue-700 dark:text-blue-300">
                Usa estas variables en tus plantillas para personalizar mensajes automáticamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">{"{nombre}"}</p>
                    <p className="text-xs text-muted-foreground">Nombre del paciente</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Ej: Juan Pérez</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-green-600 dark:text-green-400">{"{fecha}"}</p>
                    <p className="text-xs text-muted-foreground">Fecha del turno</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Ej: 15/12/2025</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-purple-600 dark:text-purple-400">{"{hora}"}</p>
                    <p className="text-xs text-muted-foreground">Hora del turno</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Ej: 10:30</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-orange-600 dark:text-orange-400">{"{direccion}"}</p>
                    <p className="text-xs text-muted-foreground">Dirección consultorio</p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Ej: Av. Corrientes 1234</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 shrink-0">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-pink-600 dark:text-pink-400">{"{doctor}"}</p>
                    <p className="text-xs text-muted-foreground">Nombre del médico</p>
                    <p className="text-xs text-pink-600 dark:text-pink-400 mt-1">Ej: Dr. Navarro</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-cyan-600 dark:text-cyan-400">{"{telefono}"}</p>
                    <p className="text-xs text-muted-foreground">Teléfono consultorio</p>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">Ej: 011-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-yellow-600 dark:text-yellow-400">{"{turno_id}"}</p>
                    <p className="text-xs text-muted-foreground">ID del turno</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Ej: #12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 shrink-0">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-red-600 dark:text-red-400">{"{motivo}"}</p>
                    <p className="text-xs text-muted-foreground">Motivo de la consulta</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">Ej: Control anual</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-indigo-600 dark:text-indigo-400">{"{consultorio}"}</p>
                    <p className="text-xs text-muted-foreground">Nombre del consultorio</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Ej: Consultorio Médico</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plantillas Predefinidas */}
          <div className="grid gap-6 md:grid-cols-2">
            {MOCK_TEMPLATES.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <Badge variant="outline">Plantilla</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{template.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        toast.info("Función de edición", {
                          description: "Esta funcionalidad estará disponible en la próxima versión"
                        });
                      }}
                      title="Modifica el contenido de esta plantilla"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                      onClick={() => {
                        setSelectedTemplate(template.id.toString());
                        handleLoadTemplate(template.id.toString());
                        toast.success(`Plantilla "${template.name}" lista para usar`, {
                          description: "Ve a la pestaña 'Enviar Mensaje' para completar y enviar"
                        });
                      }}
                      title="Usa esta plantilla para enviar un mensaje"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Usar Ahora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Crear Nueva Plantilla */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                <CardTitle>Crear Nueva Plantilla</CardTitle>
              </div>
              <CardDescription>Guarda mensajes que usas frecuentemente con variables personalizables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Nombre de la Plantilla</Label>
                <Input 
                  id="template-name"
                  placeholder="Ej: Recordatorio 48hs antes" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-category">Categoría</Label>
                <Select defaultValue="recordatorio">
                  <SelectTrigger id="template-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recordatorio">📅 Recordatorio</SelectItem>
                    <SelectItem value="confirmacion">✅ Confirmación</SelectItem>
                    <SelectItem value="resultados">📋 Resultados</SelectItem>
                    <SelectItem value="seguimiento">🔄 Seguimiento</SelectItem>
                    <SelectItem value="cancelacion">❌ Cancelación</SelectItem>
                    <SelectItem value="bienvenida">👋 Bienvenida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="template-content">Contenido</Label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      toast.info("Tip: Variables disponibles", {
                        description: "Usa {nombre}, {fecha}, {hora}, {doctor}, etc. Mira la lista completa arriba."
                      });
                    }}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Ver variables
                  </Button>
                </div>
                <Textarea 
                  id="template-content"
                  placeholder="Hola {nombre}, te recordamos tu turno con {doctor} el día {fecha} a las {hora}. Consultorio: {direccion}. ¡Te esperamos!"
                  rows={6} 
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    toast.success("Plantilla creada exitosamente", {
                      description: "Ahora puedes usarla desde 'Enviar Mensaje'"
                    });
                  }}
                  title="Guarda esta plantilla para usarla en futuros mensajes"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Plantilla
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast.info("Vista previa", {
                      description: "Ejemplo: Hola Juan Pérez, te recordamos tu turno con Dr. Navarro el día 15/12/2025 a las 10:30..."
                    });
                  }}
                  title="Ver cómo se verá el mensaje"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Vista Previa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de Uso */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Plantillas</CardTitle>
              <CardDescription>Plantillas más utilizadas este mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Recordatorio de Turno</p>
                      <p className="text-sm text-muted-foreground">156 usos este mes</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500">🥇 #1</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Confirmación de Turno</p>
                      <p className="text-sm text-muted-foreground">89 usos este mes</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">🥈 #2</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Post-Consulta</p>
                      <p className="text-sm text-muted-foreground">67 usos este mes</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-500">🥉 #3</Badge>
                </div>
              </div>
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
                    {chatMessages.map((chat) => (
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
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendChatMessage();
                      }
                    }}
                  />
                  <Button 
                    size="icon" 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={handleSendChatMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Programar Envío</DialogTitle>
            <DialogDescription>
              Selecciona cuándo quieres que se envíe el mensaje
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input 
                id="date" 
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input 
                id="time" 
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                ℹ️ El mensaje se enviará automáticamente en la fecha y hora seleccionada
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleScheduleSend} className="bg-blue-500 hover:bg-blue-600">
              <Calendar className="mr-2 h-4 w-4" />
              Confirmar Programación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vista Previa del Mensaje</DialogTitle>
            <DialogDescription>
              Así se verá tu mensaje al enviarse por {selectedChannel === "whatsapp" ? "WhatsApp" : selectedChannel === "email" ? "Email" : "SMS"}
            </DialogDescription>
          </DialogHeader>
          
          <div className={`p-4 rounded-lg ${
            selectedChannel === "whatsapp" ? "bg-green-50 border-2 border-green-200" :
            selectedChannel === "email" ? "bg-blue-50 border-2 border-blue-200" :
            "bg-purple-50 border-2 border-purple-200"
          }`}>
            {selectedChannel === "email" && subject && (
              <div className="mb-3 pb-3 border-b border-gray-300">
                <p className="text-xs font-semibold text-gray-600">Asunto:</p>
                <p className="font-medium">{subject}</p>
              </div>
            )}
            <div className="whitespace-pre-wrap text-sm">
              {messageContent || "No hay contenido para previsualizar"}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-300 flex items-center justify-between text-xs text-gray-600">
              <span>Consultorio Médico</span>
              <span>{new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {selectedChannel === "sms" && charCount > 160 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                ⚠️ El mensaje excede los 160 caracteres permitidos para SMS
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
