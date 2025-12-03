"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { UserRole, ROLE_PERMISSIONS, formatRoleName } from "@/types/subscription";

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

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "ALL">("ALL");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
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
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            Activo
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString("es-AR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
                  </CardHeader>
                  <CardContent>
                    {permissions[0] === "*" ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Acceso total sin restricciones</span>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {permissions.map((permission) => (
                          <li key={permission} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-muted-foreground">
                              {permission.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
