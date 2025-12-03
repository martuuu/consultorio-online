"use client";

import { use, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Phone, 
  Mail, 
  Calendar as CalendarIcon, 
  FileText, 
  Plus, 
  Paperclip,
  Clock,
  Activity,
  Droplets,
  Weight,
  Ruler,
  AlertCircle,
  Stethoscope,
  MessageSquare,
  Download,
  Search,
  Calculator,
  FileSignature,
  Tag,
  Building2,
  AlertTriangle,
  MoreHorizontal,
  Lightbulb,
  Pill,
  FileCheck,
  FilePlus,
  Loader2,
  X
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import patientsData from "@/lib/data/patients.json";
import historyData from "@/lib/data/medical-history.json";
import cie10Data from "@/lib/data/cie10-codes.json";
import snippetsData from "@/lib/data/text-snippets.json";
import type { Patient, MedicalRecord, CIE10Code, TextSnippet, PatientTag } from "@/types";
import { toast } from "sonner";
import { generatePrescription } from "@/lib/pdf-generator";

export default function PatientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const patientId = parseInt(resolvedParams.id);
  const patient = patientsData.find(p => p.id === patientId) as Patient | undefined;
  const history = (historyData as MedicalRecord[]).filter(h => h.patientId === patientId);

  const [newNote, setNewNote] = useState("");
  const [searchCIE10, setSearchCIE10] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [weight, setWeight] = useState(patient?.weight?.toString() || "");
  const [height, setHeight] = useState(patient?.height?.toString() || "");
  const [showSnippets, setShowSnippets] = useState(false);
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Estado del formulario de receta
  const [prescriptionForm, setPrescriptionForm] = useState({
    diagnosis: "",
    medications: [{ name: "", dosage: "", duration: "" }],
    observations: "",
  });

  const handleAddMedication = () => {
    setPrescriptionForm({
      ...prescriptionForm,
      medications: [...prescriptionForm.medications, { name: "", dosage: "", duration: "" }],
    });
  };

  const handleRemoveMedication = (index: number) => {
    const newMedications = prescriptionForm.medications.filter((_, i) => i !== index);
    setPrescriptionForm({
      ...prescriptionForm,
      medications: newMedications.length > 0 ? newMedications : [{ name: "", dosage: "", duration: "" }],
    });
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const newMedications = [...prescriptionForm.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setPrescriptionForm({ ...prescriptionForm, medications: newMedications });
  };

  const handleGeneratePrescription = async () => {
    // Validación
    const hasValidMedication = prescriptionForm.medications.some(
      med => med.name.trim() !== ""
    );

    if (!prescriptionForm.diagnosis) {
      toast.error("Diagnóstico requerido", {
        description: "Por favor ingresa un diagnóstico CIE-10",
      });
      return;
    }

    if (!hasValidMedication) {
      toast.error("Medicación requerida", {
        description: "Debes agregar al menos un medicamento",
      });
      return;
    }

    setIsGeneratingPDF(true);

    try {
      // Simular generación de PDF
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generar PDF real
      if (patient) {
        const age = patient.birthDate 
          ? Math.floor((new Date().getTime() - new Date(patient.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
          : 0;

        generatePrescription({
          patientName: `${patient.firstName} ${patient.lastName}`,
          patientDNI: patient.dni,
          patientAge: age,
          date: new Date(),
          diagnosis: prescriptionForm.diagnosis,
          medications: prescriptionForm.medications
            .filter(med => med.name.trim() !== "")
            .map(med => ({
              name: med.name,
              dosage: med.dosage,
              frequency: "Cada 8 horas",
              duration: med.duration,
              instructions: prescriptionForm.observations,
            })),
          doctorName: "Dr. Martín Navarro",
          doctorLicense: "M.N. 123456",
          clinicName: "Consultorio Online",
          clinicAddress: "Av. Corrientes 1234, CABA",
          clinicPhone: "+54 11 1234-5678",
        });
      }

      toast.success("Receta generada", {
        description: "El PDF se descargó correctamente",
      });

      setIsPrescriptionDialogOpen(false);
      // Reset form
      setPrescriptionForm({
        diagnosis: "",
        medications: [{ name: "", dosage: "", duration: "" }],
        observations: "",
      });
    } catch {
      toast.error("Error al generar PDF", {
        description: "Ocurrió un error al generar la receta",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Calcular IMC
  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w && h && h > 0) {
      const bmiValue = w / ((h / 100) ** 2);
      return bmiValue.toFixed(1);
    }
    return null;
  }, [weight, height]);

  const getBMICategory = (bmi: string | null) => {
    if (!bmi) return null;
    const value = parseFloat(bmi);
    if (value < 18.5) return { label: "Bajo peso", color: "text-blue-600" };
    if (value < 25) return { label: "Normal", color: "text-green-600" };
    if (value < 30) return { label: "Sobrepeso", color: "text-amber-600" };
    return { label: "Obesidad", color: "text-red-600" };
  };

  // Filtrar diagnósticos CIE-10
  const filteredCIE10 = useMemo(() => {
    if (!searchCIE10) return [];
    const search = searchCIE10.toLowerCase();
    return (cie10Data as CIE10Code[]).filter(
      (item) =>
        item.code.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
    );
  }, [searchCIE10]);

  // Insertar snippet
  const handleSnippetSelect = (snippet: TextSnippet) => {
    setNewNote(newNote + "\n\n" + snippet.content);
    setShowSnippets(false);
  };

  // Detectar trigger de snippet (ej: /gripe)
  const handleNoteChange = (value: string) => {
    setNewNote(value);
    const lastWord = value.split(/\s/).pop() || "";
    if (lastWord.startsWith("/")) {
      setShowSnippets(true);
    } else {
      setShowSnippets(false);
    }
  };

  const getTagColor = (tag: PatientTag) => {
    switch (tag) {
      case "VIP":
        return "bg-purple-600";
      case "Deudor":
        return "bg-red-600";
      case "Crónico":
        return "bg-blue-600";
      case "Complejo":
        return "bg-amber-600";
      case "Nuevo":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  if (!patient) {
    return <div>Paciente no encontrado</div>;
  }

  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="flex flex-col space-y-6">
      {/* Header with Patient Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                {patient.firstName[0]}{patient.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{patient.firstName} {patient.lastName}</h1>
                    {patient.tags && patient.tags.map((tag) => (
                      <Badge key={tag} className={getTagColor(tag as PatientTag)}>
                        {tag}
                      </Badge>
                    ))}
                    {patient.absenteeCount && patient.absenteeCount >= 2 && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {patient.absenteeCount} faltas
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">DNI: {patient.dni}</p>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="group">
                        <FileSignature className="mr-2 h-4 w-4" />
                        Receta
                        <span className="ml-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          (En desarrollo)
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Generador de Recetas PDF</DialogTitle>
                        <DialogDescription>
                          Esta funcionalidad estará disponible próximamente. Permitirá generar recetas médicas en PDF con el membrete del consultorio.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="p-4 bg-muted rounded-lg flex items-center gap-3">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        <p className="text-sm">Feature en desarrollo - Próximamente disponible</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nueva Consulta
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-1">
                    <span>{patient.phone}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 group">
                      <MessageSquare className="h-3 w-3" />
                      <span className="sr-only">WhatsApp (En desarrollo)</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Última visita: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.insuranceProvider || "Sin cobertura"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: History & Notes */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Nueva Entrada - Historia Clínica
              </CardTitle>
              <CardDescription>
                Usa &ldquo;/&rdquo; para snippets rápidos (ej: /gripe, /control, /hta)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Diagnosis Search - CIE-10 */}
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico (CIE-10)</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="diagnosis"
                    placeholder="Buscar por código o descripción (ej: J00, gripe)..."
                    className="pl-8"
                    value={searchCIE10}
                    onChange={(e) => setSearchCIE10(e.target.value)}
                  />
                </div>
                {filteredCIE10.length > 0 && (
                  <div className="border rounded-md max-h-40 overflow-y-auto">
                    {filteredCIE10.slice(0, 5).map((item) => (
                      <div
                        key={item.code}
                        className="p-2 hover:bg-muted cursor-pointer text-sm"
                        onClick={() => {
                          setSelectedDiagnosis(`${item.code} - ${item.description}`);
                          setSearchCIE10("");
                        }}
                      >
                        <span className="font-mono font-semibold text-primary">{item.code}</span>
                        {" - "}
                        <span>{item.description}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({item.category})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {selectedDiagnosis && (
                  <Badge variant="secondary" className="font-mono">
                    {selectedDiagnosis}
                  </Badge>
                )}
              </div>

              {/* Vital Signs Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="weight" className="text-xs flex items-center gap-1">
                    <Weight className="h-3 w-3" /> Peso (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="82"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height" className="text-xs flex items-center gap-1">
                    <Ruler className="h-3 w-3" /> Altura (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="bp" className="text-xs flex items-center gap-1">
                    <Activity className="h-3 w-3" /> Presión
                  </Label>
                  <Input id="bp" placeholder="120/80" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="temp" className="text-xs flex items-center gap-1">
                    <Droplets className="h-3 w-3" /> Temp. (°C)
                  </Label>
                  <Input id="temp" type="number" step="0.1" placeholder="36.5" />
                </div>
              </div>

              {/* IMC Calculator */}
              {bmi && (
                <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">IMC Calculado:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{bmi}</span>
                    {bmiCategory && (
                      <Badge variant="outline" className={bmiCategory.color}>
                        {bmiCategory.label}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Notes with Snippet Support */}
              <div className="space-y-2 relative">
                <Label htmlFor="notes">Notas de Consulta</Label>
                <Textarea
                  id="notes"
                  placeholder="Escribe los detalles de la consulta... Usa / para snippets rápidos"
                  rows={8}
                  value={newNote}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  className="font-mono text-sm"
                />
                {showSnippets && (
                  <div className="absolute top-20 left-0 right-0 bg-card border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                    {(snippetsData as TextSnippet[])
                      .filter((s) => s.trigger.includes(newNote.split(/\s/).pop() || ""))
                      .map((snippet) => (
                        <div
                          key={snippet.trigger}
                          className="p-3 hover:bg-muted cursor-pointer border-b last:border-0"
                          onClick={() => handleSnippetSelect(snippet)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {snippet.trigger}
                            </code>
                            <span className="text-sm font-medium">{snippet.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {snippet.content}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="mr-2 h-4 w-4" /> Adjuntar Archivo
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Guardar Entrada
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* History Timeline */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Historia Clínica
            </h2>
            {history.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={entry.type === 'Consulta' ? 'default' : 'secondary'}>
                        {entry.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {entry.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{entry.doctor}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Descargar PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {entry.diagnosis && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">
                        Diagnóstico:
                      </span>
                      <p className="text-sm font-medium mt-1">
                        {entry.diagnosisCode && (
                          <code className="font-mono bg-primary/10 text-primary px-2 py-0.5 rounded mr-2">
                            {entry.diagnosisCode}
                          </code>
                        )}
                        {entry.diagnosis}
                      </p>
                    </div>
                  )}

                  {/* Vital Signs Grid */}
                  {(entry.weight || entry.bloodPressure || entry.temperature) && (
                    <div className="grid grid-cols-4 gap-3 mb-3 p-3 bg-muted/50 rounded-lg">
                      {entry.weight && (
                        <div>
                          <span className="text-xs text-muted-foreground">Peso</span>
                          <p className="text-sm font-semibold">{entry.weight} kg</p>
                        </div>
                      )}
                      {entry.height && (
                        <div>
                          <span className="text-xs text-muted-foreground">Altura</span>
                          <p className="text-sm font-semibold">{entry.height} cm</p>
                        </div>
                      )}
                      {entry.bloodPressure && (
                        <div>
                          <span className="text-xs text-muted-foreground">Presión</span>
                          <p className="text-sm font-semibold">{entry.bloodPressure}</p>
                        </div>
                      )}
                      {entry.temperature && (
                        <div>
                          <span className="text-xs text-muted-foreground">Temp.</span>
                          <p className="text-sm font-semibold">{entry.temperature}°C</p>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {entry.notes}
                  </p>

                  {entry.attachments && entry.attachments.length > 0 && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {entry.attachments.map((file, i) => (
                        <Badge key={i} variant="outline" className="cursor-pointer hover:bg-muted">
                          <Paperclip className="mr-1 h-3 w-3" /> {file}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Patient Info Sidebar */}
        <div className="space-y-6">
          {/* Obra Social / Insurance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Cobertura Médica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patient.insuranceProvider ? (
                <>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      Obra Social / Prepaga
                    </span>
                    <p className="font-medium">{patient.insuranceProvider}</p>
                  </div>
                  {patient.insuranceNumber && (
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        Nº de Afiliado
                      </span>
                      <p className="font-mono text-sm">{patient.insuranceNumber}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Paciente particular</p>
              )}
            </CardContent>
          </Card>

          {/* Medical Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Datos Médicos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  Grupo Sanguíneo
                </span>
                <p className="font-medium">{patient.bloodType || "No especificado"}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Alergias
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.allergies && patient.allergies.length > 0 ? (
                    patient.allergies.map((allergy: string, i: number) => (
                      <Badge key={i} variant={allergy === "Ninguna" ? "outline" : "destructive"}>
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline">Sin registro</Badge>
                  )}
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  Antecedentes Familiares
                </span>
                <p className="text-sm mt-1">
                  {patient.medicalBackground || "Sin antecedentes registrados"}
                </p>
              </div>
              {patient.weight && patient.height && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    Última Medición
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Peso:</span>{" "}
                      <span className="font-semibold">{patient.weight} kg</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Altura:</span>{" "}
                      <span className="font-semibold">{patient.height} cm</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          {patient.tags && patient.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Etiquetas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {patient.tags.map((tag) => (
                    <Badge key={tag} className={getTagColor(tag as PatientTag)}>
                      {tag}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-6 text-xs">
                    + Agregar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Files */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Archivos</CardTitle>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {history
                  .flatMap((h) => h.attachments)
                  .filter((f) => f)
                  .slice(0, 5)
                  .map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm p-2 hover:bg-muted rounded-md cursor-pointer group"
                    >
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="flex-1 truncate">{file}</span>
                      <Download className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                {history.flatMap((h) => h.attachments).filter((f) => f).length === 0 && (
                  <p className="text-sm text-muted-foreground">Sin archivos adjuntos</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
                <DialogTrigger asChild>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Pill className="mr-2 h-4 w-4" />
                        Generar Receta
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Genera una receta médica en formato PDF con firma digital</p>
                    </TooltipContent>
                  </Tooltip>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Generar Receta Médica</DialogTitle>
                    <DialogDescription>
                      Completa los datos de la prescripción. El PDF se generará automáticamente.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {/* Diagnóstico CIE-10 */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="prescription-diagnosis">
                          Diagnóstico <span className="text-red-500">*</span>
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-muted-foreground hover:text-foreground">
                              <AlertCircle className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ingresa el código CIE-10 y descripción del diagnóstico</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="prescription-diagnosis"
                          placeholder="Buscar diagnóstico CIE-10 (ej: J00 - Rinofaringitis aguda)"
                          className="pl-8"
                          value={prescriptionForm.diagnosis}
                          onChange={(e) => {
                            setPrescriptionForm({ ...prescriptionForm, diagnosis: e.target.value });
                            setSearchCIE10(e.target.value);
                          }}
                        />
                      </div>
                      {searchCIE10 && filteredCIE10.length > 0 && (
                        <div className="max-h-40 overflow-y-auto rounded-md border bg-popover p-2">
                          {filteredCIE10.slice(0, 5).map((item) => (
                            <button
                              key={item.code}
                              className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
                              onClick={() => {
                                setPrescriptionForm({ 
                                  ...prescriptionForm, 
                                  diagnosis: `${item.code} - ${item.description}` 
                                });
                                setSearchCIE10("");
                              }}
                            >
                              <span className="font-semibold text-primary">{item.code}</span> - {item.description}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Medicamentos */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>
                          Medicamentos <span className="text-red-500">*</span>
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddMedication}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Agregar
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {prescriptionForm.medications.map((med, index) => (
                          <div key={index} className="grid gap-2 rounded-lg border p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Medicamento {index + 1}</span>
                              {prescriptionForm.medications.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveMedication(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid gap-2 sm:grid-cols-3">
                              <Input
                                placeholder="Nombre (ej: Ibuprofeno)"
                                value={med.name}
                                onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                              />
                              <Input
                                placeholder="Dosis (ej: 400mg)"
                                value={med.dosage}
                                onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                              />
                              <Input
                                placeholder="Duración (ej: 5 días)"
                                value={med.duration}
                                onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Observaciones */}
                    <div className="space-y-2">
                      <Label htmlFor="prescription-observations">Observaciones / Indicaciones</Label>
                      <Textarea
                        id="prescription-observations"
                        placeholder="Indicaciones especiales, precauciones, etc."
                        rows={3}
                        value={prescriptionForm.observations}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, observations: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsPrescriptionDialogOpen(false)}
                      disabled={isGeneratingPDF}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleGeneratePrescription} disabled={isGeneratingPDF}>
                      {isGeneratingPDF ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generando PDF...
                        </>
                      ) : (
                        <>
                          <FileCheck className="mr-2 h-4 w-4" />
                          Generar y Descargar
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Generar Orden de Estudios
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-500" />
                      Funcionalidad en Desarrollo
                    </DialogTitle>
                    <DialogDescription>
                      La generación de órdenes de estudios médicos estará disponible en la próxima versión.
                      Incluirá plantillas para laboratorio, imágenes, y estudios especializados.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileSignature className="mr-2 h-4 w-4" />
                    Generar Certificado
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-500" />
                      Funcionalidad en Desarrollo
                    </DialogTitle>
                    <DialogDescription>
                      La generación de certificados médicos estará disponible en la próxima versión.
                      Podrás crear certificados de aptitud física, reposo, control médico y más.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar Historia Completa
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Ver Todos los Turnos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
