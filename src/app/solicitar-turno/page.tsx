"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, Loader2, Calendar as CalendarIcon, Clock, User, Phone, Mail, AlertCircle, FileText, Shield, Edit, X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

// Interfaz para datos del formulario
interface FormData {
  professional: string;
  date: Date | undefined;
  time: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  reason: string;
  healthInsurance: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

// Mock de profesionales y horarios
const PROFESSIONALS = [
  { value: "dr-navarro", label: "Dr. Martín Navarro - Clínica Médica", available: true },
  { value: "dra-lopez", label: "Dra. Ana López - Pediatría", available: true },
  { value: "dr-garcia", label: "Dr. Carlos García - Cardiología", available: false },
];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const HEALTH_INSURANCE = [
  "Particular (Sin Obra Social)",
  "OSDE",
  "Swiss Medical",
  "Galeno",
  "Medicus",
  "IOMA",
  "PAMI",
  "Otra"
];

export default function SolicitarTurnoPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  // Mock de horarios ocupados (generado una vez)
  const [bookedSlots] = useState<string[]>(() => {
    // Simular algunos horarios ocupados
    const slots = ["09:30", "11:00", "14:30", "16:00"];
    return slots;
  });
  
  const [formData, setFormData] = useState<FormData>({
    professional: "",
    date: undefined,
    time: "",
    firstName: "",
    lastName: "",
    dni: "",
    email: "",
    phone: "",
    reason: "",
    healthInsurance: "",
    acceptTerms: false,
    acceptPrivacy: false,
  });

  // Validaciones
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^[\d\s+()-]{8,20}$/;
    return regex.test(phone);
  };

  const validateDNI = (dni: string) => {
    const regex = /^\d{7,8}$/;
    return regex.test(dni.replace(/\./g, ""));
  };

  const validateStep1 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.professional) newErrors.professional = "Selecciona un profesional";
    if (!formData.date) newErrors.date = "Selecciona una fecha";
    if (!formData.time) newErrors.time = "Selecciona un horario";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
    if (!formData.dni.trim()) {
      newErrors.dni = "El DNI es obligatorio";
    } else if (!validateDNI(formData.dni)) {
      newErrors.dni = "DNI inválido (7-8 dígitos)";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Teléfono inválido";
    }
    if (!formData.healthInsurance) newErrors.healthInsurance = "Selecciona una opción";
    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos";
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = "Debes aceptar la política de privacidad";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleConfirm = async () => {
    if (!validateStep2()) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }

    setIsLoading(true);
    
    // Simular envío (1.5s)
    setTimeout(() => {
      const code = `T${Date.now().toString().slice(-6)}`;
      setConfirmationCode(code);
      setIsLoading(false);
      setStep(3);
      toast.success("¡Turno confirmado! Te enviamos un email con los detalles");
    }, 1500);
  };

  const handleNewAppointment = () => {
    setStep(1);
    setFormData({
      professional: "",
      date: undefined,
      time: "",
      firstName: "",
      lastName: "",
      dni: "",
      email: "",
      phone: "",
      reason: "",
      healthInsurance: "",
      acceptTerms: false,
      acceptPrivacy: false,
    });
    setConfirmationCode("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-600 text-white mb-4 shadow-lg">
            <Zap className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            Reserva tu Turno Online
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Consultorio Médico - Atención rápida y profesional
          </p>
        </div>

        {/* Steps Progress */}
        <div className="flex justify-center items-center gap-2 mb-8">
          {[
            { num: 1, label: "Fecha" },
            { num: 2, label: "Datos" },
            { num: 3, label: "Confirmación" }
          ].map((s) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    s.num < step 
                      ? "bg-green-500 text-white" 
                      : s.num === step 
                      ? "bg-primary text-white ring-4 ring-primary/20" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s.num < step ? <CheckCircle className="h-5 w-5" /> : s.num}
                </div>
                <span className="text-xs mt-1 font-medium">{s.label}</span>
              </div>
              {s.num < 3 && (
                <div className={`h-1 w-12 mx-2 transition-colors ${s.num < step ? "bg-green-500" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="border-none shadow-xl">
          {/* STEP 1: Selección de Profesional, Fecha y Hora */}
          {step === 1 && (
            <>
              <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-cyan-50">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Selecciona Profesional, Fecha y Horario
                </CardTitle>
                <CardDescription>Elige con quién quieres atenderte y cuándo te viene mejor.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Selector de Profesional */}
                <div className="space-y-2">
                  <Label htmlFor="professional" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Profesional / Especialidad *
                  </Label>
                  <Select 
                    value={formData.professional} 
                    onValueChange={(value) => setFormData({...formData, professional: value})}
                  >
                    <SelectTrigger id="professional" className={errors.professional ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona un profesional" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFESSIONALS.map((prof) => (
                        <SelectItem key={prof.value} value={prof.value} disabled={!prof.available}>
                          {prof.label} {!prof.available && <Badge variant="secondary" className="ml-2">No disponible</Badge>}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.professional && <p className="text-xs text-red-500">{errors.professional}</p>}
                </div>
                
                {/* Fecha y Horarios */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Calendario */}
                  <div className="flex-1">
                    <Label className="mb-2 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      Fecha *
                    </Label>
                    <div className={`border rounded-lg p-3 flex justify-center ${errors.date ? "border-red-500" : ""}`}>
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData({...formData, date})}
                        className="rounded-md border-none"
                        locale={es}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today || date.getDay() === 0 || date.getDay() === 6;
                        }}
                      />
                    </div>
                    {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                    <p className="text-xs text-muted-foreground mt-2">
                      <AlertCircle className="h-3 w-3 inline mr-1" />
                      No atendemos sábados ni domingos
                    </p>
                  </div>

                  {/* Horarios Disponibles */}
                  <div className="flex-1">
                    <Label className="mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Horarios Disponibles *
                    </Label>
                    <div className="border rounded-lg p-4 bg-muted/30">
                      {formData.date ? (
                        <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = formData.time === slot;
                            const isBooked = bookedSlots.includes(slot);
                            
                            return (
                              <Button
                                key={slot}
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                className={`w-full ${isBooked && !isSelected ? "opacity-40" : ""}`}
                                disabled={isBooked && !isSelected}
                                onClick={() => setFormData({...formData, time: slot})}
                              >
                                {slot}
                              </Button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                          <p className="text-sm">Selecciona una fecha para ver horarios disponibles</p>
                        </div>
                      )}
                    </div>
                    {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Resumen de selección */}
                {formData.professional && formData.date && formData.time && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Resumen de tu turno:
                    </p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Profesional:</strong> {PROFESSIONALS.find(p => p.value === formData.professional)?.label}</p>
                      <p><strong>Fecha:</strong> {format(formData.date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}</p>
                      <p><strong>Hora:</strong> {formData.time}hs</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 bg-muted/30">
                <Button onClick={handleNext} disabled={!formData.professional || !formData.date || !formData.time}>
                  Siguiente <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 2: Datos del Paciente */}
          {step === 2 && (
            <>
              <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-cyan-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Tus Datos Personales
                </CardTitle>
                <CardDescription>Completa tu información para confirmar la reserva.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Juan" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Pérez" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                {/* DNI */}
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI *</Label>
                  <Input 
                    id="dni" 
                    placeholder="12345678" 
                    maxLength={8}
                    value={formData.dni}
                    onChange={(e) => setFormData({...formData, dni: e.target.value.replace(/\D/g, "")})}
                    className={errors.dni ? "border-red-500" : ""}
                  />
                  {errors.dni && <p className="text-xs text-red-500">{errors.dni}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email *
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  <p className="text-xs text-muted-foreground">Te enviaremos la confirmación a este email</p>
                </div>

                {/* Teléfono / WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    Teléfono / WhatsApp *
                  </Label>
                  <Input 
                    id="phone" 
                    placeholder="+54 11 1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Obra Social */}
                <div className="space-y-2">
                  <Label htmlFor="healthInsurance">Obra Social / Prepaga *</Label>
                  <Select 
                    value={formData.healthInsurance} 
                    onValueChange={(value) => setFormData({...formData, healthInsurance: value})}
                  >
                    <SelectTrigger id="healthInsurance" className={errors.healthInsurance ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      {HEALTH_INSURANCE.map((insurance) => (
                        <SelectItem key={insurance} value={insurance}>
                          {insurance}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.healthInsurance && <p className="text-xs text-red-500">{errors.healthInsurance}</p>}
                </div>

                {/* Motivo de Consulta */}
                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo de Consulta (Opcional)</Label>
                  <Textarea 
                    id="reason" 
                    placeholder="Describe brevemente el motivo de tu consulta..."
                    rows={3}
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Esto nos ayuda a preparar mejor tu atención</p>
                </div>

                {/* Consentimientos */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="acceptTerms" 
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked as boolean})}
                      className={errors.acceptTerms ? "border-red-500" : ""}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="acceptTerms" 
                        className="text-sm font-normal cursor-pointer leading-tight"
                      >
                        Acepto los <a href="#" className="text-primary underline">términos y condiciones</a> del servicio *
                      </Label>
                      {errors.acceptTerms && <p className="text-xs text-red-500">{errors.acceptTerms}</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="acceptPrivacy" 
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => setFormData({...formData, acceptPrivacy: checked as boolean})}
                      className={errors.acceptPrivacy ? "border-red-500" : ""}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="acceptPrivacy" 
                        className="text-sm font-normal cursor-pointer leading-tight flex items-center gap-2"
                      >
                        <Shield className="h-4 w-4 text-primary" />
                        He leído y acepto la <a href="#" className="text-primary underline">política de privacidad</a> y el tratamiento de mis datos personales según Ley 25.326 *
                      </Label>
                      {errors.acceptPrivacy && <p className="text-xs text-red-500">{errors.acceptPrivacy}</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2 bg-muted/30">
                <Button variant="outline" onClick={handleBack}>
                  <X className="mr-2 h-4 w-4" />
                  Atrás
                </Button>
                <Button onClick={handleConfirm} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Confirmando...
                    </>
                  ) : (
                    <>
                      Confirmar Turno <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </>
          )}

          {/* STEP 3: Confirmación */}
          {step === 3 && (
            <div className="py-16 px-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6 shadow-xl">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">¡Turno Confirmado!</h2>
              
              {/* Código de Confirmación */}
              <div className="inline-block bg-primary/10 border-2 border-primary rounded-lg px-6 py-3 mb-6">
                <p className="text-xs text-muted-foreground mb-1">Código de Confirmación</p>
                <p className="text-2xl font-bold text-primary font-mono">{confirmationCode}</p>
              </div>

              <div className="max-w-md mx-auto space-y-6">
                {/* Detalles del Turno */}
                <div className="bg-muted/50 rounded-lg p-6 text-left space-y-3">
                  <h3 className="font-semibold text-lg mb-4 text-center">Detalles de tu Turno</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Paciente</p>
                        <p className="text-muted-foreground">{formData.firstName} {formData.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Profesional</p>
                        <p className="text-muted-foreground">{PROFESSIONALS.find(p => p.value === formData.professional)?.label}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Fecha y Hora</p>
                        <p className="text-muted-foreground">
                          {formData.date && format(formData.date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })} a las {formData.time}hs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <AlertCircle className="h-4 w-4 inline mr-2" />
                    Te hemos enviado un email de confirmación con todos los detalles.
                  </p>
                </div>

                {/* Acciones Rápidas */}
                <div className="space-y-3 pt-4">
                  <Button className="w-full" size="lg" onClick={handleNewAppointment}>
                    Reservar otro turno
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        toast.info("Función de modificación disponible en el email de confirmación");
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Modificar
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full text-red-600 hover:text-red-700"
                      onClick={() => {
                        toast.info("Usa el código " + confirmationCode + " para cancelar tu turno desde el email");
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancelar
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-4">
                  Guarda tu código de confirmación <strong>{confirmationCode}</strong> para cualquier gestión relacionada con tu turno.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground space-y-2 pb-8">
          <p>¿Necesitas ayuda? Contactanos al <strong>(011) 1234-5678</strong> o <strong>info@consultorio.com</strong></p>
          <p className="text-xs">
            <Shield className="h-3 w-3 inline mr-1" />
            Tus datos están protegidos según Ley 25.326 de Protección de Datos Personales
          </p>
        </div>
      </div>
    </div>
  );
}
