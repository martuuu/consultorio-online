import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Calendar, Clock, Users, MapPin, Ambulance, FileText, MessageSquare, BarChart3, Bell, Zap, FileSearch, Shield, Video, Globe2, Package, StickyNote, Settings } from "lucide-react";

// Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description, 
  items, 
  highlight,
  borderColor = 'border-border/50'
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  items: string[]; 
  highlight?: boolean;
  borderColor?: string;
}) {
  return (
    <div className={`group relative flex flex-col rounded-2xl border-2 ${borderColor} bg-card p-6 shadow-sm transition-all hover:shadow-lg`}>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${highlight ? 'bg-gradient-to-br from-cyan-500 to-teal-600 text-white' : 'bg-muted'} mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-1.5 text-xs text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {highlight && (
        <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white border-0 shadow-lg">
          NUEVO
        </Badge>
      )}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-cyan-50 text-cyan-700 border-cyan-200">Funcionalidades</Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Todo lo que necesitas,
            <br />
            <span className="text-cyan-600">en un solo lugar</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            20 módulos profesionales organizados en 4 planes. Escala según crece tu práctica.
          </p>
        </div>

        {/* BASE Tier - $35/mes */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-green-50 text-green-700 border-green-200">BASE - $35/mes</Badge>
            <span className="text-sm text-muted-foreground">Lo esencial para empezar</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Calendar className="h-6 w-6" />}
              title="Agenda Médica"
              description="Calendario completo, drag & drop, lista de espera, bloqueos recurrentes"
              items={["React Big Calendar", "10+ acciones por turno", "Exportación Excel"]}
              borderColor="border-green-500/50"
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6" />}
              title="Gestión de Turnos"
              description="Filtros avanzados, confirmación, reprogramación, recordatorios automáticos"
              items={["6 estados de turno", "Selección múltiple", "Notas por turno"]}
              borderColor="border-green-500/50"
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Pacientes"
              description="Historia clínica completa, CIE-10, obra social, generación de recetas PDF"
              items={["Timeline histórico", "Tags VIP/Crónico", "Calculadora IMC"]}
              borderColor="border-green-500/50"
            />
            <FeatureCard 
              icon={<StickyNote className="h-6 w-6" />}
              title="Sticky Notes"
              description="Notas colaborativas con @menciones, colores por rol, sistema tipo Trello"
              items={["Drag & drop", "Notificaciones en tiempo real", "GRATIS en todos los planes"]}
              borderColor="border-green-500/50"
            />
          </div>
        </div>

        {/* PRO Tier - $65/mes */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-cyan-50 text-cyan-700 border-cyan-200">PRO - $65/mes</Badge>
            <span className="text-sm text-muted-foreground">Para consultorios en crecimiento</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <FeatureCard 
              icon={<MapPin className="h-6 w-6" />}
              title="Atención Domiciliaria"
              description="Ruta optimizada, 5 tipos de profesionales, integración Waze/Google Maps"
              items={["Gestión de zonas", "WhatsApp integrado", "Equipamiento por visita"]}
              borderColor="border-cyan-500/50"
            />
            <FeatureCard 
              icon={<FileText className="h-6 w-6" />}
              title="Recetas y Órdenes"
              description="Generación PDF real, 4 templates, plantillas personalizadas, preview"
              items={["jsPDF integrado", "Envío por email", "Membrete custom"]}
              borderColor="border-cyan-500/50"
            />
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6" />}
              title="Comunicaciones"
              description="WhatsApp/SMS/Email, plantillas con variables, chat interno tipo Slack"
              items={["10 variables", "Notificaciones en header", "Historial completo"]}
              borderColor="border-cyan-500/50"
            />
            <FeatureCard 
              icon={<BarChart3 className="h-6 w-6" />}
              title="Reportes y Analítica"
              description="4 tipos de gráficos con Recharts, exportación Excel, filtros avanzados"
              items={["Evolución pacientes", "Ingresos mensuales", "Top diagnósticos"]}
              borderColor="border-cyan-500/50"
            />
            <FeatureCard 
              icon={<Globe2 className="h-6 w-6" />}
              title="Portal de Pacientes"
              description="Sistema de 3 pasos para solicitar turnos, pago online, documentos"
              items={["Layout independiente", "Signos vitales", "Mi perfil completo"]}
              borderColor="border-cyan-500/50"
            />
          </div>
        </div>

        {/* PREMIUM Tier - $110/mes */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-purple-50 text-purple-700 border-purple-200">PREMIUM - $110/mes</Badge>
            <span className="text-sm text-muted-foreground">PRO + 2 módulos a elección</span>
          </div>
          <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
            Elegí cualquier 2 de estos módulos según lo que necesites:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Bell className="h-6 w-6" />}
              title="Recordatorios"
              description="Sistema completo de recordatorios automáticos multi-canal"
              items={["WhatsApp/SMS/Email", "4 recordatorios config", "Logs y estadísticas"]}
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Automatizaciones"
              description="Workflows n8n con 300+ integraciones"
              items={["Drag & drop", "Encuestas auto", "Sincronización obras sociales"]}
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<FileSearch className="h-6 w-6" />}
              title="Facturación"
              description="Control de cobros con FacturaAPP"
              items={["Obra social/Prepaga", "Exportación fiscal", "Vencimientos auto"]}
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<Package className="h-6 w-6" />}
              title="Envíos"
              description="PedidosYa API y cadeterías con tracking"
              items={["3 prioridades", "5 proveedores", "Estadísticas completas"]}
              borderColor="border-purple-500/50"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <FeatureCard 
              icon={<Ambulance className="h-6 w-6" />}
              title="Emergencias"
              description="Despacho de ambulancias completo"
              items={["3 tipos de ambulancias", "Control de tripulación", "Mapa en vivo"]}
              highlight
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<Video className="h-6 w-6" />}
              title="Telemedicina"
              description="Sala de espera virtual y videollamada"
              items={["Compartir pantalla", "Grabación de sesiones", "Lista de espera"]}
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6" />}
              title="Auditoría"
              description="Logs completos del sistema"
              items={["Registro de IP", "Cambios históricos", "Compliance HIPAA"]}
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<FileText className="h-6 w-6" />}
              title="Cumplimiento"
              description="HIPAA, Ley 25.326, GDPR"
              items={["3 regulaciones", "Backup cifrado", "Exportación GDPR"]}
              borderColor="border-purple-500/50"
            />
          </div>
        </div>

        {/* ENTERPRISE Tier - A Medida */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Badge className="bg-linear-to-r from-amber-500 to-orange-600 text-white border-0">ENTERPRISE - A Medida</Badge>
          </div>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4">Desarrollo 100% Personalizado</h3>
            <p className="text-muted-foreground">
              Para clínicas, instituciones y proyectos con necesidades específicas. Todos los módulos incluidos + desarrollo a medida de tus flujos de trabajo y integraciones con tus sistemas actuales.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2">Todos los Módulos</h4>
              <p className="text-sm text-muted-foreground">Los 20 módulos del sistema incluidos sin restricciones</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-semibold mb-2">Desarrollo a Medida</h4>
              <p className="text-sm text-muted-foreground">Adaptamos el sistema a tu flujo de trabajo específico</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="text-3xl mb-3">🔗</div>
              <h4 className="font-semibold mb-2">Integraciones</h4>
              <p className="text-sm text-muted-foreground">Conectamos con tus sistemas, APIs y bases de datos</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="font-semibold mb-2">On-Premise</h4>
              <p className="text-sm text-muted-foreground">Instalación en tus servidores si lo necesitás</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-semibold mb-2">Capacitación Premium</h4>
              <p className="text-sm text-muted-foreground">Sesiones personalizadas para todo tu equipo</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold mb-2">Soporte Prioritario</h4>
              <p className="text-sm text-muted-foreground">Atención inmediata con gerente de cuenta dedicado</p>
            </div>
          </div>
        </div>

        {/* Gestión - Incluido en todos los planes */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Badge className="bg-slate-50 text-slate-700 border-slate-200">Gestión - Incluido en todos los planes</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Usuarios y Roles"
              description="Sistema de permisos granulares con 80+ acciones y 4 roles predefinidos"
              items={["Matriz exportable", "Permisos personalizados", "Auditoría de cambios"]}
              borderColor="border-slate-400/50"
            />
            <FeatureCard 
              icon={<Settings className="h-6 w-6" />}
              title="Configuración"
              description="Gestión completa de salas, horarios, profesionales y parámetros del sistema"
              items={["Multi-consultorio", "Horarios flexibles", "2FA mockup"]}
              borderColor="border-slate-400/50"
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6" />}
              title="Turnero Público"
              description="Sistema de 3 pasos para que pacientes soliciten turnos online"
              items={["Validaciones automáticas", "Confirmación SMS/Email", "Sin registro previo"]}
              borderColor="border-slate-400/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
