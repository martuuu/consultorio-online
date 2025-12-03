"use client";

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
  UserCog
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

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
        <p className="text-muted-foreground">
          Administra tu consultorio, usuarios y preferencias generales.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rooms">Salas</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
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
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horarios de Atención
                </CardTitle>
                <CardDescription>
                  Define los horarios de funcionamiento del consultorio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">Lunes a Viernes</span>
                    <div className="flex gap-2 items-center text-sm">
                      <Input className="w-20 h-8" type="time" defaultValue="09:00" />
                      <span>-</span>
                      <Input className="w-20 h-8" type="time" defaultValue="18:00" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">Sábados</span>
                    <div className="flex gap-2 items-center text-sm">
                      <Input className="w-20 h-8" type="time" defaultValue="09:00" />
                      <span>-</span>
                      <Input className="w-20 h-8" type="time" defaultValue="13:00" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3 opacity-50">
                    <span className="text-sm font-medium">Domingos</span>
                    <Badge variant="outline">Cerrado</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Editar Horarios
                </Button>
              </CardContent>
            </Card>
          </div>
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
                <Dialog>
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
                        <Label htmlFor="room-name">Nombre de la Sala</Label>
                        <Input id="room-name" placeholder="Ej: Consultorio 3" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="room-type">Tipo</Label>
                        <Select>
                          <SelectTrigger id="room-type">
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultorio">Consultorio</SelectItem>
                            <SelectItem value="procedimientos">Sala de Procedimientos</SelectItem>
                            <SelectItem value="laboratorio">Laboratorio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="room-description">Descripción (opcional)</Label>
                        <Textarea 
                          id="room-description" 
                          placeholder="Detalles sobre equipamiento, ubicación, etc."
                          rows={3}
                        />
                      </div>
                      <Button className="w-full">Crear Sala</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {roomsData.map((room) => (
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
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
                <Dialog>
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
                        <Label htmlFor="user-name">Nombre Completo</Label>
                        <Input id="user-name" placeholder="Dr. Juan Pérez" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input id="user-email" type="email" placeholder="juan.perez@ejemplo.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="user-role">Rol</Label>
                        <Select>
                          <SelectTrigger id="user-role">
                            <SelectValue placeholder="Selecciona un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="superadmin">Superadmin</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="secretaria">Secretaria</SelectItem>
                            <SelectItem value="enfermero">Enfermero</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Enviar Invitación</Button>
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
                    {usersData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {user.role === 'Superadmin' && 'Acceso total al sistema'}
                                {user.role === 'Doctor' && 'Gestión de pacientes'}
                                {user.role === 'Secretaria' && 'Gestión de turnos'}
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
                            variant={user.role === 'Superadmin' ? 'default' : 'secondary'}
                            className="font-medium"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
                    <Button variant="outline" size="sm">
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
                    <Button variant="outline" size="sm">
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
                  <Button variant="outline" size="sm" className="w-full">
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
    </div>
  );
}
