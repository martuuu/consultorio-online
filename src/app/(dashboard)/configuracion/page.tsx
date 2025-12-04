"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import roomsData from "@/lib/data/room.json";
import usersData from "@/lib/data/users.json";
import { 
  Trash2, 
  Plus, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock,
  DoorOpen,
  Edit2,
  Save,
  UserCog,
  Loader2,
  Key,
  ShieldCheck,
  Upload,
  Camera
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function ConfiguracionPage() {
  // Estados generales
  const [isSaving, setIsSaving] = useState(false);

  // Estados para horarios
  const [isEditHoursDialogOpen, setIsEditHoursDialogOpen] = useState(false);
  const [isProfessionalScheduleDialogOpen, setIsProfessionalScheduleDialogOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  
  // Horarios generales de mesa de entrada (ahora con bloques múltiples)
  const [receptionSchedules, setReceptionSchedules] = useState([
    { day: "Lunes", blocks: [{ start: "08:00", end: "20:00" }], enabled: true },
    { day: "Martes", blocks: [{ start: "08:00", end: "20:00" }], enabled: true },
    { day: "Miércoles", blocks: [{ start: "08:00", end: "20:00" }], enabled: true },
    { day: "Jueves", blocks: [{ start: "08:00", end: "20:00" }], enabled: true },
    { day: "Viernes", blocks: [{ start: "08:00", end: "20:00" }], enabled: true },
    { day: "Sábado", blocks: [{ start: "09:00", end: "13:00" }], enabled: true },
    { day: "Domingo", blocks: [], enabled: false },
  ]);
  
  // Horarios por profesional (mock data con bloques múltiples)
  const [professionalSchedules, setProfessionalSchedules] = useState([
    {
      id: 1,
      name: "Dr. Martín Navarro",
      schedules: [
        { day: "Lunes", blocks: [{ start: "09:00", end: "13:00" }, { start: "15:00", end: "19:00" }], enabled: true },
        { day: "Martes", blocks: [{ start: "09:00", end: "13:00" }, { start: "15:00", end: "19:00" }], enabled: true },
        { day: "Miércoles", blocks: [{ start: "09:00", end: "18:00" }], enabled: true },
        { day: "Jueves", blocks: [{ start: "09:00", end: "18:00" }], enabled: true },
        { day: "Viernes", blocks: [{ start: "09:00", end: "13:00" }], enabled: true },
        { day: "Sábado", blocks: [], enabled: false },
        { day: "Domingo", blocks: [], enabled: false },
      ]
    },
    {
      id: 2,
      name: "Dra. Laura López",
      schedules: [
        { day: "Lunes", blocks: [{ start: "14:00", end: "20:00" }], enabled: true },
        { day: "Martes", blocks: [{ start: "14:00", end: "20:00" }], enabled: true },
        { day: "Miércoles", blocks: [{ start: "14:00", end: "20:00" }], enabled: true },
        { day: "Jueves", blocks: [{ start: "14:00", end: "20:00" }], enabled: true },
        { day: "Viernes", blocks: [{ start: "08:00", end: "12:00" }, { start: "18:00", end: "22:00" }], enabled: true },
        { day: "Sábado", blocks: [{ start: "09:00", end: "13:00" }], enabled: true },
        { day: "Domingo", blocks: [], enabled: false },
      ]
    },
  ]);

  // Estados para salas
  const [rooms, setRooms] = useState(roomsData);
  const [isNewRoomDialogOpen, setIsNewRoomDialogOpen] = useState(false);
  const [isEditRoomDialogOpen, setIsEditRoomDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<number | null>(null);
  const [editingRoom, setEditingRoom] = useState<{
    id: number;
    name: string;
    type: string;
    description?: string;
  } | null>(null);
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "",
    description: ""
  });

  // Estados para usuarios
  const [users, setUsers] = useState(usersData);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
  } | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: ""
  });

  // Estados para perfil
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Función guardar información del consultorio
  const handleSaveClinicInfo = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Información del consultorio guardada correctamente");
    setIsSaving(false);
  };

  // Función guardar horarios de mesa de entrada
  const handleSaveReceptionSchedules = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.success("Horarios de mesa de entrada actualizados correctamente");
    setIsEditHoursDialogOpen(false);
    setIsSaving(false);
  };
  
  // Función guardar horarios de profesional
  const handleSaveProfessionalSchedule = async () => {
    if (selectedProfessional === null) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const professional = professionalSchedules.find(p => p.id === selectedProfessional);
    toast.success(`Horarios de ${professional?.name} actualizados correctamente`);
    setIsProfessionalScheduleDialogOpen(false);
    setSelectedProfessional(null);
    setIsSaving(false);
  };

  // Función crear sala
  const handleCreateRoom = async () => {
    if (!newRoom.name || !newRoom.type) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const room = {
      id: rooms.length + 1,
      name: newRoom.name,
      type: newRoom.type,
      description: newRoom.description
    };
    
    setRooms([...rooms, room]);
    toast.success(`Sala "${newRoom.name}" creada correctamente`);
    setNewRoom({ name: "", type: "", description: "" });
    setIsNewRoomDialogOpen(false);
    setIsSaving(false);
  };

  // Función editar sala
  const handleEditRoom = async () => {
    if (!editingRoom || !editingRoom.name || !editingRoom.type) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setRooms(rooms.map(r => r.id === editingRoom.id ? { ...r, ...editingRoom } : r));
    toast.success(`Sala "${editingRoom.name}" actualizada correctamente`);
    setIsEditRoomDialogOpen(false);
    setEditingRoom(null);
    setIsSaving(false);
  };

  // Función eliminar sala
  const handleDeleteRoom = async () => {
    if (!roomToDelete) return;
    
    const room = rooms.find(r => r.id === roomToDelete);
    setRooms(rooms.filter(r => r.id !== roomToDelete));
    toast.success(`Sala "${room?.name}" eliminada correctamente`);
    setRoomToDelete(null);
  };

  // Función invitar usuario
  const handleInviteUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      status: "active" as const
    };
    
    setUsers([...users, user]);
    toast.success(`Invitación enviada a ${newUser.email}`);
    setNewUser({ name: "", email: "", role: "", phone: "" });
    setIsNewUserDialogOpen(false);
    setIsSaving(false);
  };

  // Función editar usuario
  const handleEditUser = async () => {
    if (!editingUser || !editingUser.name || !editingUser.email || !editingUser.role) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...editingUser } : u));
    toast.success(`Usuario "${editingUser.name}" actualizado correctamente`);
    setIsEditUserDialogOpen(false);
    setEditingUser(null);
    setIsSaving(false);
  };

  // Función eliminar usuario
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    const user = users.find(u => u.id === userToDelete);
    setUsers(users.filter(u => u.id !== userToDelete));
    toast.success(`Usuario "${user?.name}" eliminado correctamente`);
    setUserToDelete(null);
  };

  // Función cambiar contraseña
  const handleChangePassword = async () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    
    if (passwordForm.new.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Contraseña cambiada correctamente");
    setPasswordForm({ current: "", new: "", confirm: "" });
    setIsChangePasswordDialogOpen(false);
    setIsSaving(false);
  };

  // Función activar 2FA
  const handleEnable2FA = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Autenticación de dos factores activada");
    setIs2FADialogOpen(false);
    setIsSaving(false);
  };

  // Función cambiar foto perfil
  const handleUploadPhoto = () => {
    toast.info("Función de carga de foto disponible próximamente");
  };
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
        <p className="text-muted-foreground">
          Administra tu consultorio, usuarios y preferencias generales.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="schedules">Horarios Médicos</TabsTrigger>
          <TabsTrigger value="rooms">Salas</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="sticky-notes">Sticky Notes</TabsTrigger>
          <TabsTrigger value="profile">Mi Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Información del Consultorio
                </CardTitle>
                <CardDescription>
                  Datos generales y de contacto de tu consultorio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre del Consultorio</Label>
                  <Input id="name" defaultValue="Consultorio Light" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Dirección
                  </Label>
                  <Input id="address" placeholder="Av. Rivadavia 1234, CABA" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Teléfono
                    </Label>
                    <Input id="phone" placeholder="+54 11 1234-5678" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email
                    </Label>
                    <Input id="email" type="email" placeholder="info@consultorio.com" />
                  </div>
                </div>
                <Button className="w-full" onClick={handleSaveClinicInfo} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horarios de Mesa de Entrada
                </CardTitle>
                <CardDescription>
                  Horarios en que la secretaría atiende (independiente de la agenda médica)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {receptionSchedules.slice(0, 3).map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm font-medium w-24">{schedule.day}</span>
                      {schedule.enabled && schedule.blocks.length > 0 ? (
                        <div className="flex gap-1 items-center text-xs flex-wrap">
                          {schedule.blocks.map((block, blockIdx) => (
                            <span key={blockIdx} className="text-muted-foreground">
                              {block.start} - {block.end}
                              {blockIdx < schedule.blocks.length - 1 && <span className="ml-1 text-primary">•</span>}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-xs">Cerrado</Badge>
                      )}
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground pt-2">
                    Sábados: {receptionSchedules[5].enabled && receptionSchedules[5].blocks.length > 0
                      ? receptionSchedules[5].blocks.map(b => `${b.start}-${b.end}`).join(' • ')
                      : "Cerrado"}
                  </p>
                </div>
                <Dialog open={isEditHoursDialogOpen} onOpenChange={setIsEditHoursDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Edit2 className="mr-2 h-4 w-4" />
                      Editar Horarios Mesa de Entrada
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Horarios de Mesa de Entrada / Secretaría</DialogTitle>
                      <DialogDescription>
                        Configura los horarios en que la mesa de entrada está disponible. Puedes agregar múltiples bloques horarios por día (ej: 8-12 y 18-22)
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto">
                      {receptionSchedules.map((schedule, index) => (
                        <div key={index} className="rounded-lg border p-3">
                          <div className="flex items-center gap-3 mb-3">
                            <input 
                              type="checkbox" 
                              checked={schedule.enabled}
                              onChange={(e) => {
                                const newSchedules = [...receptionSchedules];
                                newSchedules[index].enabled = e.target.checked;
                                if (e.target.checked && newSchedules[index].blocks.length === 0) {
                                  newSchedules[index].blocks = [{ start: "08:00", end: "20:00" }];
                                }
                                setReceptionSchedules(newSchedules);
                              }}
                              className="h-4 w-4"
                            />
                            <span className="text-sm font-medium">{schedule.day}</span>
                          </div>
                          
                          {schedule.enabled && (
                            <div className="space-y-2 ml-7">
                              {schedule.blocks.map((block, blockIdx) => (
                                <div key={blockIdx} className="flex gap-2 items-center">
                                  <Input 
                                    className="w-28 h-9" 
                                    type="time" 
                                    value={block.start}
                                    onChange={(e) => {
                                      const newSchedules = [...receptionSchedules];
                                      newSchedules[index].blocks[blockIdx].start = e.target.value;
                                      setReceptionSchedules(newSchedules);
                                    }}
                                  />
                                  <span className="text-muted-foreground">-</span>
                                  <Input 
                                    className="w-28 h-9" 
                                    type="time" 
                                    value={block.end}
                                    onChange={(e) => {
                                      const newSchedules = [...receptionSchedules];
                                      newSchedules[index].blocks[blockIdx].end = e.target.value;
                                      setReceptionSchedules(newSchedules);
                                    }}
                                  />
                                  {schedule.blocks.length > 1 && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-9 w-9 p-0"
                                      onClick={() => {
                                        const newSchedules = [...receptionSchedules];
                                        newSchedules[index].blocks = newSchedules[index].blocks.filter((_, i) => i !== blockIdx);
                                        setReceptionSchedules(newSchedules);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => {
                                  const newSchedules = [...receptionSchedules];
                                  newSchedules[index].blocks.push({ start: "14:00", end: "18:00" });
                                  setReceptionSchedules(newSchedules);
                                }}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Agregar bloque horario
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => setIsEditHoursDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveReceptionSchedules} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Guardando...
                          </>
                        ) : (
                          "Guardar Horarios"
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horarios de Agenda por Profesional
              </CardTitle>
              <CardDescription>
                Configura los días y horarios de atención de cada profesional. Estos horarios definen cuándo cada médico tiene turnos disponibles en la agenda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {professionalSchedules.map((professional) => (
                <div key={professional.id} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{professional.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {professional.schedules.filter(s => s.enabled).length} días configurados
                      </p>
                    </div>
                    <Dialog 
                      open={isProfessionalScheduleDialogOpen && selectedProfessional === professional.id} 
                      onOpenChange={(open) => {
                        setIsProfessionalScheduleDialogOpen(open);
                        if (open) {
                          setSelectedProfessional(professional.id);
                        } else {
                          setSelectedProfessional(null);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit2 className="mr-2 h-4 w-4" />
                          Editar Agenda
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Configurar Agenda: {professional.name}</DialogTitle>
                          <DialogDescription>
                            Define los días y horarios en que este profesional atiende pacientes. Puedes agregar múltiples bloques por día (ej: mañana y tarde).
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto">
                          {professional.schedules.map((schedule, index) => (
                            <div key={index} className="rounded-lg border p-3">
                              <div className="flex items-center gap-3 mb-3">
                                <input 
                                  type="checkbox" 
                                  checked={schedule.enabled}
                                  onChange={(e) => {
                                    const newProfessionals = professionalSchedules.map(p => {
                                      if (p.id === professional.id) {
                                        const newSchedules = [...p.schedules];
                                        newSchedules[index].enabled = e.target.checked;
                                        if (e.target.checked && newSchedules[index].blocks.length === 0) {
                                          newSchedules[index].blocks = [{ start: "09:00", end: "18:00" }];
                                        }
                                        return { ...p, schedules: newSchedules };
                                      }
                                      return p;
                                    });
                                    setProfessionalSchedules(newProfessionals);
                                  }}
                                  className="h-4 w-4"
                                />
                                <span className="text-sm font-medium">{schedule.day}</span>
                              </div>
                              
                              {schedule.enabled && (
                                <div className="space-y-2 ml-7">
                                  {schedule.blocks.map((block, blockIdx) => (
                                    <div key={blockIdx} className="flex gap-2 items-center">
                                      <Input 
                                        className="w-28 h-9" 
                                        type="time" 
                                        value={block.start}
                                        onChange={(e) => {
                                          const newProfessionals = professionalSchedules.map(p => {
                                            if (p.id === professional.id) {
                                              const newSchedules = [...p.schedules];
                                              newSchedules[index].blocks[blockIdx].start = e.target.value;
                                              return { ...p, schedules: newSchedules };
                                            }
                                            return p;
                                          });
                                          setProfessionalSchedules(newProfessionals);
                                        }}
                                      />
                                      <span className="text-muted-foreground">-</span>
                                      <Input 
                                        className="w-28 h-9" 
                                        type="time" 
                                        value={block.end}
                                        onChange={(e) => {
                                          const newProfessionals = professionalSchedules.map(p => {
                                            if (p.id === professional.id) {
                                              const newSchedules = [...p.schedules];
                                              newSchedules[index].blocks[blockIdx].end = e.target.value;
                                              return { ...p, schedules: newSchedules };
                                            }
                                            return p;
                                          });
                                          setProfessionalSchedules(newProfessionals);
                                        }}
                                      />
                                      {schedule.blocks.length > 1 && (
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-9 w-9 p-0"
                                          onClick={() => {
                                            const newProfessionals = professionalSchedules.map(p => {
                                              if (p.id === professional.id) {
                                                const newSchedules = [...p.schedules];
                                                newSchedules[index].blocks = newSchedules[index].blocks.filter((_, i) => i !== blockIdx);
                                                return { ...p, schedules: newSchedules };
                                              }
                                              return p;
                                            });
                                            setProfessionalSchedules(newProfessionals);
                                          }}
                                        >
                                          <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                      )}
                                    </div>
                                  ))}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 text-xs"
                                    onClick={() => {
                                      const newProfessionals = professionalSchedules.map(p => {
                                        if (p.id === professional.id) {
                                          const newSchedules = [...p.schedules];
                                          newSchedules[index].blocks.push({ start: "14:00", end: "18:00" });
                                          return { ...p, schedules: newSchedules };
                                        }
                                        return p;
                                      });
                                      setProfessionalSchedules(newProfessionals);
                                    }}
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Agregar bloque
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                          
                          <div className="bg-muted/50 rounded-lg p-4 mt-4">
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Configuración de Turnos
                            </h4>
                            <div className="grid gap-3">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="duration" className="text-sm">Duración por turno</Label>
                                <Select defaultValue="30">
                                  <SelectTrigger className="w-32 h-9" id="duration">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="15">15 min</SelectItem>
                                    <SelectItem value="20">20 min</SelectItem>
                                    <SelectItem value="30">30 min</SelectItem>
                                    <SelectItem value="45">45 min</SelectItem>
                                    <SelectItem value="60">60 min</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="overlap" className="text-sm">Permitir sobreturno</Label>
                                <input type="checkbox" id="overlap" className="h-4 w-4" defaultChecked />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setIsProfessionalScheduleDialogOpen(false);
                              setSelectedProfessional(null);
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button onClick={handleSaveProfessionalSchedule} disabled={isSaving}>
                            {isSaving ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                              </>
                            ) : (
                              "Guardar Agenda"
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {professional.schedules.filter(s => s.enabled && s.blocks.length > 0).map((schedule, idx) => (
                      <div key={idx} className="text-xs bg-muted/50 rounded px-2 py-1.5">
                        <div className="font-medium">{schedule.day}</div>
                        <div className="text-muted-foreground space-y-0.5">
                          {schedule.blocks.map((block, blockIdx) => (
                            <div key={blockIdx}>{block.start} - {block.end}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {professional.schedules.filter(s => s.enabled && s.blocks.length > 0).length === 0 && (
                      <div className="col-span-full text-sm text-muted-foreground italic">
                        Sin horarios configurados
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DoorOpen className="h-5 w-5" />
                    Salas y Consultorios
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Administra los espacios disponibles para la atención de pacientes.
                  </CardDescription>
                </div>
                <Dialog open={isNewRoomDialogOpen} onOpenChange={setIsNewRoomDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Nueva Sala
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nueva Sala</DialogTitle>
                      <DialogDescription>
                        Crea un nuevo espacio para la atención de pacientes.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="room-name">
                          Nombre de la Sala <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="room-name" 
                          placeholder="Ej: Consultorio 3"
                          value={newRoom.name}
                          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="room-type">
                          Tipo <span className="text-red-500">*</span>
                        </Label>
                        <Select value={newRoom.type} onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}>
                          <SelectTrigger id="room-type">
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Consultorio">Consultorio</SelectItem>
                            <SelectItem value="Procedimientos">Sala de Procedimientos</SelectItem>
                            <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                            <SelectItem value="Urgencias">Sala de Urgencias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="room-description">Descripción (opcional)</Label>
                        <Textarea 
                          id="room-description" 
                          placeholder="Detalles sobre equipamiento, ubicación, etc."
                          rows={3}
                          value={newRoom.description}
                          onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => {
                        setNewRoom({ name: "", type: "", description: "" });
                        setIsNewRoomDialogOpen(false);
                      }}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateRoom} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creando...
                          </>
                        ) : (
                          "Crear Sala"
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                  <Card key={room.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <DoorOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{room.name}</h4>
                              <Badge variant="secondary" className="text-xs mt-1">
                                {room.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingRoom(room);
                              setIsEditRoomDialogOpen(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => setRoomToDelete(room.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <UserCog className="h-5 w-5" />
                    Usuarios del Sistema
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Gestiona los roles y permisos de acceso de tu equipo.
                  </CardDescription>
                </div>
                <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Invitar Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invitar Nuevo Usuario</DialogTitle>
                      <DialogDescription>
                        Envía una invitación para que un nuevo miembro se una al equipo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="user-name">
                          Nombre Completo <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="user-name" 
                          placeholder="Dr. Juan Pérez"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="user-email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="user-email" 
                          type="email" 
                          placeholder="juan.perez@ejemplo.com"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="user-role">
                          Rol <span className="text-red-500">*</span>
                        </Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                          <SelectTrigger id="user-role">
                            <SelectValue placeholder="Selecciona un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="medico">Médico</SelectItem>
                            <SelectItem value="recepcionista">Recepcionista</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="user-phone">Teléfono (opcional)</Label>
                        <Input 
                          id="user-phone"
                          placeholder="+54 11 1234-5678"
                          value={newUser.phone}
                          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => {
                        setNewUser({ name: "", email: "", role: "", phone: "" });
                        setIsNewUserDialogOpen(false);
                      }}>
                        Cancelar
                      </Button>
                      <Button onClick={handleInviteUser} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar Invitación"
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                              {user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {user.role === 'Superadmin' && 'Acceso total al sistema'}
                                {user.role === 'Doctor' && 'Gestión de pacientes'}
                                {user.role === 'Secretaria' && 'Gestión de turnos'}
                                {user.role === 'admin' && 'Administrador del sistema'}
                                {user.role === 'medico' && 'Gestión médica'}
                                {user.role === 'recepcionista' && 'Recepción y turnos'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.role === 'Superadmin' || user.role === 'admin' ? 'default' : 'secondary'}
                            className="font-medium"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => {
                                setEditingUser(user);
                                setIsEditUserDialogOpen(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive"
                              onClick={() => setUserToDelete(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sticky-notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Sticky Notes</CardTitle>
              <CardDescription>
                Personaliza el comportamiento de las notas adhesivas en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Sistema habilitado</Label>
                        <p className="text-sm text-muted-foreground">
                          Activar/desactivar globalmente las notas adhesivas
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Activo
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Mostrar en todas las páginas</Label>
                        <p className="text-sm text-muted-foreground">
                          Renderizar notas flotantes en todo el sistema
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Sí
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Habilitar menciones</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir @menciones en las notas
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Activo
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Permitir notas privadas</Label>
                        <p className="text-sm text-muted-foreground">
                          Solo el creador puede ver sus notas privadas
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Activo
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-base">Días para auto-expiración</Label>
                      <p className="text-sm text-muted-foreground">
                        Las notas se archivarán automáticamente después de este período
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue={7} className="w-20" readOnly />
                      <span className="text-sm text-muted-foreground">días</span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-base">Notas máximas por página</Label>
                      <p className="text-sm text-muted-foreground">
                        Límite de notas visibles simultáneamente
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue={5} className="w-20" readOnly />
                      <span className="text-sm text-muted-foreground">notas</span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-base">Prioridad por defecto</Label>
                      <p className="text-sm text-muted-foreground">
                        Prioridad asignada a nuevas notas
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Normal
                    </Badge>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="space-y-1.5">
                      <Label className="text-base">Colores por rol</Label>
                      <p className="text-sm text-muted-foreground">
                        Cada rol tiene un color distintivo
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className="bg-red-500 text-white">SuperAdmin</Badge>
                      <Badge className="bg-blue-500 text-white">Admin</Badge>
                      <Badge className="bg-green-500 text-white">Médico</Badge>
                      <Badge className="bg-amber-500 text-white">Recepcionista</Badge>
                      <Badge className="bg-violet-500 text-white">Enfermero</Badge>
                      <Badge className="bg-pink-500 text-white">Secretaria</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  💡 Para configurar opciones avanzadas, visita la página de{" "}
                  <a href="/sticky-notes" className="text-blue-600 hover:underline">
                    Sticky Notes
                  </a>
                </p>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  Información Personal
                </CardTitle>
                <CardDescription>
                  Actualiza tus datos profesionales y de contacto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                    DR
                  </div>
                  <div>
                    <Button variant="outline" size="sm" onClick={handleUploadPhoto}>
                      <Upload className="mr-2 h-4 w-4" />
                      Cambiar Foto
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG. Máx. 2MB
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fullname">Nombre Completo</Label>
                  <Input id="fullname" defaultValue="Dr. Juan Pérez" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Input id="specialty" placeholder="Ej: Medicina General" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="license">Matrícula Profesional</Label>
                  <Input id="license" placeholder="MN 12345" />
                </div>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>
                  Administra tu contraseña y configuración de seguridad.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Contraseña</p>
                      <p className="text-xs text-muted-foreground">
                        Última actualización hace 3 meses
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsChangePasswordDialogOpen(true)}>
                      <Key className="mr-2 h-4 w-4" />
                      Cambiar
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Autenticación de dos factores</p>
                      <p className="text-xs text-muted-foreground">
                        Añade una capa extra de seguridad
                      </p>
                    </div>
                    <Badge variant="outline">Inactivo</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setIs2FADialogOpen(true)}>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Activar 2FA
                  </Button>
                </div>

                <div className="rounded-lg border p-4 space-y-2">
                  <p className="font-medium text-sm">Sesiones Activas</p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-medium">MacBook Pro</p>
                        <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                      </div>
                      <Badge variant="secondary">Actual</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog Editar Sala */}
      <Dialog open={isEditRoomDialogOpen} onOpenChange={setIsEditRoomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Sala</DialogTitle>
            <DialogDescription>
              Modifica la información de la sala.
            </DialogDescription>
          </DialogHeader>
          {editingRoom && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-room-name">
                  Nombre de la Sala <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="edit-room-name" 
                  value={editingRoom.name}
                  onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-room-type">
                  Tipo <span className="text-red-500">*</span>
                </Label>
                <Select value={editingRoom.type} onValueChange={(value) => setEditingRoom({ ...editingRoom, type: value })}>
                  <SelectTrigger id="edit-room-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultorio">Consultorio</SelectItem>
                    <SelectItem value="Procedimientos">Sala de Procedimientos</SelectItem>
                    <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                    <SelectItem value="Urgencias">Sala de Urgencias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-room-description">Descripción (opcional)</Label>
                <Textarea 
                  id="edit-room-description"
                  rows={3}
                  value={editingRoom.description || ""}
                  onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setIsEditRoomDialogOpen(false);
              setEditingRoom(null);
            }}>
              Cancelar
            </Button>
            <Button onClick={handleEditRoom} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AlertDialog Eliminar Sala */}
      <AlertDialog open={roomToDelete !== null} onOpenChange={(open) => !open && setRoomToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar sala?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La sala será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRoom} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog Editar Usuario */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifica la información del usuario.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-user-name">
                  Nombre Completo <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="edit-user-name" 
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-user-email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="edit-user-email" 
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-user-role">
                  Rol <span className="text-red-500">*</span>
                </Label>
                <Select value={editingUser.role} onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}>
                  <SelectTrigger id="edit-user-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="medico">Médico</SelectItem>
                    <SelectItem value="recepcionista">Recepcionista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-user-phone">Teléfono</Label>
                <Input 
                  id="edit-user-phone"
                  value={editingUser.phone || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setIsEditUserDialogOpen(false);
              setEditingUser(null);
            }}>
              Cancelar
            </Button>
            <Button onClick={handleEditUser} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AlertDialog Eliminar Usuario */}
      <AlertDialog open={userToDelete !== null} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El usuario perderá acceso al sistema inmediatamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar Usuario
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog Cambiar Contraseña */}
      <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <DialogDescription>
              Ingresa tu contraseña actual y luego la nueva contraseña.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">
                Contraseña Actual <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="current-password" 
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">
                Nueva Contraseña <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="new-password" 
                type="password"
                value={passwordForm.new}
                onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Mínimo 8 caracteres</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">
                Confirmar Nueva Contraseña <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="confirm-password" 
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setPasswordForm({ current: "", new: "", confirm: "" });
              setIsChangePasswordDialogOpen(false);
            }}>
              Cancelar
            </Button>
            <Button onClick={handleChangePassword} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cambiando...
                </>
              ) : (
                "Cambiar Contraseña"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog 2FA */}
      <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Autenticación de Dos Factores</DialogTitle>
            <DialogDescription>
              Escanea el código QR con tu aplicación de autenticación (Google Authenticator, Authy, etc.)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="h-48 w-48 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                <div className="text-center text-muted-foreground">
                  <ShieldCheck className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-xs">Código QR Mockup</p>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Código Manual (alternativo)</Label>
              <div className="flex gap-2">
                <Input value="XXXX XXXX XXXX XXXX" readOnly className="font-mono" />
                <Button variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="2fa-code">Código de Verificación</Label>
              <Input 
                id="2fa-code" 
                placeholder="000000"
                maxLength={6}
                className="font-mono text-center text-lg tracking-widest"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIs2FADialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEnable2FA} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Activando...
                </>
              ) : (
                "Activar 2FA"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
