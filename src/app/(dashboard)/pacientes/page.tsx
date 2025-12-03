"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  FileText, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import patientsData from "@/lib/data/patients.json";
import insuranceData from "@/lib/data/insurance-providers.json";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lastVisit: string;
  dni: string;
  birthDate: string;
  bloodType: string;
  allergies: string[];
  medicalBackground: string;
}

export default function PacientesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Form state
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    birthDate: "",
    email: "",
    phone: "",
    bloodType: "",
    insuranceProvider: "",
    insuranceNumber: "",
    address: "",
    allergies: "",
    medicalBackground: "",
  });

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age > 0 ? `${age} años` : "";
  };

  const handleCreatePatient = () => {
    // Validación básica
    if (!newPatient.firstName || !newPatient.lastName || !newPatient.dni) {
      toast.error("Error de validación", {
        description: "Por favor completa los campos obligatorios (Nombre, Apellido, DNI)",
      });
      return;
    }

    // Validar DNI (solo números, 7-8 dígitos)
    if (!/^\d{7,8}$/.test(newPatient.dni)) {
      toast.error("DNI inválido", {
        description: "El DNI debe contener entre 7 y 8 dígitos",
      });
      return;
    }

    // Validar email si está presente
    if (newPatient.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newPatient.email)) {
      toast.error("Email inválido", {
        description: "Por favor ingresa un email válido",
      });
      return;
    }

    // Validar teléfono si está presente
    if (newPatient.phone && !/^[0-9\s\-\+\(\)]+$/.test(newPatient.phone)) {
      toast.error("Teléfono inválido", {
        description: "El teléfono solo puede contener números y símbolos (+, -, espacios, paréntesis)",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular creación
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Paciente creado exitosamente", {
        description: `${newPatient.firstName} ${newPatient.lastName} fue agregado al sistema`,
      });
      setIsNewPatientDialogOpen(false);
      // Reset form
      setNewPatient({
        firstName: "",
        lastName: "",
        dni: "",
        birthDate: "",
        email: "",
        phone: "",
        bloodType: "",
        insuranceProvider: "",
        insuranceNumber: "",
        address: "",
        allergies: "",
        medicalBackground: "",
      });
    }, 1000);
  };

  // Filtrar y buscar
  const filteredPatients = useMemo(() => {
    return (patientsData as Patient[]).filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || patient.dni.includes(search) || patient.email.toLowerCase().includes(search);
    });
  }, [searchTerm]);

  // Paginación
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedPatients.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleDeleteSelected = () => {
    alert(`Eliminando ${selectedIds.length} paciente(s)`);
    setSelectedIds([]);
  };

  const getLastVisitBadge = (lastVisit: string) => {
    const visitDate = new Date(lastVisit);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - visitDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 30) {
      return <Badge variant="default" className="bg-green-600">Reciente</Badge>;
    } else if (diffDays <= 90) {
      return <Badge variant="secondary">Hace {diffDays} días</Badge>;
    } else {
      return <Badge variant="outline">Hace {Math.floor(diffDays / 30)} meses</Badge>;
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground mt-1">
            {filteredPatients.length} pacientes registrados
          </p>
        </div>
        <Dialog open={isNewPatientDialogOpen} onOpenChange={setIsNewPatientDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nuevo Paciente</DialogTitle>
              <DialogDescription>
                Completa los datos del paciente. Los campos marcados con * son obligatorios.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Datos Personales */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Datos Personales
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Juan"
                      value={newPatient.firstName}
                      onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Apellido <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Pérez"
                      value={newPatient.lastName}
                      onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dni">
                      DNI <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dni"
                      placeholder="12345678"
                      value={newPatient.dni}
                      onChange={(e) => setNewPatient({ ...newPatient, dni: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground">
                            <UserCircle className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>La edad se calculará automáticamente</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="birthDate"
                      type="date"
                      value={newPatient.birthDate}
                      onChange={(e) => setNewPatient({ ...newPatient, birthDate: e.target.value })}
                    />
                    {newPatient.birthDate && (
                      <p className="text-sm text-muted-foreground">
                        Edad: {calculateAge(newPatient.birthDate)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Contacto
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan.perez@example.com"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      placeholder="+54 11 1234-5678"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      placeholder="Av. Corrientes 1234, CABA"
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Datos Médicos */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Datos Médicos
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Tipo de Sangre</Label>
                    <Select
                      value={newPatient.bloodType}
                      onValueChange={(value) => setNewPatient({ ...newPatient, bloodType: value })}
                    >
                      <SelectTrigger id="bloodType">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Alergias</Label>
                    <Input
                      id="allergies"
                      placeholder="Penicilina, Polen, etc."
                      value={newPatient.allergies}
                      onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Obra Social */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Obra Social / Prepaga
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Obra Social</Label>
                    <Select
                      value={newPatient.insuranceProvider}
                      onValueChange={(value) => setNewPatient({ ...newPatient, insuranceProvider: value })}
                    >
                      <SelectTrigger id="insuranceProvider">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {insuranceData.map((insurance) => (
                          <SelectItem key={insurance.id} value={insurance.name}>
                            {insurance.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceNumber">Número de Afiliado</Label>
                    <Input
                      id="insuranceNumber"
                      placeholder="123456789"
                      value={newPatient.insuranceNumber}
                      onChange={(e) => setNewPatient({ ...newPatient, insuranceNumber: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Antecedentes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Antecedentes Médicos
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="medicalBackground">Observaciones</Label>
                  <Textarea
                    id="medicalBackground"
                    placeholder="HTA, DBT, cirugías previas, medicación actual, etc."
                    rows={4}
                    value={newPatient.medicalBackground}
                    onChange={(e) => setNewPatient({ ...newPatient, medicalBackground: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsNewPatientDialogOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button onClick={handleCreatePatient} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Paciente
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Búsqueda y acciones */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre, DNI o email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        {selectedIds.length > 0 && (
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar ({selectedIds.length})
          </Button>
        )}
      </div>

      {/* Tabla */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedIds.length === paginatedPatients.length && paginatedPatients.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Última Visita</TableHead>
              <TableHead>Tipo de Sangre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No se encontraron pacientes
                </TableCell>
              </TableRow>
            ) : (
              paginatedPatients.map((patient) => {
                const isSelected = selectedIds.includes(patient.id);
                return (
                  <TableRow 
                    key={patient.id}
                    className={`cursor-pointer hover:bg-muted/50 ${isSelected ? 'bg-muted/30' : ''}`}
                    onClick={() => router.push(`/pacientes/${patient.id}`)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked: boolean) => handleSelectOne(patient.id, checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {patient.firstName[0]}{patient.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium">{patient.firstName} {patient.lastName}</p>
                          <p className="text-xs text-muted-foreground">{patient.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{patient.dni}</TableCell>
                    <TableCell className="text-sm">{patient.phone}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm">{format(new Date(patient.lastVisit), "dd/MM/yyyy", { locale: es })}</span>
                        {getLastVisitBadge(patient.lastVisit)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {patient.bloodType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => router.push(`/pacientes/${patient.id}`)}>
                            <UserCircle className="mr-2 h-4 w-4" />
                            Ver ficha completa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/pacientes/${patient.id}`)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Historia clínica
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Nuevo turno
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar información
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar paciente
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredPatients.length)} de {filteredPatients.length} pacientes
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
