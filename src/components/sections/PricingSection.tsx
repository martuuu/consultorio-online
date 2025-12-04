import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export function PricingSection() {
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* BASE Plan */}
          <div className="flex flex-col rounded-2xl border-2 border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-6">
              <Badge className="bg-green-50 text-green-700 border-green-200 mb-3">BASE</Badge>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$25</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Lo esencial para empezar</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Agenda Médica</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Gestión de Turnos</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Pacientes e Historia Clínica</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Atención Domiciliaria</span>
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
                <span className="text-4xl font-bold">$45</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Para consultorios en crecimiento</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span className="font-medium">Todo en BASE +</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span>🚑 Servicio de Emergencias</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span>Recetas y Órdenes PDF</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span>Comunicaciones (WhatsApp/Email)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                <span>Reportes y Analítica</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
                Probar 15 días gratis
              </Button>
            </Link>
          </div>

          {/* PREMIUM Plan */}
          <div className="flex flex-col rounded-2xl border-2 border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-6">
              <Badge className="bg-purple-50 text-purple-700 border-purple-200 mb-3">PREMIUM</Badge>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$90</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Automatización total</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span className="font-medium">Todo en PRO +</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span>Recordatorios Automáticos</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span>Automatizaciones (n8n)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span>Facturación Electrónica</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span>📦 Envíos con PedidosYa</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button variant="outline" className="w-full">Probar 15 días gratis</Button>
            </Link>
          </div>

          {/* ENTERPRISE Plan */}
          <div className="flex flex-col rounded-2xl border-2 border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 mb-3">ENTERPRISE</Badge>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$195</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Para clínicas e instituciones</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span className="font-medium">Todo en PREMIUM +</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span>Auditoría Completa</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span>Telemedicina</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span>Portal de Pacientes</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span>Cumplimiento Legal (HIPAA)</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button variant="outline" className="w-full">Probar 15 días gratis</Button>
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
          <div>
            <p className="text-sm text-muted-foreground mb-4">¿Necesitás algo personalizado?</p>
            <Link href="#contact">
              <Button size="lg" variant="outline">
                Solicitar Presupuesto a Medida
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
