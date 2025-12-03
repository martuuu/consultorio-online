"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Workflow, 
  Play, 
  Pause, 
  Settings, 
  Plus,
  CheckCircle,
  Clock,
  Send,
  FileText,
  MessageSquare,
  TrendingUp
} from "lucide-react";

// Mock data
const WORKFLOWS = [
  {
    id: 1,
    name: "Formulario Pre-Consulta",
    description: "Envía formulario por WhatsApp 48hs antes del turno",
    status: "active",
    trigger: "48h antes del turno",
    actions: ["Enviar WhatsApp", "Guardar respuestas", "Notificar médico"],
    executions: 124,
    successRate: 96,
  },
  {
    id: 2,
    name: "Encuesta Satisfacción",
    description: "Envía encuesta post-consulta automáticamente",
    status: "active",
    trigger: "24h después de consulta",
    actions: ["Enviar Email", "Guardar feedback", "Crear reporte"],
    executions: 89,
    successRate: 92,
  },
  {
    id: 3,
    name: "Sincronizar Obra Social",
    description: "Verifica cobertura con sistema de obra social",
    status: "paused",
    trigger: "Al agendar turno",
    actions: ["Consultar API", "Validar cobertura", "Notificar resultado"],
    executions: 45,
    successRate: 88,
  },
  {
    id: 4,
    name: "Backup Automático",
    description: "Exporta datos críticos diariamente",
    status: "active",
    trigger: "Todos los días 02:00 AM",
    actions: ["Exportar DB", "Comprimir", "Enviar a cloud"],
    executions: 30,
    successRate: 100,
  },
];

const TEMPLATES = [
  {
    id: 1,
    name: "Formulario Pre-Consulta",
    icon: "📋",
    description: "Recolecta información del paciente antes de la consulta",
    complexity: "Simple",
  },
  {
    id: 2,
    name: "Recordatorio con Confirmación",
    icon: "✅",
    description: "Envía recordatorio y requiere confirmación del paciente",
    complexity: "Media",
  },
  {
    id: 3,
    name: "Notificar Resultados",
    icon: "📊",
    description: "Avisa al paciente cuando los resultados están listos",
    complexity: "Simple",
  },
  {
    id: 4,
    name: "Seguimiento Post-Consulta",
    icon: "💊",
    description: "Serie de mensajes de seguimiento programados",
    complexity: "Avanzada",
  },
];

const INTEGRATIONS = [
  { name: "WhatsApp Business", status: "connected", icon: "💬" },
  { name: "Google Calendar", status: "connected", icon: "📅" },
  { name: "Gmail", status: "connected", icon: "📧" },
  { name: "Twilio SMS", status: "available", icon: "📱" },
  { name: "Slack", status: "available", icon: "💼" },
  { name: "Dropbox", status: "available", icon: "☁️" },
];

export default function AutomatizacionesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automatizaciones</h1>
          <p className="text-muted-foreground">Workflows visuales sin código con n8n</p>
        </div>
        <Badge className="bg-purple-500 text-white">PREMIUM</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows Activos</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 pausado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ejecuciones</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">288</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Ahorrado</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workflows" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workflows">
            <Workflow className="mr-2 h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" />
            Plantillas
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Settings className="mr-2 h-4 w-4" />
            Integraciones
          </TabsTrigger>
        </TabsList>

        {/* Workflows */}
        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Workflows Configurados</CardTitle>
                  <CardDescription>Automatizaciones activas en tu consultorio</CardDescription>
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Workflow
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {WORKFLOWS.map((workflow) => (
                  <div key={workflow.id} className="rounded-lg border p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                          workflow.status === "active" ? "bg-purple-500/10" : "bg-muted"
                        }`}>
                          <Workflow className={`h-6 w-6 ${
                            workflow.status === "active" ? "text-purple-500" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{workflow.name}</h3>
                            <Badge variant={workflow.status === "active" ? "default" : "secondary"} className="text-xs">
                              {workflow.status === "active" ? "Activo" : "Pausado"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{workflow.description}</p>
                        </div>
                      </div>
                      <Switch checked={workflow.status === "active"} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Trigger:</span>
                        <span className="font-medium">{workflow.trigger}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Ejecuciones:</span>
                        <span className="font-medium">{workflow.executions}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Acciones:</p>
                      <div className="flex flex-wrap gap-2">
                        {workflow.actions.map((action, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`h-4 w-4 ${
                          workflow.successRate >= 95 ? "text-green-500" :
                          workflow.successRate >= 90 ? "text-yellow-500" : "text-red-500"
                        }`} />
                        <span className="text-sm text-muted-foreground">
                          Tasa de éxito: <span className="font-medium">{workflow.successRate}%</span>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                          Ver Logs
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* n8n Editor Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Editor Visual de Workflows</CardTitle>
              <CardDescription>Crea automatizaciones arrastrando y soltando nodos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-muted/30 p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-20 w-20 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Workflow className="h-10 w-10 text-purple-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">n8n Editor Integrado</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      El editor visual de n8n te permite crear workflows complejos sin escribir código. 
                      Conecta triggers, acciones y condiciones con una interfaz drag & drop.
                    </p>
                  </div>
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Abrir Editor n8n
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plantillas */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {TEMPLATES.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{template.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">{template.complexity}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Usar Plantilla
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>¿Cómo Funcionan los Workflows?</CardTitle>
              <CardDescription>Componentes básicos de una automatización</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold">1. Trigger (Gatillo)</h3>
                  <p className="text-sm text-muted-foreground">
                    Define cuándo se activa el workflow: al agendar turno, después de consulta, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                    <Settings className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold">2. Acciones</h3>
                  <p className="text-sm text-muted-foreground">
                    Qué hacer: enviar mensaje, guardar datos, consultar API, crear reporte, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold">3. Condiciones</h3>
                  <p className="text-sm text-muted-foreground">
                    Lógica: si el paciente confirma, si tiene obra social, si es menor de edad, etc.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integraciones */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>300+ Integraciones Disponibles</CardTitle>
              <CardDescription>Conecta tu consultorio con herramientas externas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {INTEGRATIONS.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <p className="font-medium text-sm">{integration.name}</p>
                        <Badge 
                          variant={integration.status === "connected" ? "default" : "outline"} 
                          className="text-xs mt-1"
                        >
                          {integration.status === "connected" ? "Conectado" : "Disponible"}
                        </Badge>
                      </div>
                    </div>
                    {integration.status === "available" && (
                      <Button size="sm" variant="outline">Conectar</Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">
                      ¿Necesitás otra integración?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      n8n soporta 300+ servicios. Contáctanos para configurar la integración que necesites.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Casos de Uso Populares</CardTitle>
              <CardDescription>Ideas para automatizar tu consultorio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <Send className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Formulario Pre-Consulta por WhatsApp</p>
                    <p className="text-xs text-muted-foreground">
                      Envía un formulario al paciente 48hs antes para recolectar síntomas y medicación actual
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Verificación de Cobertura Automática</p>
                    <p className="text-xs text-muted-foreground">
                      Consulta con la obra social si el paciente tiene cobertura al agendar el turno
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <MessageSquare className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Encuesta de Satisfacción Post-Consulta</p>
                    <p className="text-xs text-muted-foreground">
                      Envía una encuesta breve 24hs después para medir la satisfacción del paciente
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg border">
                  <FileText className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Notificar Resultados de Estudios</p>
                    <p className="text-xs text-muted-foreground">
                      Avisa automáticamente cuando los resultados de laboratorio están disponibles
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
