"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true); // Anual por defecto

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-cyan-50 text-cyan-700 border-cyan-200">Planes y Precios</Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Elegí el plan que
            <br />
            <span className="text-cyan-600">mejor se adapta</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Todos los planes incluyen hosting, soporte 24/7, actualizaciones y capacitación. Sin costos ocultos.
          </p>

          {/* Toggle Anual/Mensual */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Mensual
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-cyan-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Anual
            </span>
            {isAnnual && (
              <Badge className="bg-green-500 text-white border-0">
                Ahorrá 15%
              </Badge>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            * Descuentos solo para nuevas altas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* BASE Plan */}
          <div className="flex flex-col rounded-2xl border-2 border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-6">
              <Badge className="bg-green-50 text-green-700 border-green-200 mb-3">BASE</Badge>
              <div className="flex items-baseline gap-2">
                {isAnnual ? (
                  <>
                    <span className="text-4xl font-bold">${Math.round((35 * 12 * 0.85) / 12)}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold">$35</span>
                    <span className="text-muted-foreground">/mes</span>
                  </>
                )}
              </div>
              {isAnnual && (
                <p className="text-xs text-muted-foreground mt-1">Total anual: ${Math.round(35 * 12 * 0.85)}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">Lo esencial para empezar</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <span>Agenda Médica</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <span>Gestión de Turnos</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <span>Pacientes e Historia Clínica</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <span>📝 Sticky Notes</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button variant="outline" className="w-full">Probar 15 días gratis</Button>
            </Link>
          </div>

          {/* PRO Plan */}
          <div className="flex flex-col rounded-2xl border-2 border-cyan-500 bg-card p-8 shadow-lg hover:shadow-xl transition-all relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white border-0">Más Popular</Badge>
            <div className="mb-6">
              <Badge className="bg-cyan-50 text-cyan-700 border-cyan-200 mb-3">PRO</Badge>
              <div className="flex items-baseline gap-2">
                {isAnnual ? (
                  <>
                    <span className="text-4xl font-bold">${Math.round((65 * 12 * 0.85) / 12)}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold">$65</span>
                    <span className="text-muted-foreground">/mes</span>
                  </>
                )}
              </div>
              {isAnnual && (
                <p className="text-xs text-muted-foreground mt-1">Total anual: ${Math.round(65 * 12 * 0.85)}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">Para consultorios en crecimiento</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <span className="font-medium">Todo en BASE +</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <span>Atención Domiciliaria</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <span>Recetas y Órdenes PDF</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <span>Comunicaciones (WhatsApp/Email)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <span>Reportes y Analítica</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <span>Portal de Pacientes</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button className="w-full bg-linear-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
                Probar 15 días gratis
              </Button>
            </Link>
          </div>

          {/* PREMIUM Plan */}
          <div className="flex flex-col rounded-2xl border-2 border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-6">
              <Badge className="bg-purple-50 text-purple-700 border-purple-200 mb-3">PREMIUM</Badge>
              <div className="flex items-baseline gap-2">
                {isAnnual ? (
                  <>
                    <span className="text-4xl font-bold">${Math.round((110 * 12 * 0.85) / 12)}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold">$110</span>
                    <span className="text-muted-foreground">/mes</span>
                  </>
                )}
              </div>
              {isAnnual && (
                <p className="text-xs text-muted-foreground mt-1">Total anual: ${Math.round(110 * 12 * 0.85)}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">PRO + 2 módulos a elección</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" />
                <span className="font-medium">Todo en PRO +</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" />
                <span className="font-semibold">Elegí 2 módulos de:</span>
              </li>
              <li className="flex items-start gap-2 text-sm pl-4">
                <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                <span>Recordatorios / Automatizaciones</span>
              </li>
              <li className="flex items-start gap-2 text-sm pl-4">
                <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                <span>Facturación / Envíos 📦</span>
              </li>
              <li className="flex items-start gap-2 text-sm pl-4">
                <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                <span>Emergencias 🚑 / Telemedicina</span>
              </li>
              <li className="flex items-start gap-2 text-sm pl-4">
                <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                <span>Auditoría / Cumplimiento</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button variant="outline" className="w-full">Probar 15 días gratis</Button>
            </Link>
          </div>

          {/* ENTERPRISE Plan */}
          <div className="flex flex-col rounded-2xl border-2 border-amber-500 bg-card p-8 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-6">
              <Badge className="bg-linear-to-r from-amber-500 to-orange-600 text-white border-0 mb-3">ENTERPRISE</Badge>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">A Medida</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">100% personalizado para tu institución</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <span className="font-medium">Todos los módulos incluidos</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <span>Desarrollo a medida de tu flujo</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <span>Integraciones con tus sistemas</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <span>Capacitación personalizada</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <span>Soporte prioritario 24/7</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <span>On-Premise disponible</span>
              </li>
            </ul>
            <Link href="#contact">
              <Button variant="outline" className="w-full">Solicitar Presupuesto</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 px-4 py-2">
            <span className="text-2xl">📝</span>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Sticky Notes incluido GRATIS en todos los planes
            </span>
          </div>
        </div>

        {/* Explicación del Modelo en Lenguaje Cotidiano */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 rounded-2xl p-8 border border-cyan-200 dark:border-cyan-800">
            <h3 className="text-2xl font-bold text-center mb-6">¿Cómo funciona el pricing?</h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p className="text-base leading-relaxed">
                <span className="font-semibold text-foreground">BASE ($30/mes pagando anual)</span> es para arrancar: tenés agenda, turnos, historia clínica y notas colaborativas. Lo básico para digitalizar tu consultorio.
              </p>
              
              <p className="text-base leading-relaxed">
                <span className="font-semibold text-foreground">PRO ($55/mes pagando anual)</span> suma visitas a domicilio, recetas en PDF, comunicaciones con pacientes por WhatsApp y reportes. Ideal cuando empezás a escalar.
              </p>
              
              <p className="text-base leading-relaxed">
                <span className="font-semibold text-foreground">PREMIUM ($94/mes pagando anual)</span> es lo anterior <span className="font-semibold text-foreground">más 2 módulos a tu elección</span>: ¿Necesitás recordatorios automáticos y facturación? Los elegís. ¿Preferís el servicio de emergencias y auditoría? También podés. Vos armás tu combo según lo que realmente uses.
              </p>
              
              <p className="text-base leading-relaxed">
                <span className="font-semibold text-foreground">ENTERPRISE</span> es para clínicas grandes o con necesidades muy específicas. Hacemos todo a medida: desde integraciones con tus sistemas actuales hasta módulos completamente nuevos. El precio lo armamos juntos según tu proyecto.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-cyan-200 dark:border-cyan-800">
              <p className="text-center text-sm text-muted-foreground">
                ¿No estás seguro qué plan elegir? 
                <Link href="#contact" className="ml-1 font-medium text-cyan-600 hover:text-cyan-700 underline">
                  Hablemos y te asesoramos sin compromiso
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
