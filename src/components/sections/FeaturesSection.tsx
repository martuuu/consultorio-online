import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Calendar, Clock, Users, MapPin, Ambulance, FileText, MessageSquare, BarChart3, Bell, Zap, FileSearch, Shield, Video, Globe2, Package, StickyNote } from "lucide-react";

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

        {/* BASE Tier */}
        <div className="mb-16">
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
              icon={<MapPin className="h-6 w-6" />}
              title="Atención Domiciliaria"
              description="Ruta optimizada, 5 tipos de profesionales, integración Waze/Google Maps"
              items={["Gestión de zonas", "WhatsApp integrado", "Equipamiento por visita"]}
              borderColor="border-green-500/50"
            />
          </div>
        </div>

        {/* PRO Tier */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Ambulance className="h-6 w-6" />}
              title="Servicio de Emergencias"
              description="Despacho de ambulancias, gestión de bases, 4 prioridades, tracking en tiempo real"
              items={["3 tipos de ambulancias", "Control de tripulación", "Mapa en vivo"]}
              highlight
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
          </div>
        </div>

        {/* PREMIUM Tier */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Bell className="h-6 w-6" />}
              title="Recordatorios Automáticos"
              description="Sistema completo de recordatorios con test de envío, logs y estadísticas"
              items={["WhatsApp/SMS/Email", "4 recordatorios config", "Duplicar templates"]}
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Automatizaciones"
              description="Workflows drag & drop, 300+ integraciones, formularios pre-consulta"
              items={["Estilo n8n", "Encuestas auto", "Sincronización obras sociales"]}
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<FileSearch className="h-6 w-6" />}
              title="Facturación"
              description="Control de cobros, integración FacturaAPP, reportes mensuales"
              items={["Obra social/Prepaga", "Exportación fiscal", "Vencimientos auto"]}
              borderColor="border-purple-500/50"
            />
            <FeatureCard 
              icon={<Package className="h-6 w-6" />}
              title="Envíos Médicos"
              description="PedidosYa API, cadeterías, tracking GPS, zonas de cobertura"
              items={["3 prioridades", "5 proveedores", "Estadísticas completas"]}
              highlight
              borderColor="border-purple-500/50"
            />
          </div>
        </div>

        {/* ENTERPRISE Tier */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Shield className="h-6 w-6" />}
              title="Auditoría"
              description="Logs completos del sistema, filtros por usuario, exportación de auditoría"
              items={["Registro de IP", "Cambios históricos", "Compliance HIPAA"]}
              borderColor="border-amber-500/50"
            />
            <FeatureCard 
              icon={<Video className="h-6 w-6" />}
              title="Telemedicina"
              description="Sala de espera virtual, videollamada, grabación de sesiones"
              items={["Compartir pantalla", "Lista de espera", "Mock completo"]}
              borderColor="border-amber-500/50"
            />
            <FeatureCard 
              icon={<Globe2 className="h-6 w-6" />}
              title="Portal de Pacientes"
              description="Sistema de 3 pasos para solicitar turnos, pago online, documentos"
              items={["Layout independiente", "Signos vitales", "Mi perfil completo"]}
              borderColor="border-amber-500/50"
            />
            <FeatureCard 
              icon={<FileText className="h-6 w-6" />}
              title="Cumplimiento Legal"
              description="HIPAA, Ley 25.326, GDPR, exportación de datos, backup cifrado"
              items={["3 regulaciones", "Backup auto", "Exportación GDPR"]}
              borderColor="border-amber-500/50"
            />
          </div>
        </div>

        {/* FUNCIONALIDADES BASE (Disponibles en todos) */}
        <div>
          <div className="flex justify-center">
            <FeatureCard 
              icon={<StickyNote className="h-6 w-6" />}
              title="Sticky Notes"
              description="Notas colaborativas contextuales para todo el equipo médico"
              items={["Colores por usuario", "Menciones @usuario", "Auto-expiración", "Sincronización real-time"]}
              highlight
              borderColor="border-green-500/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
