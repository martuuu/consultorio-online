"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  Eye,
  Download,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle,
  Lock,
  User,
  FileText,
  Settings,
  Database,
  Activity
} from "lucide-react";

// Mock data
const AUDIT_LOGS = [
  {
    id: 1,
    timestamp: "2024-01-22 14:35:22",
    usuario: "Dr. Juan Pérez",
    accion: "Ver Historia Clínica",
    modulo: "Pacientes",
    detalles: "Accedió a HC de María González (ID: 123)",
    ip: "192.168.1.45",
    severity: "info",
  },
  {
    id: 2,
    timestamp: "2024-01-22 14:28:15",
    usuario: "Secretaria Ana",
    accion: "Agendar Turno",
    modulo: "Agenda",
    detalles: "Agendó turno para Carlos Rodríguez - 25/01 15:00",
    ip: "192.168.1.38",
    severity: "info",
  },
  {
    id: 3,
    timestamp: "2024-01-22 14:15:08",
    usuario: "Dr. Juan Pérez",
    accion: "Modificar Diagnóstico",
    modulo: "Historia Clínica",
    detalles: "Modificó diagnóstico de Ana Martínez (J06.9 → J02.9)",
    ip: "192.168.1.45",
    severity: "warning",
  },
  {
    id: 4,
    timestamp: "2024-01-22 13:42:33",
    usuario: "Admin Sistema",
    accion: "Crear Usuario",
    modulo: "Configuración",
    detalles: "Creó nuevo usuario: Dra. Laura Gómez (Médico)",
    ip: "192.168.1.10",
    severity: "warning",
  },
  {
    id: 5,
    timestamp: "2024-01-22 12:08:19",
    usuario: "Sistema",
    accion: "Intento de Acceso Fallido",
    modulo: "Autenticación",
    detalles: "3 intentos fallidos desde IP no autorizada",
    ip: "203.45.67.89",
    severity: "critical",
  },
];

const COMPLIANCE_STATUS = [
  {
    norma: "HIPAA",
    cumplimiento: 98,
    estado: "Cumple",
    ultimaAuditoria: "15/12/2023",
  },
  {
    norma: "Ley 25.326 (Argentina)",
    cumplimiento: 100,
    estado: "Cumple",
    ultimaAuditoria: "10/01/2024",
  },
  {
    norma: "GDPR",
    cumplimiento: 95,
    estado: "Cumple",
    ultimaAuditoria: "20/12/2023",
  },
  {
    norma: "ISO 27001",
    cumplimiento: 92,
    estado: "En Progreso",
    ultimaAuditoria: "05/01/2024",
  },
];

const ACTIVITY_STATS = [
  { usuario: "Dr. Juan Pérez", acciones: 342, modulo: "Historia Clínica" },
  { usuario: "Secretaria Ana", acciones: 289, modulo: "Agenda" },
  { usuario: "Dra. Laura Gómez", acciones: 156, modulo: "Recetas" },
  { usuario: "Admin Sistema", acciones: 45, modulo: "Configuración" },
];

export default function AuditoriaPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Auditoría y Cumplimiento</h1>
          <p className="text-muted-foreground">Logs completos de actividad y cumplimiento normativo</p>
        </div>
        <Badge className="bg-amber-500 text-white">ENTERPRISE</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Hoy</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.247</div>
            <p className="text-xs text-muted-foreground">+12% vs ayer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Conectados ahora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumplimiento</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">Promedio normativo</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="logs">
            <FileText className="mr-2 h-4 w-4" />
            Logs de Auditoría
          </TabsTrigger>
          <TabsTrigger value="actividad">
            <Activity className="mr-2 h-4 w-4" />
            Actividad de Usuarios
          </TabsTrigger>
          <TabsTrigger value="cumplimiento">
            <Shield className="mr-2 h-4 w-4" />
            Cumplimiento
          </TabsTrigger>
          <TabsTrigger value="seguridad">
            <Lock className="mr-2 h-4 w-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        {/* Logs de Auditoría */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registro de Auditoría</CardTitle>
                  <CardDescription>Todos los eventos del sistema registrados</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar eventos..." className="pl-8 w-64" />
                  </div>
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                  <Button className="bg-amber-500 hover:bg-amber-600">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Detalles</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Severidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {AUDIT_LOGS.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-xs font-mono">{log.timestamp}</TableCell>
                      <TableCell className="font-medium">{log.usuario}</TableCell>
                      <TableCell>{log.accion}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.modulo}</Badge>
                      </TableCell>
                      <TableCell className="max-w-md truncate text-xs text-muted-foreground">
                        {log.detalles}
                      </TableCell>
                      <TableCell className="text-xs font-mono">{log.ip}</TableCell>
                      <TableCell>
                        {log.severity === "info" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-600">Info</Badge>
                        )}
                        {log.severity === "warning" && (
                          <Badge className="bg-yellow-500 text-white">Warning</Badge>
                        )}
                        {log.severity === "critical" && (
                          <Badge className="bg-red-500 text-white">Critical</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Eventos por Severidad</CardTitle>
                <CardDescription>Distribución últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Info</span>
                      <span className="text-sm font-bold">1,189</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "95%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Warning</span>
                      <span className="text-sm font-bold">55</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: "4.4%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Critical</span>
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: "0.6%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accesos a Datos Sensibles</CardTitle>
                <CardDescription>Historias clínicas y datos personales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Historias Clínicas</p>
                        <p className="text-xs text-muted-foreground">Hoy</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold">342</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Datos Personales</p>
                        <p className="text-xs text-muted-foreground">Hoy</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold">289</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Modificaciones</p>
                        <p className="text-xs text-muted-foreground">Hoy</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold">67</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Actividad de Usuarios */}
        <TabsContent value="actividad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad por Usuario</CardTitle>
              <CardDescription>Acciones realizadas este mes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Total Acciones</TableHead>
                    <TableHead>Módulo Más Usado</TableHead>
                    <TableHead>Progreso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ACTIVITY_STATS.map((stat, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{stat.usuario}</TableCell>
                      <TableCell className="text-lg font-bold">{stat.acciones}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{stat.modulo}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500" 
                            style={{ width: `${(stat.acciones / 342) * 100}%` }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Sesiones Activas</CardTitle>
                <CardDescription>Usuarios conectados ahora</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm">Dr. Juan Pérez</span>
                    </div>
                    <span className="text-xs text-muted-foreground">45 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm">Secretaria Ana</span>
                    </div>
                    <span className="text-xs text-muted-foreground">22 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm">Dra. Laura Gómez</span>
                    </div>
                    <span className="text-xs text-muted-foreground">8 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones por Módulo</CardTitle>
                <CardDescription>Este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Historia Clínica</span>
                    <span className="font-bold">524</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Agenda</span>
                    <span className="font-bold">412</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Recetas</span>
                    <span className="font-bold">267</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Comunicaciones</span>
                    <span className="font-bold">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horarios Pico</CardTitle>
                <CardDescription>Mayor actividad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>09:00 - 11:00</span>
                    <span className="font-bold">385 eventos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>14:00 - 16:00</span>
                    <span className="font-bold">342 eventos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>16:00 - 18:00</span>
                    <span className="font-bold">298 eventos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cumplimiento */}
        <TabsContent value="cumplimiento" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Cumplimiento Normativo</CardTitle>
              <CardDescription>Certificaciones y regulaciones aplicables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {COMPLIANCE_STATUS.map((compliance, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">{compliance.norma}</p>
                          <p className="text-xs text-muted-foreground">
                            Última auditoría: {compliance.ultimaAuditoria}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">{compliance.cumplimiento}%</span>
                        {compliance.estado === "Cumple" ? (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Cumple
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-500 text-white">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            En Progreso
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${compliance.cumplimiento === 100 ? "bg-green-500" : compliance.cumplimiento >= 95 ? "bg-amber-500" : "bg-yellow-500"}`}
                        style={{ width: `${compliance.cumplimiento}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ley 25.326 - Datos Personales (Argentina)</CardTitle>
                <CardDescription>Protección de datos personales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Consentimiento Informado</span>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Derecho de Acceso</span>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Cifrado de Datos</span>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Auditoría de Accesos</span>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>HIPAA - Health Insurance Portability</CardTitle>
                <CardDescription>Estándar internacional de privacidad médica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">PHI Protection</span>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Access Controls</span>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium">Business Associate Agreements</span>
                    </div>
                    <Badge className="bg-yellow-500 text-white">Pendiente</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Breach Notification</span>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Seguridad */}
        <TabsContent value="seguridad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Seguridad del Sistema</CardTitle>
              <CardDescription>Monitoreo de amenazas y vulnerabilidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-medium">Firewall</p>
                        <p className="text-xs text-muted-foreground">Activo y actualizado</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Activo</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <Lock className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-medium">Cifrado SSL/TLS</p>
                        <p className="text-xs text-muted-foreground">Certificado válido</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <Database className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-medium">Backups</p>
                        <p className="text-xs text-muted-foreground">Último: Hoy 02:00 AM</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">OK</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      <div>
                        <p className="font-medium">Intentos de Acceso Fallidos</p>
                        <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold">5</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Eye className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="font-medium">IPs Monitoreadas</p>
                        <p className="text-xs text-muted-foreground">Whitelist activa</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold">12</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Settings className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="font-medium">Políticas de Contraseña</p>
                        <p className="text-xs text-muted-foreground">Alta seguridad</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Activo</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">
                      Recomendación de Seguridad
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Se detectaron 5 intentos de acceso fallidos desde IPs no autorizadas. 
                      Considerá activar la autenticación de dos factores (2FA) para mayor seguridad.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Exportar Logs de Auditoría</CardTitle>
                <CardDescription>Para revisión externa o regulatoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Formato</span>
                    <Select defaultValue="xlsx">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xlsx">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Período</span>
                    <Select defaultValue="30days">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Hoy</SelectItem>
                        <SelectItem value="7days">7 días</SelectItem>
                        <SelectItem value="30days">30 días</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar Logs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración de Retención</CardTitle>
                <CardDescription>Tiempo de almacenamiento de logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Retención de Logs (días)</Label>
                    <Input type="number" defaultValue="365" className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recomendado: 365 días para cumplimiento normativo
                    </p>
                  </div>

                  <div>
                    <Label>Backup Automático</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" className="w-full">
                    Guardar Configuración
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
