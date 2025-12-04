"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UserPlus,
  Shield,
  Stethoscope,
  UserCheck,
  CheckCircle,
  Edit,
  Trash2,
  Search,
  Crown,
  Download,
  Clock,
  Lock,
  Unlock,
  AlertCircle,
  Users,
} from "lucide-react";
import { UserRole, ROLE_PERMISSIONS, formatRoleName, Permission } from "@/types/subscription";
import { toast } from "sonner";

// Mock data de usuarios
const MOCK_USERS = [
  {
    id: "1",
    firstName: "Martín",
    lastName: "Navarro",
    email: "martin@consultorio.com",
    role: "SUPERADMIN" as UserRole,
    avatarUrl: null,
    phone: "+54 11 1234-5678",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2025-12-03 09:15",
  },
  {
    id: "2",
    firstName: "Ana",
    lastName: "López",
    email: "ana.lopez@consultorio.com",
    role: "MEDICO" as UserRole,
    avatarUrl: null,
    phone: "+54 11 2345-6789",
    status: "active",
    createdAt: "2024-02-20",
    lastLogin: "2025-12-03 08:45",
  },
  {
    id: "3",
    firstName: "Carlos",
    lastName: "Gómez",
    email: "carlos.gomez@consultorio.com",
    role: "ADMIN" as UserRole,
    avatarUrl: null,
    phone: "+54 11 3456-7890",
    status: "active",
    createdAt: "2024-03-10",
    lastLogin: "2025-12-02 18:30",
  },
  {
    id: "4",
    firstName: "María",
    lastName: "Rodríguez",
    email: "maria.rodriguez@consultorio.com",
    role: "RECEPCIONISTA" as UserRole,
    avatarUrl: null,
    phone: "+54 11 4567-8901",
    status: "active",
    createdAt: "2024-03-25",
    lastLogin: "2025-12-03 07:00",
  },
  {
    id: "5",
    firstName: "Laura",
    lastName: "Fernández",
    email: "laura.fernandez@consultorio.com",
    role: "MEDICO" as UserRole,
    avatarUrl: null,
    phone: "+54 11 5678-9012",
    status: "inactive",
    createdAt: "2024-04-15",
    lastLogin: "2025-11-20 14:22",
  },
];

// Mock data de activity logs
const MOCK_ACTIVITY_LOGS = [
  {
    id: "1",
    userId: "1",
    userName: "Martín Navarro",
    action: "Cambió rol de usuario",
    details: "Laura Fernández: RECEPCIONISTA → MEDICO",
    timestamp: "2025-12-03 09:15",
    type: "role_change",
  },
  {
    id: "2",
    userId: "3",
    userName: "Carlos Gómez",
    action: "Creó nuevo usuario",
    details: "María Rodríguez (Recepcionista)",
    timestamp: "2025-12-02 16:45",
    type: "user_created",
  },
  {
    id: "3",
    userId: "1",
    userName: "Martín Navarro",
    action: "Modificó permisos",
    details: "Rol MEDICO: agregó 'prescriptions.send'",
    timestamp: "2025-12-01 11:30",
    type: "permission_change",
  },
  {
    id: "4",
    userId: "3",
    userName: "Carlos Gómez",
    action: "Desactivó usuario",
    details: "Laura Fernández (cuenta suspendida)",
    timestamp: "2025-11-30 14:20",
    type: "user_disabled",
  },
  {
    id: "5",
    userId: "1",
    userName: "Martín Navarro",
    action: "Exportó configuración",
    details: "Roles y permisos exportados a Excel",
    timestamp: "2025-11-28 10:00",
    type: "export",
  },
];

const ROLE_ICONS = {
  SUPERADMIN: Crown,
  ADMIN: Shield,
  MEDICO: Stethoscope,
  RECEPCIONISTA: UserCheck,
};

const ROLE_COLORS = {
  SUPERADMIN: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  ADMIN: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  MEDICO: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  RECEPCIONISTA: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

// Permisos agrupados por módulo para visualización
const PERMISSION_GROUPS = {
  "Pacientes": [
    { key: "patients.view", label: "Ver pacientes" },
    { key: "patients.create", label: "Crear pacientes" },
    { key: "patients.edit", label: "Editar pacientes" },
    { key: "patients.delete", label: "Eliminar pacientes" },
    { key: "patients.export", label: "Exportar datos" },
    { key: "patients.view_medical_history", label: "Ver historia clínica" },
  ],
  "Agenda & Turnos": [
    { key: "appointments.view", label: "Ver turnos" },
    { key: "appointments.create", label: "Crear turnos" },
    { key: "appointments.edit", label: "Editar turnos" },
    { key: "appointments.confirm", label: "Confirmar turnos" },
    { key: "appointments.cancel", label: "Cancelar turnos" },
    { key: "appointments.reschedule", label: "Reprogramar turnos" },
    { key: "appointments.export", label: "Exportar agenda" },
  ],
  "Recetas (PRO)": [
    { key: "prescriptions.view", label: "Ver recetas" },
    { key: "prescriptions.generate", label: "Generar recetas" },
    { key: "prescriptions.send", label: "Enviar recetas" },
    { key: "prescriptions.view_history", label: "Ver historial" },
    { key: "prescriptions.templates", label: "Gestionar plantillas" },
  ],
  "Facturación (PRO)": [
    { key: "billing.view", label: "Ver facturación" },
    { key: "billing.create", label: "Crear facturas" },
    { key: "billing.edit", label: "Editar facturas" },
    { key: "billing.delete", label: "Eliminar facturas" },
    { key: "billing.export", label: "Exportar facturas" },
    { key: "billing.afip", label: "Integración AFIP" },
  ],
  "Comunicaciones (PREMIUM)": [
    { key: "communications.send_whatsapp", label: "Enviar WhatsApp" },
    { key: "communications.send_email", label: "Enviar Email" },
    { key: "communications.send_sms", label: "Enviar SMS" },
    { key: "communications.view_history", label: "Ver historial" },
    { key: "communications.templates", label: "Gestionar plantillas" },
    { key: "communications.chat", label: "Chat interno" },
  ],
  "Reportes (PRO)": [
    { key: "reports.view", label: "Ver reportes" },
    { key: "reports.export", label: "Exportar reportes" },
    { key: "reports.analytics", label: "Analytics avanzado" },
  ],
  "Atención Domiciliaria": [
    { key: "ambulatorios.view", label: "Ver visitas" },
    { key: "ambulatorios.manage_visits", label: "Gestionar visitas" },
    { key: "ambulatorios.manage_zones", label: "Gestionar zonas" },
  ],
  "Telemedicina (ENTERPRISE)": [
    { key: "telemedicine.start_call", label: "Iniciar videollamada" },
    { key: "telemedicine.view_recordings", label: "Ver grabaciones" },
  ],
  "Auditoría (ENTERPRISE)": [
    { key: "audit.view_logs", label: "Ver logs" },
    { key: "audit.export", label: "Exportar logs" },
  ],
  "Sistema": [
    { key: "system.manage_users", label: "Gestionar usuarios" },
    { key: "system.manage_roles", label: "Gestionar roles" },
    { key: "system.manage_settings", label: "Configuración" },
    { key: "system.manage_modules", label: "Gestionar módulos" },
    { key: "system.view_config", label: "Ver configuración" },
  ],
};

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "ALL">("ALL");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null);
  const [selectedRoleForPermissions, setSelectedRoleForPermissions] = useState<UserRole>("ADMIN");

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "ALL" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: UserRole) => {
    const Icon = ROLE_ICONS[role];
    return Icon;
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usuarios y Roles</h2>
          <p className="text-muted-foreground">
            Gestiona el acceso y permisos de tu equipo
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              <DialogDescription>
                Agrega un miembro a tu equipo y asigna su rol
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" placeholder="Juan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" placeholder="Pérez" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="juan.perez@consultorio.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="+54 11 1234-5678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="MEDICO">Médico</SelectItem>
                    <SelectItem value="RECEPCIONISTA">Recepcionista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Crear Usuario</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="mr-2 h-4 w-4" />
            Roles y Permisos
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Lock className="mr-2 h-4 w-4" />
            Matriz de Permisos
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Clock className="mr-2 h-4 w-4" />
            Actividad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Equipo del Consultorio</CardTitle>
                  <CardDescription>
                    {filteredUsers.length} {filteredUsers.length === 1 ? "usuario" : "usuarios"} en el sistema
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuarios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole | "ALL")}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Todos los roles</SelectItem>
                      <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MEDICO">Médico</SelectItem>
                      <SelectItem value="RECEPCIONISTA">Recepcionista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Fecha Alta</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const RoleIcon = getRoleIcon(user.role);
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {user.firstName[0]}{user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`gap-1 ${ROLE_COLORS[user.role]}`}>
                            <RoleIcon className="h-3 w-3" />
                            {formatRoleName(user.role)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.phone}
                        </TableCell>
                        <TableCell>
                          {user.status === "active" ? (
                            <Badge variant="outline" className="gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              Activo
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1 text-red-500">
                              <AlertCircle className="h-3 w-3" />
                              Inactivo
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString("es-AR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditDialogOpen(true);
                              }}
                              title="Editar usuario"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                if (user.status === "active") {
                                  toast.warning(`Usuario ${user.firstName} ${user.lastName} desactivado`);
                                } else {
                                  toast.success(`Usuario ${user.firstName} ${user.lastName} reactivado`);
                                }
                              }}
                              title={user.status === "active" ? "Desactivar usuario" : "Reactivar usuario"}
                            >
                              {user.status === "active" ? (
                                <Lock className="h-4 w-4 text-orange-500" />
                              ) : (
                                <Unlock className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                            {user.role !== "SUPERADMIN" && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive"
                                onClick={() => {
                                  toast.error(`Usuario ${user.firstName} ${user.lastName} eliminado`, {
                                    description: "Esta acción no se puede deshacer"
                                  });
                                }}
                                title="Eliminar usuario"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {(Object.keys(ROLE_PERMISSIONS) as UserRole[]).map((role) => {
              const RoleIcon = getRoleIcon(role);
              const permissions = ROLE_PERMISSIONS[role];

              return (
                <Card key={role}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${ROLE_COLORS[role]}`}>
                          <RoleIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle>{formatRoleName(role)}</CardTitle>
                          <CardDescription>
                            {permissions.length === 1 && permissions[0] === "*"
                              ? "Acceso completo al sistema"
                              : `${permissions.length} permisos asignados`}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRoleForPermissions(role);
                          setIsPermissionsDialogOpen(true);
                        }}
                        title="Ver detalles de permisos"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {permissions[0] === "*" ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Acceso total sin restricciones</span>
                      </div>
                    ) : (
                      <ScrollArea className="h-[200px]">
                        <ul className="space-y-2 pr-4">
                          {permissions.slice(0, 10).map((permission) => (
                            <li key={permission} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {String(permission).split('.').map(part => 
                                  part.charAt(0).toUpperCase() + part.slice(1)
                                ).join(' - ')}
                              </span>
                            </li>
                          ))}
                          {permissions.length > 10 && (
                            <li className="text-sm text-muted-foreground italic pl-6">
                              + {permissions.length - 10} permisos más...
                            </li>
                          )}
                        </ul>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Matriz de Permisos */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Matriz de Permisos por Módulo</CardTitle>
                  <CardDescription>
                    Visualiza qué puede hacer cada rol en cada módulo del sistema
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success("Matriz de permisos exportada", {
                      description: "Descargando Excel con configuración completa"
                    });
                  }}
                  title="Exportar matriz a Excel"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-6 pr-4">
                  {Object.entries(PERMISSION_GROUPS).map(([moduleName, permissions]) => (
                    <div key={moduleName} className="rounded-lg border p-4">
                      <h3 className="font-semibold mb-4 text-lg">{moduleName}</h3>
                      <div className="space-y-2">
                        {/* Header */}
                        <div className="grid grid-cols-5 gap-2 pb-2 border-b">
                          <div className="text-sm font-medium text-muted-foreground">
                            Permiso
                          </div>
                          {(["SUPERADMIN", "ADMIN", "MEDICO", "RECEPCIONISTA"] as UserRole[]).map(role => (
                            <div key={role} className="text-center">
                              <Badge className={`text-xs ${ROLE_COLORS[role]}`}>
                                {formatRoleName(role).split(' ')[0]}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        {/* Permissions rows */}
                        {permissions.map((perm) => (
                          <div key={perm.key} className="grid grid-cols-5 gap-2 py-2 border-b border-muted">
                            <div className="text-sm">{perm.label}</div>
                            {(["SUPERADMIN", "ADMIN", "MEDICO", "RECEPCIONISTA"] as UserRole[]).map(role => {
                              const rolePerms = ROLE_PERMISSIONS[role];
                              const hasPermission = role === "SUPERADMIN" || rolePerms.includes(perm.key as never);
                              return (
                                <div key={role} className="flex justify-center items-center">
                                  {hasPermission ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registro de Actividad</CardTitle>
                  <CardDescription>
                    Historial de cambios en usuarios, roles y permisos
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="ALL">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de acción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Todas las acciones</SelectItem>
                      <SelectItem value="user_created">Usuario creado</SelectItem>
                      <SelectItem value="user_disabled">Usuario desactivado</SelectItem>
                      <SelectItem value="role_change">Cambio de rol</SelectItem>
                      <SelectItem value="permission_change">Cambio de permiso</SelectItem>
                      <SelectItem value="export">Exportación</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast.success("Logs exportados a Excel");
                    }}
                    title="Exportar logs"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_ACTIVITY_LOGS.map((log) => (
                  <div 
                    key={log.id} 
                    className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${
                      log.type === "role_change" ? "bg-blue-100 text-blue-700" :
                      log.type === "user_created" ? "bg-green-100 text-green-700" :
                      log.type === "user_disabled" ? "bg-red-100 text-red-700" :
                      log.type === "permission_change" ? "bg-purple-100 text-purple-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {log.type === "role_change" && <Shield className="h-5 w-5" />}
                      {log.type === "user_created" && <UserPlus className="h-5 w-5" />}
                      {log.type === "user_disabled" && <Lock className="h-5 w-5" />}
                      {log.type === "permission_change" && <Edit className="h-5 w-5" />}
                      {log.type === "export" && <Download className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{log.action}</p>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {log.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{log.details}</p>
                      <p className="text-xs text-muted-foreground">
                        Por: {log.userName}
                      </p>
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
