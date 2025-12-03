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
import { FileText, Download, Send, Eye, Plus, Search } from "lucide-react";

// Mock data
const MOCK_PATIENTS = [
  { id: 1, name: "Juan Perez", dni: "35123456" },
  { id: 2, name: "Maria Garcia", dni: "28987654" },
  { id: 3, name: "Carlos Lopez", dni: "42555666" },
];

const MOCK_RECIPES = [
  {
    id: 1,
    patientName: "Juan Perez",
    date: "2025-12-02",
    type: "Receta Médica",
    medications: "Ibuprofeno 400mg c/8hs por 5 días",
    status: "Enviada"
  },
  {
    id: 2,
    patientName: "Maria Garcia",
    date: "2025-12-01",
    type: "Orden de Estudios",
    medications: "Hemograma completo, Glucemia",
    status: "Pendiente"
  },
  {
    id: 3,
    patientName: "Carlos Lopez",
    date: "2025-11-30",
    type: "Certificado Médico",
    medications: "Reposo por 3 días",
    status: "Enviada"
  },
];

const TEMPLATES = [
  { id: 1, name: "Receta Médica", icon: "💊" },
  { id: 2, name: "Orden de Estudios", icon: "🔬" },
  { id: 3, name: "Certificado Médico", icon: "📄" },
  { id: 4, name: "Orden de Internación", icon: "🏥" },
];

export default function RecetasPage() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recetas y Órdenes</h1>
          <p className="text-muted-foreground">Genera PDFs profesionales con firma digital</p>
        </div>
        <Badge className="bg-blue-500 text-white">PRO</Badge>
      </div>

      <Tabs defaultValue="new" className="space-y-6">
        <TabsList>
          <TabsTrigger value="new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Receta
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileText className="mr-2 h-4 w-4" />
            Historial
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Eye className="mr-2 h-4 w-4" />
            Plantillas
          </TabsTrigger>
        </TabsList>

        {/* Nueva Receta */}
        <TabsContent value="new" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Generar Documento</CardTitle>
                <CardDescription>Completa los datos del paciente y el contenido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente</Label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_PATIENTS.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.name} - DNI: {patient.dni}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Tipo de Documento</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plantilla" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEMPLATES.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.icon} {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnóstico</Label>
                  <Input id="diagnosis" placeholder="Ej: J00 - Rinofaringitis aguda" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Contenido / Medicación</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Ej: Ibuprofeno 400mg c/8hs por 5 días, reposo domiciliario..."
                    rows={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observaciones</Label>
                  <Textarea 
                    id="observations" 
                    placeholder="Observaciones adicionales..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Vista Previa
                  </Button>
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                    <Download className="mr-2 h-4 w-4" />
                    Generar PDF
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar por Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>Así se verá tu documento generado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-white p-8 text-gray-800 shadow-inner min-h-[600px]">
                  <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-primary">Dr. Martín Navarro</h2>
                    <p className="text-sm text-gray-600">Médico Clínico - M.N. 123456</p>
                    <p className="text-sm text-gray-600">Av. Corrientes 1234, CABA</p>
                    <p className="text-sm text-gray-600">Tel: +54 11 1234-5678</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">RECETA MÉDICA</h3>
                    <p className="text-sm text-gray-600">Fecha: {new Date().toLocaleDateString('es-AR')}</p>
                  </div>

                  <div className="mb-6">
                    <p className="font-semibold">Paciente: <span className="font-normal">{selectedPatient ? MOCK_PATIENTS.find(p => p.id.toString() === selectedPatient)?.name : "..."}</span></p>
                    <p className="font-semibold">DNI: <span className="font-normal">{selectedPatient ? MOCK_PATIENTS.find(p => p.id.toString() === selectedPatient)?.dni : "..."}</span></p>
                  </div>

                  <div className="mb-8">
                    <p className="font-semibold mb-2">Prescripción:</p>
                    <div className="pl-4 text-sm text-gray-700 italic">
                      Rp/ [El contenido aparecerá aquí]
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t">
                    <div className="text-center">
                      <div className="mb-2">____________________</div>
                      <p className="text-sm font-semibold">Firma Digital</p>
                      <p className="text-xs text-gray-600">Dr. Martín Navarro - M.N. 123456</p>
                    </div>
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
                  <CardTitle>Historial de Documentos</CardTitle>
                  <CardDescription>Todos los documentos generados</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    Buscar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_RECIPES.map((recipe) => (
                  <div key={recipe.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{recipe.patientName}</p>
                        <p className="text-sm text-muted-foreground">{recipe.type} - {recipe.medications}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{recipe.date}</p>
                        <Badge variant={recipe.status === "Enviada" ? "default" : "secondary"} className="text-xs">
                          {recipe.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plantillas */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TEMPLATES.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">{template.icon}</div>
                    <Badge variant="outline">Plantilla</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Plantilla predefinida lista para usar</p>
                  <Button className="w-full" size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Usar Plantilla
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personaliza tu Membrete</CardTitle>
              <CardDescription>Configura los datos que aparecerán en todos tus documentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nombre del Profesional</Label>
                  <Input placeholder="Dr. Martín Navarro" />
                </div>
                <div className="space-y-2">
                  <Label>Matrícula Nacional</Label>
                  <Input placeholder="M.N. 123456" />
                </div>
                <div className="space-y-2">
                  <Label>Especialidad</Label>
                  <Input placeholder="Médico Clínico" />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input placeholder="+54 11 1234-5678" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Dirección del Consultorio</Label>
                  <Input placeholder="Av. Corrientes 1234, CABA, Buenos Aires" />
                </div>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">Guardar Configuración</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
