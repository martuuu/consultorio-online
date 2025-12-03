"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  ExternalLink,
  Copy,
  QrCode,
  Globe,
  Shield,
  CheckCircle,
  Mail,
  Phone,
  Activity,
  Save
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PortalPacientesConfigPage() {
  const [portalEnabled, setPortalEnabled] = useState(true);
  const [allowAppointmentBooking, setAllowAppointmentBooking] = useState(true);
  const [allowDocumentDownload, setAllowDocumentDownload] = useState(true);
  const [copied, setCopied] = useState(false);

  const portalUrl = "https://consultorio.app/portal-pacientes/";

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = {
    activePatients: 156,
    appointmentsBooked: 42,
    documentsViewed: 89,
    avgResponseTime: "2.4 min"
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración del Portal de Pacientes</h1>
          <p className="text-muted-foreground">Gestiona el acceso y funcionalidades del portal web para pacientes</p>
        </div>
        <Badge className="bg-purple-600 text-white">ENTERPRISE</Badge>
      </div>

      {/* Alert Info */}
      <Alert className="bg-blue-50 border-blue-200">
        <Globe className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">Portal de Pacientes Activo</AlertTitle>
        <AlertDescription className="text-blue-800">
          Los pacientes pueden acceder a su información, agendar turnos y descargar documentos desde el portal web.
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activePatients}</div>
            <p className="text-xs text-muted-foreground">
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnos Agendados</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointmentsBooked}</div>
            <p className="text-xs text-muted-foreground">
              Este mes via portal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Vistos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsViewed}</div>
            <p className="text-xs text-muted-foreground">
              Recetas y órdenes descargadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              Promedio de carga del portal
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="access">
            <Shield className="mr-2 h-4 w-4" />
            Acceso
          </TabsTrigger>
          <TabsTrigger value="features">
            <CheckCircle className="mr-2 h-4 w-4" />
            Funcionalidades
          </TabsTrigger>
          <TabsTrigger value="customization">
            <Globe className="mr-2 h-4 w-4" />
            Personalización
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado del Portal</CardTitle>
              <CardDescription>
                Activa o desactiva el acceso de pacientes al portal web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="portal-enabled" className="text-base">
                    Portal de Pacientes Habilitado
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Los pacientes pueden acceder a su portal personal
                  </p>
                </div>
                <Switch
                  id="portal-enabled"
                  checked={portalEnabled}
                  onCheckedChange={(checked) => {
                    setPortalEnabled(checked);
                    if (checked) {
                      toast.success("Portal habilitado", {
                        description: "Los pacientes ahora pueden acceder al portal"
                      });
                    } else {
                      toast.warning("Portal deshabilitado", {
                        description: "Los pacientes no podrán acceder temporalmente"
                      });
                    }
                  }}
                />
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <Label className="text-base">URL del Portal</Label>
                <div className="flex gap-2">
                  <Input 
                    value={portalUrl} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleCopyUrl}
                    className="shrink-0"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="shrink-0"
                    title="Abrir en nueva pestaña"
                    onClick={() => window.open('/portal-pacientes', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="shrink-0"
                    title="Generar código QR"
                    onClick={() => toast.success("Código QR generado", {
                      description: "El código QR se ha descargado como imagen"
                    })}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Comparte esta URL con tus pacientes o genera un código QR
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones al Equipo</CardTitle>
              <CardDescription>
                Configura cómo el equipo recibe notificaciones de acciones en el portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5 flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="text-base">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe un email cuando un paciente agenda un turno
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5 flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label className="text-base">Notificaciones Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertas en tiempo real en el dashboard
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Tab */}
        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Accesos</CardTitle>
              <CardDescription>
                Controla cómo los pacientes inician sesión en el portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Método de Autenticación</Label>
                    <p className="text-sm text-muted-foreground">
                      DNI + Fecha de Nacimiento
                    </p>
                  </div>
                  <Badge variant="secondary">Activo</Badge>
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Verificación por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar código de verificación al registrarse
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Verificación por SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar código de verificación por SMS
                    </p>
                  </div>
                  <Switch />
                </div>
                <Badge variant="outline" className="text-xs">
                  Requiere créditos SMS
                </Badge>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <div>
                  <Label className="text-base">Invitaciones Pendientes</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    12 pacientes invitados aún no han activado su cuenta
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info("Función en desarrollo", {
                    description: "Próximamente podrás ver y gestionar invitaciones pendientes"
                  })}
                >
                  Ver Invitaciones Pendientes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>
                Configuración de seguridad del portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Sesiones Automáticas</Label>
                  <p className="text-sm text-muted-foreground">
                    Cerrar sesión después de 30 minutos de inactividad
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Conexión HTTPS Segura</Label>
                  <p className="text-sm text-muted-foreground">
                    Forzar conexión encriptada (SSL/TLS)
                  </p>
                </div>
                <Badge variant="default" className="bg-green-600">Activo</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funcionalidades Disponibles</CardTitle>
              <CardDescription>
                Activa o desactiva funciones específicas del portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="booking" className="text-base">
                    Agendamiento de Turnos Online
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Los pacientes pueden agendar turnos desde el portal
                  </p>
                </div>
                <Switch
                  id="booking"
                  checked={allowAppointmentBooking}
                  onCheckedChange={(checked) => {
                    setAllowAppointmentBooking(checked);
                    toast.success(
                      checked ? "Agendamiento activado" : "Agendamiento desactivado",
                      { description: checked ? "Los pacientes pueden agendar turnos online" : "Función deshabilitada" }
                    );
                  }}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="documents" className="text-base">
                    Descarga de Documentos
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Acceso a recetas, órdenes y resultados de estudios
                  </p>
                </div>
                <Switch
                  id="documents"
                  checked={allowDocumentDownload}
                  onCheckedChange={(checked) => {
                    setAllowDocumentDownload(checked);
                    toast.success(
                      checked ? "Descarga de documentos activada" : "Descarga de documentos desactivada",
                      { description: checked ? "Pacientes pueden descargar sus documentos" : "Función deshabilitada" }
                    );
                  }}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Historia Clínica Personal
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Ver resumen de consultas anteriores
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Mensajería con el Consultorio
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Chat directo con secretaría/médicos
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Pagos Online
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Pagar consultas con tarjeta de crédito/débito
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Próximamente</Badge>
                  <Switch disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customization Tab */}
        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalización Visual</CardTitle>
              <CardDescription>
                Personaliza la apariencia del portal con tu marca
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Logo del Consultorio</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg border-2 border-dashed flex items-center justify-center">
                      <Globe className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.success("Logo cargado", {
                        description: "El logo se ha subido exitosamente"
                      })}
                    >
                      Subir Logo
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG o JPG. Recomendado: 200x200px
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Color Principal</Label>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded-lg bg-blue-500 border" />
                    <Input type="color" defaultValue="#3b82f6" className="w-20" />
                    <Input defaultValue="#3b82f6" className="font-mono" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Define el color de tu marca
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mensaje de Bienvenida</Label>
                <Input 
                  defaultValue="Bienvenido a tu consultorio online" 
                  placeholder="Personaliza el mensaje de bienvenida"
                />
              </div>

              <div className="space-y-2">
                <Label>Información de Contacto</Label>
                <div className="grid gap-3">
                  <Input 
                    placeholder="Teléfono del consultorio"
                    defaultValue="+54 11 1234-5678"
                  />
                  <Input 
                    placeholder="Email de contacto"
                    defaultValue="info@consultorio.com"
                  />
                  <Input 
                    placeholder="Dirección"
                    defaultValue="Av. Rivadavia 1234, CABA"
                  />
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => {
                  toast.loading("Guardando cambios...", { id: "save-portal" });
                  setTimeout(() => {
                    toast.success("Cambios guardados exitosamente", { 
                      id: "save-portal",
                      description: "La configuración del portal se ha actualizado"
                    });
                  }, 1000);
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
              <CardDescription>
                Previsualiza cómo se ve el portal para tus pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg border-2 bg-muted/30 p-8 text-center">
                <Globe className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Vista Previa del Portal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visualiza el portal desde la perspectiva del paciente
                </p>
                <Button onClick={() => window.open('/portal-pacientes', '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir Vista Previa
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
