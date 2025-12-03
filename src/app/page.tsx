import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  FileText, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Consultorio Light</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Funcionalidades
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Precios
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Iniciar Sesión</Button>
            </Link>
            <Link href="/agenda">
              <Button size="sm">Empezar Gratis</Button>
            </Link>
          </nav>
          <div className="md:hidden">
            <Link href="/login">
               <Button size="sm">Ingresar</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Tu Consultorio, <span className="text-primary">Simplificado.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                La herramienta definitiva para médicos independientes que quieren dejar el papel y enfocarse en sus pacientes. Sin complicaciones, sin costos ocultos.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Empezar Ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
                  Ver funcionalidades <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 sm:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Todo lo que necesitas</h2>
              <p className="mt-2  text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Funcionalidades pensadas para vos
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Diseñado específicamente para consultorios pequeños y medianos. Ni más, ni menos.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <Calendar className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    Agenda Inteligente
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">Gestión de turnos en tiempo real. Bloqueo de horarios, vistas por día/semana y detección de conflictos automática.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <FileText className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    Historia Clínica
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">Fichas de pacientes simples y flexibles. Guarda notas, diagnósticos y adjunta archivos importantes de forma segura.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <Globe className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    Turnero Público
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">Tu propia URL (tudominio.com/turnos) para que tus pacientes reserven online 24/7 sin llamarte.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <Users className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    Gestión de Pacientes
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">Base de datos centralizada. Busca pacientes al instante, ve su historial y datos de contacto en un solo lugar.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Planes que Crecen con Tu Consultorio</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Comenzá con lo esencial y agregá funcionalidades cuando las necesites. Sin sorpresas, sin costos ocultos.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
              {/* BASE Plan */}
              <div className="flex flex-col justify-between rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border xl:p-10">
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-foreground">BASE</h3>
                    <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">MVP</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">Todo lo esencial para digitalizar tu práctica médica</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">$25</span>
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">/mes</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-primary" />
                      Agenda Inteligente
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-primary" />
                      Historia Clínica Digital
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-primary" />
                      Turnero Web Público
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-primary" />
                      Gestión de Pacientes
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-primary" />
                      Múltiples Salas y Médicos
                    </li>
                  </ul>
                </div>
                <Link href="#contact" className="mt-8">
                  <Button className="w-full" variant="outline">Consultar</Button>
                </Link>
              </div>

              {/* PRO Plan */}
              <div className="flex flex-col justify-between rounded-3xl bg-card p-8 shadow-xl ring-2 ring-blue-500 xl:p-10">
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-foreground">PRO</h3>
                    <p className="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">Popular</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">Automatizá tareas y profesionalizá tu consultorio</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">$45</span>
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">/mes</span>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Todo en BASE, más:</p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-blue-500" />
                      Recetas y Órdenes PDF
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-blue-500" />
                      Comunicaciones (WhatsApp, Email)
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-blue-500" />
                      Reportes y Estadísticas
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-blue-500" />
                      Chat Interno del Equipo
                    </li>
                  </ul>
                </div>
                <Link href="#contact" className="mt-8">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Consultar</Button>
                </Link>
              </div>

              {/* PREMIUM Plan */}
              <div className="flex flex-col justify-between rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border xl:p-10">
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-foreground">PREMIUM</h3>
                    <p className="rounded-full bg-purple-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">Avanzado</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">Automatización total y facturación integrada</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">$90</span>
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">/mes</span>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Todo en PRO, más:</p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-purple-500" />
                      Recordatorios Automáticos
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-purple-500" />
                      Automatizaciones (n8n)
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-purple-500" />
                      Facturación Electrónica
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-purple-500" />
                      Control de Pagos
                    </li>
                  </ul>
                </div>
                <Link href="#contact" className="mt-8">
                  <Button className="w-full" variant="outline">Consultar</Button>
                </Link>
              </div>

              {/* ENTERPRISE Plan */}
              <div className="flex flex-col justify-between rounded-3xl bg-card p-8 shadow-xl ring-1 ring-border xl:p-10">
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-foreground">ENTERPRISE</h3>
                    <p className="rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">Premium</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">Cumplimiento normativo y telemedicina</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">$195</span>
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">/mes</span>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Todo en PREMIUM, más:</p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-amber-500" />
                      Auditoría Completa
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-amber-500" />
                      Telemedicina Integrada
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-amber-500" />
                      Cumplimiento Legal (HIPAA)
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-amber-500" />
                      Backup Cifrado
                    </li>
                  </ul>
                </div>
                <Link href="#contact" className="mt-8">
                  <Button className="w-full" variant="outline">Consultar</Button>
                </Link>
              </div>
            </div>

            {/* Custom Solutions CTA */}
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-muted/50 p-8 ring-1 ring-border lg:max-w-none">
              <div className="text-center">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">¿Necesitás algo personalizado?</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  Cada consultorio es único. Presupuestamos integraciones personalizadas, soporte dedicado y funcionalidades a medida.
                </p>
                <div className="mt-6">
                  <Link href="#contact">
                    <Button size="lg" variant="outline">Solicitar Presupuesto Personalizado</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Features Section */}
        <section className="py-24 sm:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Funcionalidades Completas</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Desde lo básico hasta lo más avanzado. Agregá solo lo que necesitás cuando lo necesitás.
              </p>
            </div>

            {/* PRO Features */}
            <div className="mx-auto mt-16 max-w-7xl">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-full bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white">PRO</div>
                <h3 className="text-2xl font-bold text-foreground">Profesionalizá tu Consultorio</h3>
              </div>
              <dl className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    Recetas y Órdenes PDF
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• Genera PDFs profesionales con tu membrete</p>
                    <p>• Firma digital integrada</p>
                    <p>• Plantillas personalizables (Recetas, Órdenes, Certificados)</p>
                    <p>• Envío automático por email</p>
                    <p>• Historial completo de recetas emitidas</p>
                  </dd>
                </div>

                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <Globe className="h-5 w-5 text-blue-500" />
                    </div>
                    Comunicaciones Multicanal
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• WhatsApp Business API integrado</p>
                    <p>• Emails transaccionales automáticos</p>
                    <p>• SMS de recordatorios (Twilio)</p>
                    <p>• Chat interno para tu equipo médico</p>
                    <p>• Historial de comunicaciones por paciente</p>
                  </dd>
                </div>

                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <ShieldCheck className="h-5 w-5 text-blue-500" />
                    </div>
                    Reportes y Analytics
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• Dashboard con métricas en tiempo real</p>
                    <p>• Gráficos de pacientes atendidos e ingresos</p>
                    <p>• Análisis de ausentismo y no-shows</p>
                    <p>• Exportación a Excel/PDF</p>
                    <p>• Ocupación de agenda por médico/sala</p>
                  </dd>
                </div>
              </dl>
            </div>

            {/* PREMIUM Features */}
            <div className="mx-auto mt-16 max-w-7xl">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-full bg-purple-500 px-4 py-1.5 text-sm font-semibold text-white">PREMIUM</div>
                <h3 className="text-2xl font-bold text-foreground">Automatización Total</h3>
              </div>
              <dl className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                      <Zap className="h-5 w-5 text-purple-500" />
                    </div>
                    Recordatorios Inteligentes
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• Recordatorios 24hs antes del turno</p>
                    <p>• Seguimientos post-consulta automáticos</p>
                    <p>• Recordatorios de estudios pendientes</p>
                    <p>• Templates editables por tipo de consulta</p>
                    <p>• Reduce hasta 40% el ausentismo</p>
                  </dd>
                </div>

                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                      <Calendar className="h-5 w-5 text-purple-500" />
                    </div>
                    Automatizaciones (n8n)
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• Workflows visuales sin código</p>
                    <p>• Formularios pre-consulta automáticos</p>
                    <p>• Encuestas de satisfacción post-consulta</p>
                    <p>• Integración con sistemas de obra social</p>
                    <p>• 300+ integraciones disponibles</p>
                  </dd>
                </div>

                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                    </div>
                    Facturación Electrónica
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• Integración con FacturaAPP (AFIP)</p>
                    <p>• Gestión por Obra Social/Prepaga/Particular</p>
                    <p>• Control de pagos pendientes</p>
                    <p>• Reportes de ingresos mensuales</p>
                    <p>• Dashboard de cobranzas</p>
                  </dd>
                </div>
              </dl>
            </div>

            {/* ENTERPRISE Features */}
            <div className="mx-auto mt-16 max-w-7xl">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white">ENTERPRISE</div>
                <h3 className="text-2xl font-bold text-foreground">Cumplimiento y Seguridad</h3>
              </div>
              <dl className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                      <FileText className="h-5 w-5 text-amber-500" />
                    </div>
                    Auditoría Completa
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• Logs de todas las acciones del sistema</p>
                    <p>• Trazabilidad de cambios en historias clínicas</p>
                    <p>• Exportación para auditorías externas</p>
                    <p>• Cumplimiento ISO 27001</p>
                    <p>• Protección legal ante demandas</p>
                  </dd>
                </div>

                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                      <Users className="h-5 w-5 text-amber-500" />
                    </div>
                    Telemedicina Integrada
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• Videollamadas HD integradas</p>
                    <p>• Sala de espera virtual</p>
                    <p>• Grabación de sesiones (con consentimiento)</p>
                    <p>• Atiende pacientes remotos sin límite geográfico</p>
                    <p>• Integración con pagos online</p>
                  </dd>
                </div>

                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                      <ShieldCheck className="h-5 w-5 text-amber-500" />
                    </div>
                    Cumplimiento Legal
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-muted-foreground space-y-2">
                    <p>• HIPAA Compliance (EE.UU.)</p>
                    <p>• Ley 25.326 (Argentina)</p>
                    <p>• Backup automático cifrado</p>
                    <p>• Exportación GDPR de datos</p>
                    <p>• Firma digital avanzada con certificado</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
          <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl" aria-hidden="true">
            <div className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-primary to-secondary" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Lleva tu consultorio al siguiente nivel.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Deja de perder tiempo en tareas administrativas y enfócate en lo que realmente importa: tus pacientes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button size="lg">Comenzar Ahora</Button>
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
                Contactar Ventas <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-24 sm:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Contacto
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Map */}
              <div className="rounded-xl overflow-hidden border bg-card shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878973384!2d-58.38375908477058!3d-34.60373098045943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf7e2e7e3d%3A0x3e7e3e3e3e3e3e3e!2sObelisco%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890123"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del Consultorio"
                ></iframe>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Dirección</p>
                        <p className="text-sm text-muted-foreground">Av. Corrientes 1234, CABA<br />Buenos Aires, Argentina</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-sm text-muted-foreground">+54 11 1234-5678<br />+54 11 8765-4321</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">info@consultoriolight.com<br />soporte@consultoriolight.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
                  <div className="flex gap-4">
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Horarios de Atención</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Lunes a Viernes: 9:00 - 18:00</p>
                    <p>Sábados: 9:00 - 13:00</p>
                    <p>Domingos: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Consultorio Light. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

