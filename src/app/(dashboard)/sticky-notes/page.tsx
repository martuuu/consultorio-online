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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  StickyNote as StickyNoteIcon,
  Plus,
  Search,
  Filter,
  Trash2,
  Check,
  Clock,
  User,
  MapPin,
  Settings,
  Eye,
  EyeOff,
  AlertCircle,
  Archive,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Tipos
type StickyNoteContext = "global" | "patient" | "appointment" | "room" | "page";
type StickyNotePriority = "low" | "normal" | "high";
type StickyNoteStatus = "active" | "checked" | "archived";

interface StickyNote {
  id: string;
  title: string;
  content: string;
  context: StickyNoteContext;
  contextId?: string;
  contextName?: string;
  url: string; // URL donde se creó la nota (ej: /pacientes/123)
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  status: StickyNoteStatus;
  viewedAt?: Date; // Cuando se colapsó (pasa a "viewed")
  checkedBy?: {
    id: string;
    name: string;
    checkedAt: Date;
    notes?: string; // Observación al confirmar
  };
  mentions: string[];
  createdAt: Date;
  expiresAt?: Date;
  priority: StickyNotePriority;
  isPrivate: boolean;
}

// Colores por tipo de usuario - Paleta suave y moderna
const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  // Administración (azul suave)
  SUPERADMIN: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-300" },
  ADMIN: { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-300" },
  
  // Profesionales (teal/verde)
  MEDICO: { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-300" },
  ENFERMERO: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-300" },
  
  // Resto (cyan/amarillo)
  RECEPCIONISTA: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-300" },
  SECRETARIA: { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-300" },
};

// Mock user actual
const CURRENT_USER = {
  id: "user-1",
  name: "Dr. Juan Pérez",
  role: "MEDICO",
};

// Mock data
const MOCK_NOTES: StickyNote[] = [
  {
    id: "note-1",
    title: "Llamar a paciente",
    content: "Confirmar turno de mañana para María García. Recordar que pidió horario tarde por trabajo.",
    context: "patient",
    contextId: "123",
    contextName: "María García",
    url: "/pacientes/123",
    createdBy: {
      id: "user-1",
      name: "Dr. Juan Pérez",
      role: "MEDICO",
    },
    status: "active",
    mentions: [],
    createdAt: new Date("2024-12-04T10:30:00"),
    expiresAt: new Date("2024-12-11T10:30:00"),
    priority: "high",
    isPrivate: false,
  },
  {
    id: "note-2",
    title: "Revisar resultados",
    content: "@DraMartinez - Por favor revisa los resultados de laboratorio de Carlos López antes de la consulta de las 15hs.",
    context: "patient",
    contextId: "456",
    contextName: "Carlos López",
    url: "/pacientes/456",
    createdBy: {
      id: "user-2",
      name: "Secretaria Ana",
      role: "SECRETARIA",
    },
    status: "active",
    mentions: ["@DraMartinez"],
    createdAt: new Date("2024-12-04T09:15:00"),
    expiresAt: new Date("2024-12-11T09:15:00"),
    priority: "normal",
    isPrivate: false,
  },
  {
    id: "note-3",
    title: "Cerrar consultorio",
    content: "Recordar cerrar con llave el consultorio hoy. Llega el técnico del aire acondicionado a las 18hs.",
    context: "global",
    url: "/agenda",
    createdBy: {
      id: "user-3",
      name: "Admin Sistema",
      role: "ADMIN",
    },
    status: "active",
    mentions: [],
    createdAt: new Date("2024-12-04T08:00:00"),
    expiresAt: new Date("2024-12-04T20:00:00"),
    priority: "high",
    isPrivate: false,
  },
  {
    id: "note-4",
    title: "Stock de recetarios",
    content: "@Secretaria - Verificar stock de recetarios. Creo que quedan pocos.",
    context: "global",
    url: "/configuracion",
    createdBy: {
      id: "user-1",
      name: "Dr. Juan Pérez",
      role: "MEDICO",
    },
    status: "active",
    mentions: ["@Secretaria"],
    createdAt: new Date("2024-12-03T16:45:00"),
    priority: "low",
    isPrivate: false,
  },
  {
    id: "note-5",
    title: "Orden de estudios pendiente",
    content: "Juan Pérez no retiró su orden de estudios. Llamarlo mañana.",
    context: "patient",
    contextId: "789",
    contextName: "Juan Pérez",
    url: "/pacientes/789",
    createdBy: {
      id: "user-1",
      name: "Dr. Juan Pérez",
      role: "MEDICO",
    },
    status: "checked",
    checkedBy: {
      id: "user-1",
      name: "Dr. Juan Pérez",
      checkedAt: new Date("2024-12-04T11:00:00"),
      notes: "Ya contacté al paciente, retira mañana por la mañana",
    },
    mentions: [],
    createdAt: new Date("2024-12-03T14:20:00"),
    priority: "normal",
    isPrivate: false,
  },
];

// Configuración global
interface StickyNotesConfig {
  enabled: boolean;
  autoExpireDays: number;
  showOnAllPages: boolean;
  maxNotesPerPage: number;
  enableMentions: boolean;
  enablePrivateNotes: boolean;
  defaultPriority: StickyNotePriority;
  soundEnabled: boolean;
}

const DEFAULT_CONFIG: StickyNotesConfig = {
  enabled: true,
  autoExpireDays: 7,
  showOnAllPages: true,
  maxNotesPerPage: 5,
  enableMentions: true,
  enablePrivateNotes: true,
  defaultPriority: "normal",
  soundEnabled: false,
};

export default function StickyNotesPage() {
  // Initialize from localStorage
  const getInitialConfig = () => {
    if (typeof window === "undefined") return DEFAULT_CONFIG;
    const saved = localStorage.getItem("sticky-notes-config");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  };

  const getInitialNotes = () => {
    if (typeof window === "undefined") return MOCK_NOTES;
    const saved = localStorage.getItem("sticky-notes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((n: StickyNote) => ({
          ...n,
          createdAt: new Date(n.createdAt),
          expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined,
          checkedBy: n.checkedBy ? {
            ...n.checkedBy,
            checkedAt: new Date(n.checkedBy.checkedAt)
          } : undefined,
        }));
      } catch {
        return MOCK_NOTES;
      }
    }
    return MOCK_NOTES;
  };

  const [notes, setNotes] = useState<StickyNote[]>(getInitialNotes);
  const [config, setConfig] = useState<StickyNotesConfig>(getInitialConfig);
  const [showNewNoteDialog, setShowNewNoteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterContext, setFilterContext] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<StickyNoteStatus>("active");
  const [selectedNote, setSelectedNote] = useState<StickyNote | null>(null);

  // Form state
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteContext, setNewNoteContext] = useState<StickyNoteContext>("page");
  const [newNotePriority, setNewNotePriority] = useState<StickyNotePriority>("normal");
  const [newNoteIsPrivate, setNewNoteIsPrivate] = useState(false);

  // Save to localStorage
  const saveNotes = (updatedNotes: StickyNote[]) => {
    setNotes(updatedNotes);
    localStorage.setItem("sticky-notes", JSON.stringify(updatedNotes));
    
    // Emit event for cross-tab sync
    window.dispatchEvent(new CustomEvent("sticky-notes-updated", { 
      detail: updatedNotes 
    }));
  };

  const saveConfig = (updatedConfig: StickyNotesConfig) => {
    setConfig(updatedConfig);
    localStorage.setItem("sticky-notes-config", JSON.stringify(updatedConfig));
  };

  // Parse mentions
  const parseMentions = (content: string): string[] => {
    const regex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      mentions.push(`@${match[1]}`);
    }
    return mentions;
  };

  // Create note
  const handleCreateNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      toast.error("Título y contenido son obligatorios");
      return;
    }

    if (newNoteTitle.length > 40) {
      toast.error("El título no puede superar los 40 caracteres");
      return;
    }

    if (newNoteContent.length > 140) {
      toast.error("El contenido no puede superar los 140 caracteres");
      return;
    }

    const mentions = parseMentions(newNoteContent);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + config.autoExpireDays);

    const newNote: StickyNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle,
      content: newNoteContent,
      context: newNoteContext,
      url: window.location.pathname, // Guarda la URL donde se creó
      createdBy: CURRENT_USER,
      status: "active",
      mentions,
      createdAt: new Date(),
      expiresAt,
      priority: newNotePriority,
      isPrivate: newNoteIsPrivate,
    };

    saveNotes([...notes, newNote]);
    
    toast.success("Nota creada exitosamente", {
      description: mentions.length > 0 
        ? `${mentions.length} persona(s) mencionada(s)` 
        : undefined,
    });

    // Reset form
    setNewNoteTitle("");
    setNewNoteContent("");
    setNewNoteContext("page");
    setNewNotePriority("normal");
    setNewNoteIsPrivate(false);
    setShowNewNoteDialog(false);
  };

  // Check note
  const handleCheckNote = (noteId: string) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? {
            ...note,
            status: "checked" as StickyNoteStatus,
            checkedBy: {
              id: CURRENT_USER.id,
              name: CURRENT_USER.name,
              checkedAt: new Date(),
            }
          }
        : note
    );
    saveNotes(updatedNotes);
    toast.success("Nota marcada como vista");
  };

  // Uncheck note
  const handleUncheckNote = (noteId: string) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? {
            ...note,
            status: "active" as StickyNoteStatus,
            checkedBy: undefined,
          }
        : note
    );
    saveNotes(updatedNotes);
    toast.success("Nota reactivada");
  };

  // Archive note
  const handleArchiveNote = (noteId: string) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, status: "archived" as StickyNoteStatus }
        : note
    );
    saveNotes(updatedNotes);
    toast.success("Nota archivada");
  };

  // Delete note
  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotes(updatedNotes);
    toast.success("Nota eliminada");
  };

  // Cleanup expired notes
  const cleanupExpiredNotes = () => {
    const now = new Date();
    const activeBefore = notes.filter(n => n.status === "active").length;
    const updatedNotes = notes.map(note => {
      if (note.expiresAt && note.expiresAt < now && note.status === "active") {
        return { ...note, status: "archived" as StickyNoteStatus };
      }
      return note;
    });
    const activeAfter = updatedNotes.filter(n => n.status === "active").length;
    const archived = activeBefore - activeAfter;
    
    if (archived > 0) {
      saveNotes(updatedNotes);
      toast.info(`${archived} nota(s) expirada(s) archivada(s) automáticamente`);
    } else {
      toast.success("No hay notas expiradas");
    }
  };

  // Filtered notes
  const filteredNotes = notes.filter(note => {
    if (filterStatus !== note.status) return false;
    if (filterContext !== "all" && note.context !== filterContext) return false;
    if (filterPriority !== "all" && note.priority !== filterPriority) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        note.title.toLowerCase().includes(search) ||
        note.content.toLowerCase().includes(search) ||
        note.createdBy.name.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: notes.length,
    active: notes.filter(n => n.status === "active").length,
    checked: notes.filter(n => n.status === "checked").length,
    archived: notes.filter(n => n.status === "archived").length,
    myActive: notes.filter(n => n.createdBy.id === CURRENT_USER.id && n.status === "active").length,
    mentions: notes.filter(n => 
      n.mentions.some(m => m.includes(CURRENT_USER.name.split(" ")[0]))
    ).length,
  };

  const getPriorityBadge = (priority: StickyNotePriority) => {
    const config = {
      high: { label: "Alta", color: "bg-red-500" },
      normal: { label: "Normal", color: "bg-blue-500" },
      low: { label: "Baja", color: "bg-gray-500" },
    };
    return <Badge className={`${config[priority].color} text-white text-xs`}>{config[priority].label}</Badge>;
  };

  const getContextLabel = (context: StickyNoteContext) => {
    const labels = {
      global: "🌐 Global",
      patient: "👤 Paciente",
      appointment: "📅 Turno",
      room: "🚪 Sala",
      page: "📄 Página",
    };
    return labels[context];
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <StickyNoteIcon className="h-8 w-8 text-primary" />
            Sticky Notes
          </h1>
          <p className="text-muted-foreground">Notas colaborativas para el equipo médico</p>
        </div>
        <Button onClick={() => setShowNewNoteDialog(true)} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Nota
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <StickyNoteIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Todas las notas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activas</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Sin revisar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revisadas</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.checked}</div>
            <p className="text-xs text-muted-foreground">Completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archivadas</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.archived}</div>
            <p className="text-xs text-muted-foreground">Guardadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mis Notas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.myActive}</div>
            <p className="text-xs text-muted-foreground">Activas mías</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menciones</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mentions}</div>
            <p className="text-xs text-muted-foreground">Me mencionaron</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as StickyNoteStatus)} className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            <Eye className="mr-2 h-4 w-4" />
            Activas ({stats.active})
          </TabsTrigger>
          <TabsTrigger value="checked">
            <Check className="mr-2 h-4 w-4" />
            Revisadas ({stats.checked})
          </TabsTrigger>
          <TabsTrigger value="archived">
            <Archive className="mr-2 h-4 w-4" />
            Archivadas ({stats.archived})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filterStatus} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {filterStatus === "active" && "Notas Activas"}
                    {filterStatus === "checked" && "Notas Revisadas"}
                    {filterStatus === "archived" && "Notas Archivadas"}
                  </CardTitle>
                  <CardDescription>
                    {filteredNotes.length} nota(s) encontrada(s)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={filterContext} onValueChange={setFilterContext}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="patient">Paciente</SelectItem>
                      <SelectItem value="page">Página</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                  {filterStatus === "active" && (
                    <Button variant="outline" onClick={cleanupExpiredNotes}>
                      <Clock className="mr-2 h-4 w-4" />
                      Limpiar Expiradas
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note) => {
                  const roleColors = ROLE_COLORS[note.createdBy.role] || ROLE_COLORS.SECRETARIA;
                  
                  return (
                    <div
                      key={note.id}
                      className={`relative rounded-lg ${roleColors.bg} p-4 shadow-md transition-all hover:shadow-lg hover:scale-105 cursor-pointer`}
                      onClick={() => setSelectedNote(note)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className={`font-semibold text-sm line-clamp-1 ${roleColors.text}`}>
                            {note.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {format(note.createdAt, "HH:mm", { locale: es })}
                          </p>
                        </div>
                        {getPriorityBadge(note.priority)}
                      </div>

                      {/* Content */}
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {note.content}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${roleColors.bg}`} />
                          <span className="text-muted-foreground">{note.createdBy.name.split(" ")[0]}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getContextLabel(note.context)}
                        </Badge>
                      </div>

                      {/* Private indicator */}
                      {note.isPrivate && (
                        <div className="absolute top-2 right-2">
                          <EyeOff className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}

                      {/* Mentions indicator */}
                      {note.mentions.length > 0 && (
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            @{note.mentions.length}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredNotes.length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    <StickyNoteIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p>No hay notas para mostrar</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuración Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración
              </CardTitle>
              <CardDescription>Personaliza el comportamiento de Sticky Notes</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sistema habilitado</Label>
                  <p className="text-sm text-muted-foreground">Activar/desactivar globalmente</p>
                </div>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={(checked) => saveConfig({ ...config, enabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mostrar en todas las páginas</Label>
                  <p className="text-sm text-muted-foreground">Renderizar en todo el sistema</p>
                </div>
                <Switch
                  checked={config.showOnAllPages}
                  onCheckedChange={(checked) => saveConfig({ ...config, showOnAllPages: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Habilitar menciones</Label>
                  <p className="text-sm text-muted-foreground">Permitir @menciones</p>
                </div>
                <Switch
                  checked={config.enableMentions}
                  onCheckedChange={(checked) => saveConfig({ ...config, enableMentions: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Permitir notas privadas</Label>
                  <p className="text-sm text-muted-foreground">Solo el creador puede ver</p>
                </div>
                <Switch
                  checked={config.enablePrivateNotes}
                  onCheckedChange={(checked) => saveConfig({ ...config, enablePrivateNotes: checked })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Días para auto-expiración</Label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={config.autoExpireDays}
                  onChange={(e) => saveConfig({ ...config, autoExpireDays: parseInt(e.target.value) || 7 })}
                />
                <p className="text-xs text-muted-foreground">
                  Las notas se archivarán automáticamente después de este período
                </p>
              </div>

              <div className="space-y-2">
                <Label>Notas máximas por página</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={config.maxNotesPerPage}
                  onChange={(e) => saveConfig({ ...config, maxNotesPerPage: parseInt(e.target.value) || 5 })}
                />
                <p className="text-xs text-muted-foreground">
                  Límite de notas visibles simultáneamente en cada página
                </p>
              </div>

              <div className="space-y-2">
                <Label>Prioridad por defecto</Label>
                <Select 
                  value={config.defaultPriority} 
                  onValueChange={(v) => saveConfig({ ...config, defaultPriority: v as StickyNotePriority })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                saveConfig(DEFAULT_CONFIG);
                toast.success("Configuración restaurada a valores por defecto");
              }}
            >
              Restaurar Valores
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast.success("Configuración guardada", {
                  description: "Los cambios se aplicaron correctamente",
                });
              }}
            >
              <Check className="mr-2 h-4 w-4" />
              Guardar Configuración
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog: Nueva Nota */}
      <Dialog open={showNewNoteDialog} onOpenChange={setShowNewNoteDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nueva Nota Adhesiva 📝</DialogTitle>
            <DialogDescription>
              Deja un recordatorio rápido para ti o el equipo (máx 140 caracteres)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Título *</Label>
              <Input
                placeholder="Ej: Llamar a paciente"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                maxLength={40}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {newNoteTitle.length}/40 caracteres
              </p>
            </div>

            <div>
              <Label>Descripción *</Label>
              <Textarea
                placeholder="Ej: Confirmar turno de mañana para María García..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                maxLength={140}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {newNoteContent.length}/140 caracteres
              </p>
              {config.enableMentions && (
                <p className="text-xs text-blue-600 mt-1">
                  💡 Usa @nombre para mencionar a alguien
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contexto</Label>
                <Select value={newNoteContext} onValueChange={(v) => setNewNoteContext(v as StickyNoteContext)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">🌐 Global (Todo el sistema)</SelectItem>
                    <SelectItem value="page">📄 Esta página</SelectItem>
                    <SelectItem value="patient">👤 Paciente específico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Prioridad</Label>
                <Select value={newNotePriority} onValueChange={(v) => setNewNotePriority(v as StickyNotePriority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {config.enablePrivateNotes && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="private" 
                  checked={newNoteIsPrivate}
                  onCheckedChange={(checked) => setNewNoteIsPrivate(checked as boolean)}
                />
                <label htmlFor="private" className="text-sm font-medium">
                  Nota privada (solo yo puedo verla)
                </label>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewNoteDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateNote}>
              <Plus className="mr-2 h-4 w-4" />
              Crear Nota
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Ver Nota */}
      {selectedNote && (
        <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedNote.title}
                {getPriorityBadge(selectedNote.priority)}
              </DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-4 text-sm">
                  <span>Por {selectedNote.createdBy.name}</span>
                  <span>•</span>
                  <span>{format(selectedNote.createdAt, "dd/MM/yyyy HH:mm", { locale: es })}</span>
                  <span>•</span>
                  <Badge variant="outline">{getContextLabel(selectedNote.context)}</Badge>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm whitespace-pre-wrap">{selectedNote.content}</p>
              </div>

              {selectedNote.contextName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Relacionado con: {selectedNote.contextName}</span>
                </div>
              )}

              {selectedNote.mentions.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-600">
                    Menciones: {selectedNote.mentions.join(", ")}
                  </span>
                </div>
              )}

              {selectedNote.checkedBy && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>
                    Revisada por {selectedNote.checkedBy.name} el {format(selectedNote.checkedBy.checkedAt, "dd/MM/yyyy HH:mm", { locale: es })}
                  </span>
                </div>
              )}

              {selectedNote.expiresAt && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    Expira: {format(selectedNote.expiresAt, "dd/MM/yyyy HH:mm", { locale: es })}
                  </span>
                </div>
              )}
            </div>

            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                {selectedNote.status === "active" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleCheckNote(selectedNote.id);
                      setSelectedNote(null);
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Marcar como Vista
                  </Button>
                )}
                {selectedNote.status === "checked" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUncheckNote(selectedNote.id);
                      setSelectedNote(null);
                    }}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reactivar
                  </Button>
                )}
                {selectedNote.status !== "archived" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleArchiveNote(selectedNote.id);
                      setSelectedNote(null);
                    }}
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Archivar
                  </Button>
                )}
              </div>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteNote(selectedNote.id);
                  setSelectedNote(null);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
