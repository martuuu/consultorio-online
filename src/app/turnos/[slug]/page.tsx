"use client";

import { useState } from "react";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function TurneroPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
            <Zap className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reserva tu turno</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Consultorio Light - {resolvedParams.slug}
          </p>
        </div>

        {/* Steps Progress */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <Card className="border-none shadow-lg">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Selecciona Profesional y Fecha</CardTitle>
                <CardDescription>Elige con quién quieres atenderte y cuándo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Profesional / Especialidad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-navarro">Dr. Navarro (Clínica Médica)</SelectItem>
                      <SelectItem value="dra-lopez">Dra. Lopez (Pediatría)</SelectItem>
                      <SelectItem value="rayos">Sala de Rayos X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <Label className="mb-2 block">Fecha</Label>
                    <div className="border rounded-md p-2 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border-none"
                        locale={es}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label className="mb-2 block">Horarios Disponibles</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={time === slot ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setTime(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext} disabled={!date || !time}>
                  Siguiente
                </Button>
              </CardFooter>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Tus Datos</CardTitle>
                <CardDescription>Completa tu información para confirmar la reserva.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Juan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Apellido</Label>
                    <Input id="lastname" placeholder="Perez" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="juan@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                  <Input id="phone" placeholder="+54 11 ..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Motivo de consulta (Opcional)</Label>
                  <Input id="notes" placeholder="Breve descripción..." />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>Atrás</Button>
                <Button onClick={handleNext}>Confirmar Turno</Button>
              </CardFooter>
            </>
          )}

          {step === 3 && (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">¡Turno Confirmado!</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Te hemos enviado un email con los detalles de tu turno.
                Te esperamos el <strong>{date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : ""}</strong> a las <strong>{time}hs</strong>.
              </p>
              <Button onClick={() => window.location.reload()}>
                Reservar otro turno
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
