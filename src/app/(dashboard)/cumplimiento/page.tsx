"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  ShieldCheck,
  Download,
  Lock,
  FileText,
  Database,
  Key,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Server
} from "lucide-react";

export default function CumplimientoPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cumplimiento Legal y Seguridad</h1>
          <p className="text-muted-foreground">Configuración de normativas y protección de datos</p>
        </div>
        <Badge className="bg-amber-500 text-white">ENTERPRISE</Badge>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado General</CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Protegido</div>
            <p className="text-xs text-muted-foreground mt-1">Cumplimiento activo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Backup</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hace 2h</div>
            <p className="text-xs text-muted-foreground mt-1">Automático</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cifrado</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AES-256</div>
            <p className="text-xs text-muted-foreground mt-1">Activo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Normativas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/3</div>
            <p className="text-xs text-muted-foreground mt-1">Configuradas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="regulations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="regulations">
            <Shield className="mr-2 h-4 w-4" />
            Normativas
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Database className="mr-2 h-4 w-4" />
            Backups
          </TabsTrigger>
          <TabsTrigger value="encryption">
            <Lock className="mr-2 h-4 w-4" />
            Cifrado
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="mr-2 h-4 w-4" />
            Exportación GDPR
          </TabsTrigger>
        </TabsList>

        {/* Normativas */}
        <TabsContent value="regulations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* HIPAA */}
            <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-500">Activo</Badge>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle>HIPAA</CardTitle>
                <CardDescription>Health Insurance Portability and Accountability Act (EE.UU.)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hipaa-1" checked disabled />
                    <label htmlFor="hipaa-1" className="text-sm">Cifrado de datos en reposo</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hipaa-2" checked disabled />
                    <label htmlFor="hipaa-2" className="text-sm">Cifrado de datos en tránsito</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hipaa-3" checked disabled />
                    <label htmlFor="hipaa-3" className="text-sm">Control de acceso por roles</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hipaa-4" checked disabled />
                    <label htmlFor="hipaa-4" className="text-sm">Auditoría de accesos</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hipaa-5" checked disabled />
                    <label htmlFor="hipaa-5" className="text-sm">Backup cifrado automático</label>
                  </div>
                </div>
                <Button className="w-full" variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Certificado
                </Button>
              </CardContent>
            </Card>

            {/* Ley 25.326 */}
            <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-500">Activo</Badge>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle>Ley 25.326</CardTitle>
                <CardDescription>Protección de Datos Personales (Argentina)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ley-1" checked disabled />
                    <label htmlFor="ley-1" className="text-sm">Consentimiento informado</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ley-2" checked disabled />
                    <label htmlFor="ley-2" className="text-sm">Derecho de acceso</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ley-3" checked disabled />
                    <label htmlFor="ley-3" className="text-sm">Derecho de rectificación</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ley-4" checked disabled />
                    <label htmlFor="ley-4" className="text-sm">Derecho de supresión</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ley-5" checked disabled />
                    <label htmlFor="ley-5" className="text-sm">Notificación de brechas</label>
                  </div>
                </div>
                <Button className="w-full" variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Documentación
                </Button>
              </CardContent>
            </Card>

            {/* GDPR */}
            <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-500">Activo</Badge>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle>GDPR</CardTitle>
                <CardDescription>General Data Protection Regulation (UE)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gdpr-1" checked disabled />
                    <label htmlFor="gdpr-1" className="text-sm">Portabilidad de datos</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gdpr-2" checked disabled />
                    <label htmlFor="gdpr-2" className="text-sm">Derecho al olvido</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gdpr-3" checked disabled />
                    <label htmlFor="gdpr-3" className="text-sm">Evaluación de impacto</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gdpr-4" checked disabled />
                    <label htmlFor="gdpr-4" className="text-sm">DPO designado</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gdpr-5" checked disabled />
                    <label htmlFor="gdpr-5" className="text-sm">Minimización de datos</label>
                  </div>
                </div>
                <Button className="w-full" variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Compliance Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Política de Privacidad</CardTitle>
              <CardDescription>Documento legal para pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Última actualización: 01/12/2025</p>
                  <p className="text-sm">
                    Tu política de privacidad está actualizada y cumple con todas las normativas aplicables.
                    Se muestra automáticamente a los pacientes al crear su cuenta.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver Documento
                  </Button>
                  <Button variant="outline">Editar</Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backups */}
        <TabsContent value="backup" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Backups</CardTitle>
                <CardDescription>Backups automáticos cifrados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Frecuencia</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Cada hora</SelectItem>
                      <SelectItem value="every-4h">Cada 4 horas</SelectItem>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Retención</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 días</SelectItem>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                      <SelectItem value="365">1 año</SelectItem>
                      <SelectItem value="forever">Indefinido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <Select defaultValue="local">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Servidor Local</SelectItem>
                      <SelectItem value="supabase">Supabase Storage</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="both">Local + Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="encrypt-backup" defaultChecked />
                  <label htmlFor="encrypt-backup" className="text-sm font-medium">
                    Cifrar backups (AES-256)
                  </label>
                </div>

                <Button className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Crear Backup Manual
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historial de Backups</CardTitle>
                <CardDescription>Últimos backups realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "03/12/2025 14:00", size: "2.4 GB", status: "success" },
                    { date: "02/12/2025 14:00", size: "2.3 GB", status: "success" },
                    { date: "01/12/2025 14:00", size: "2.2 GB", status: "success" },
                    { date: "30/11/2025 14:00", size: "2.1 GB", status: "success" },
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{backup.date}</p>
                          <p className="text-xs text-muted-foreground">{backup.size} • Cifrado</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">Restaurar</Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <CardTitle>Recuperación ante Desastres</CardTitle>
              </div>
              <CardDescription>Plan de contingencia y restauración</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>✅ Backups automáticos diarios activos</p>
                <p>✅ Replicación en múltiples ubicaciones</p>
                <p>✅ RTO (Recovery Time Objective): 4 horas</p>
                <p>✅ RPO (Recovery Point Objective): 24 horas</p>
                <p>✅ Procedimientos de restauración documentados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cifrado */}
        <TabsContent value="encryption" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cifrado de Datos</CardTitle>
                <CardDescription>Protección de información sensible</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Datos en Reposo</span>
                    </div>
                    <Badge className="bg-green-500">Activo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Algoritmo: AES-256-GCM<br />
                    Todas las historias clínicas y datos de pacientes están cifrados
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Datos en Tránsito</span>
                    </div>
                    <Badge className="bg-green-500">Activo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Protocolo: TLS 1.3<br />
                    Todas las comunicaciones están protegidas con certificados SSL
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Gestión de Claves</span>
                    </div>
                    <Badge className="bg-green-500">Activo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rotación automática cada 90 días<br />
                    Claves almacenadas en HSM (Hardware Security Module)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Firma Digital</CardTitle>
                <CardDescription>Certificados y validación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Certificado Digital</Label>
                  <Input value="Dr. Martín Navarro - M.N. 123456" disabled />
                </div>

                <div className="space-y-2">
                  <Label>Emisor</Label>
                  <Input value="Colegio Médico de Buenos Aires" disabled />
                </div>

                <div className="space-y-2">
                  <Label>Validez</Label>
                  <Input value="01/01/2025 - 31/12/2026" disabled />
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-400">Certificado Válido</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tu certificado digital está activo y verificado. Todas las recetas y documentos serán firmados automáticamente.
                  </p>
                </div>

                <Button className="w-full" variant="outline">
                  <Key className="mr-2 h-4 w-4" />
                  Renovar Certificado
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Exportación GDPR */}
        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exportación de Datos del Paciente (GDPR)</CardTitle>
              <CardDescription>Derecho de portabilidad según GDPR y Ley 25.326</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Los pacientes tienen derecho a recibir una copia completa de sus datos personales en formato estructurado y de uso común.
                  Este proceso genera un archivo ZIP cifrado con toda la información.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Seleccionar Paciente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Buscar paciente..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Juan Perez - DNI 35123456</SelectItem>
                      <SelectItem value="2">Maria Garcia - DNI 28987654</SelectItem>
                      <SelectItem value="3">Carlos Lopez - DNI 42555666</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Formato de Exportación</Label>
                  <Select defaultValue="json">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON (Estructurado)</SelectItem>
                      <SelectItem value="pdf">PDF (Legible)</SelectItem>
                      <SelectItem value="both">Ambos formatos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Datos a Incluir</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="export-1" defaultChecked />
                    <label htmlFor="export-1" className="text-sm">Datos personales</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="export-2" defaultChecked />
                    <label htmlFor="export-2" className="text-sm">Historia clínica completa</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="export-3" defaultChecked />
                    <label htmlFor="export-3" className="text-sm">Turnos y citas</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="export-4" defaultChecked />
                    <label htmlFor="export-4" className="text-sm">Recetas y órdenes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="export-5" defaultChecked />
                    <label htmlFor="export-5" className="text-sm">Archivos adjuntos</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="export-6" defaultChecked />
                    <label htmlFor="export-6" className="text-sm">Comunicaciones</label>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="encrypt-export" defaultChecked />
                <label htmlFor="encrypt-export" className="text-sm font-medium">
                  Cifrar archivo con contraseña
                </label>
              </div>

              <Button className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Generar Exportación GDPR
              </Button>

              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  <strong>Nota Legal:</strong> Esta exportación debe completarse en un plazo máximo de 30 días desde la solicitud del paciente, según lo establecido por GDPR.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Exportaciones</CardTitle>
              <CardDescription>Registro de solicitudes GDPR procesadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { patient: "Juan Perez", date: "28/11/2025", status: "Completada", size: "145 MB" },
                  { patient: "Maria Garcia", date: "15/11/2025", status: "Completada", size: "89 MB" },
                  { patient: "Carlos Lopez", date: "05/11/2025", status: "Completada", size: "203 MB" },
                ].map((export_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{export_.patient}</p>
                        <p className="text-sm text-muted-foreground">{export_.date} • {export_.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {export_.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
