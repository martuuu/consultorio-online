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
  FileText, 
  Plus,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Download,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Building2,
  Settings
} from "lucide-react";

// Mock data
const FACTURAS = [
  {
    id: "FAC-2024-001",
    paciente: "María González",
    fecha: "2024-01-15",
    tipo: "B",
    monto: 8500,
    estado: "pagada",
    metodoPago: "Obra Social",
    obraSocial: "OSDE",
  },
  {
    id: "FAC-2024-002",
    paciente: "Carlos Rodríguez",
    fecha: "2024-01-18",
    tipo: "C",
    monto: 12000,
    estado: "pendiente",
    metodoPago: "Particular",
    obraSocial: null,
  },
  {
    id: "FAC-2024-003",
    paciente: "Ana Martínez",
    fecha: "2024-01-20",
    tipo: "B",
    monto: 9500,
    estado: "pagada",
    metodoPago: "Prepaga",
    obraSocial: "Swiss Medical",
  },
  {
    id: "FAC-2024-004",
    paciente: "Jorge López",
    fecha: "2024-01-22",
    tipo: "A",
    monto: 15000,
    estado: "vencida",
    metodoPago: "Particular",
    obraSocial: null,
  },
];

const RESUMEN_MENSUAL = {
  enero: { facturado: 245000, cobrado: 198000, pendiente: 32000, vencido: 15000 },
  febrero: { facturado: 268000, cobrado: 214000, pendiente: 38000, vencido: 16000 },
  marzo: { facturado: 289000, cobrado: 245000, pendiente: 29000, vencido: 15000 },
};

const OBRAS_SOCIALES_STATS = [
  { nombre: "OSDE", facturas: 45, total: 427500, promedio: 9500 },
  { nombre: "Swiss Medical", facturas: 38, total: 380000, promedio: 10000 },
  { nombre: "Galeno", facturas: 22, total: 209000, promedio: 9500 },
  { nombre: "Particular", facturas: 67, total: 804000, promedio: 12000 },
];

export default function FacturacionPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facturación</h1>
          <p className="text-muted-foreground">Sistema de facturación con integración AFIP</p>
        </div>
        <Badge className="bg-purple-500 text-white">PREMIUM</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturado Este Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$289.000</div>
            <p className="text-xs text-muted-foreground">+7.8% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobrado</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245.000</div>
            <p className="text-xs text-muted-foreground">84.8% del total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$29.000</div>
            <p className="text-xs text-muted-foreground">12 facturas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencido</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">$15.000</div>
            <p className="text-xs text-muted-foreground">5 facturas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="facturas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="facturas">
            <FileText className="mr-2 h-4 w-4" />
            Facturas
          </TabsTrigger>
          <TabsTrigger value="nueva">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Factura
          </TabsTrigger>
          <TabsTrigger value="reportes">
            <TrendingUp className="mr-2 h-4 w-4" />
            Reportes
          </TabsTrigger>
          <TabsTrigger value="afip">
            <Building2 className="mr-2 h-4 w-4" />
            AFIP
          </TabsTrigger>
        </TabsList>

        {/* Facturas */}
        <TabsContent value="facturas" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Facturas Emitidas</CardTitle>
                  <CardDescription>Historial completo de facturación</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar..." className="pl-8 w-64" />
                  </div>
                  <Select defaultValue="todas">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="pagadas">Pagadas</SelectItem>
                      <SelectItem value="pendientes">Pendientes</SelectItem>
                      <SelectItem value="vencidas">Vencidas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Método Pago</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FACTURAS.map((factura) => (
                    <TableRow key={factura.id}>
                      <TableCell className="font-medium">{factura.id}</TableCell>
                      <TableCell>{new Date(factura.fecha).toLocaleDateString('es-AR')}</TableCell>
                      <TableCell>{factura.paciente}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Tipo {factura.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{factura.metodoPago}</span>
                          {factura.obraSocial && (
                            <span className="text-xs text-muted-foreground">{factura.obraSocial}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${factura.monto.toLocaleString('es-AR')}
                      </TableCell>
                      <TableCell>
                        {factura.estado === 'pagada' && (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Pagada
                          </Badge>
                        )}
                        {factura.estado === 'pendiente' && (
                          <Badge className="bg-yellow-500 text-white">
                            <Clock className="mr-1 h-3 w-3" />
                            Pendiente
                          </Badge>
                        )}
                        {factura.estado === 'vencida' && (
                          <Badge className="bg-red-500 text-white">
                            <XCircle className="mr-1 h-3 w-3" />
                            Vencida
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nueva Factura */}
        <TabsContent value="nueva" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Factura</CardTitle>
              <CardDescription>Genera facturas electrónicas con validación AFIP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paciente">Paciente *</Label>
                  <Select>
                    <SelectTrigger id="paciente">
                      <SelectValue placeholder="Seleccionar paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">María González</SelectItem>
                      <SelectItem value="2">Carlos Rodríguez</SelectItem>
                      <SelectItem value="3">Ana Martínez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha *</Label>
                  <Input id="fecha" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Factura *</Label>
                  <Select>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Factura A (Responsable Inscripto)</SelectItem>
                      <SelectItem value="B">Factura B (Monotributo / Obra Social)</SelectItem>
                      <SelectItem value="C">Factura C (Consumidor Final)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metodoPago">Método de Pago *</Label>
                  <Select>
                    <SelectTrigger id="metodoPago">
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="particular">Particular</SelectItem>
                      <SelectItem value="obra-social">Obra Social</SelectItem>
                      <SelectItem value="prepaga">Prepaga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="obraSocial">Obra Social / Prepaga</Label>
                  <Select>
                    <SelectTrigger id="obraSocial">
                      <SelectValue placeholder="Seleccionar (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="osde">OSDE</SelectItem>
                      <SelectItem value="swiss">Swiss Medical</SelectItem>
                      <SelectItem value="galeno">Galeno</SelectItem>
                      <SelectItem value="medife">Medifé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="concepto">Concepto *</Label>
                  <Input id="concepto" placeholder="Ej: Consulta médica" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monto">Monto *</Label>
                  <Input id="monto" type="number" placeholder="0.00" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <Input id="observaciones" placeholder="Información adicional (opcional)" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
                      Integración con AFIP
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Las facturas se validan automáticamente con AFIP antes de ser generadas. 
                      Recibirás el CAE (Código de Autorización Electrónico) al instante.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="bg-purple-500 hover:bg-purple-600">
                  <FileText className="mr-2 h-4 w-4" />
                  Generar Factura
                </Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
              <CardDescription>Así se verá tu factura</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-white p-8 min-h-[400px]">
                <div className="text-center text-muted-foreground py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Completá los datos para ver la vista previa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reportes */}
        <TabsContent value="reportes" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolución Mensual</CardTitle>
                <CardDescription>Facturación de los últimos 3 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(RESUMEN_MENSUAL).map(([mes, datos]) => (
                    <div key={mes} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{mes}</span>
                        <span className="text-sm font-bold">${(datos.facturado / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <div className="flex-1 bg-green-500 h-8 rounded flex items-center justify-center text-white font-medium"
                             style={{ width: `${(datos.cobrado / datos.facturado) * 100}%` }}>
                          ${(datos.cobrado / 1000).toFixed(0)}k
                        </div>
                        <div className="flex-1 bg-yellow-500 h-8 rounded flex items-center justify-center text-white font-medium"
                             style={{ width: `${(datos.pendiente / datos.facturado) * 100}%` }}>
                          ${(datos.pendiente / 1000).toFixed(0)}k
                        </div>
                        <div className="flex-1 bg-red-500 h-8 rounded flex items-center justify-center text-white font-medium"
                             style={{ width: `${(datos.vencido / datos.facturado) * 100}%` }}>
                          ${(datos.vencido / 1000).toFixed(0)}k
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>🟢 Cobrado</span>
                        <span>🟡 Pendiente</span>
                        <span>🔴 Vencido</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facturación por Obra Social</CardTitle>
                <CardDescription>Distribución del último mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {OBRAS_SOCIALES_STATS.map((os) => (
                    <div key={os.nombre} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{os.nombre}</span>
                        <span className="text-sm font-bold">${(os.total / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500" 
                          style={{ width: `${(os.total / 804000) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{os.facturas} facturas</span>
                        <span>Promedio: ${os.promedio.toLocaleString('es-AR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Exportar Reportes</CardTitle>
                  <CardDescription>Descargá tus reportes contables</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </TabsContent>

        {/* AFIP */}
        <TabsContent value="afip" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Integración AFIP</CardTitle>
              <CardDescription>Conexión con servicios de facturación electrónica</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Webservice AFIP</p>
                      <p className="text-xs text-muted-foreground">Conectado y funcionando</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">Activo</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Certificado Digital</p>
                      <p className="text-xs text-muted-foreground">Válido hasta: 15/12/2024</p>
                    </div>
                  </div>
                  <Badge variant="outline">Configurado</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">CUIT</p>
                      <p className="text-xs text-muted-foreground">20-12345678-9</p>
                    </div>
                  </div>
                  <Badge variant="outline">Verificado</Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">
                      Integración con FacturaAPP
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Utilizamos FacturaAPP como intermediario para la facturación electrónica. 
                      Todas las facturas se envían automáticamente a AFIP y se obtiene el CAE al instante.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar AFIP
                </Button>
                <Button variant="outline">
                  Renovar Certificado
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimos CAE Obtenidos</CardTitle>
              <CardDescription>Códigos de autorización electrónica</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factura</TableHead>
                    <TableHead>CAE</TableHead>
                    <TableHead>Fecha Emisión</TableHead>
                    <TableHead>Vencimiento CAE</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">FAC-2024-001</TableCell>
                    <TableCell>74123456789012</TableCell>
                    <TableCell>15/01/2024</TableCell>
                    <TableCell>25/01/2024</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Válido</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FAC-2024-002</TableCell>
                    <TableCell>74123456789013</TableCell>
                    <TableCell>18/01/2024</TableCell>
                    <TableCell>28/01/2024</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-white">Válido</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
