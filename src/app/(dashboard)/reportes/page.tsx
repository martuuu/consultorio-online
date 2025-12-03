"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Download, 
  FileText,
  Activity,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function ReportesPage() {
  // Mock data
  const stats = {
    totalPatients: 248,
    monthlyPatients: 127,
    occupancy: 78,
    absenteeism: 12,
    revenue: 45600,
  };

  const monthlyData = [
    { month: "Ene", patients: 89, revenue: 32400 },
    { month: "Feb", patients: 95, revenue: 34200 },
    { month: "Mar", patients: 102, revenue: 36800 },
    { month: "Abr", patients: 110, revenue: 39600 },
    { month: "May", patients: 118, revenue: 42500 },
    { month: "Jun", patients: 127, revenue: 45600 },
  ];

  const topDiagnosis = [
    { code: "J00", name: "Rinofaringitis aguda", count: 24 },
    { code: "I10", name: "Hipertensión esencial", count: 18 },
    { code: "E11.9", name: "Diabetes tipo 2", count: 15 },
    { code: "M54.5", name: "Dolor lumbar", count: 12 },
    { code: "J06.9", name: "Infección respiratoria", count: 10 },
  ];

  const occupancyByDay = [
    { day: "Lun", percentage: 85 },
    { day: "Mar", percentage: 92 },
    { day: "Mié", percentage: 78 },
    { day: "Jue", percentage: 71 },
    { day: "Vie", percentage: 88 },
    { day: "Sáb", percentage: 45 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground">Analytics en tiempo real de tu consultorio</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500 text-white">PRO</Badge>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Select defaultValue="last-6-months">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-week">Última semana</SelectItem>
                <SelectItem value="last-month">Último mes</SelectItem>
                <SelectItem value="last-3-months">Últimos 3 meses</SelectItem>
                <SelectItem value="last-6-months">Últimos 6 meses</SelectItem>
                <SelectItem value="last-year">Último año</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Médico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los médicos</SelectItem>
                <SelectItem value="navarro">Dr. Navarro</SelectItem>
                <SelectItem value="lopez">Dra. Lopez</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sala" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las salas</SelectItem>
                <SelectItem value="1">Consultorio 1</SelectItem>
                <SelectItem value="2">Sala de Rayos X</SelectItem>
                <SelectItem value="3">Consultorio 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyPatients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8%</span> vs promedio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ocupación</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancy}%</div>
            <p className="text-xs text-muted-foreground">
              Promedio semanal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausentismo</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.absenteeism}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">-3%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.revenue / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evolution" className="space-y-6">
        <TabsList>
          <TabsTrigger value="evolution">
            <TrendingUp className="mr-2 h-4 w-4" />
            Evolución
          </TabsTrigger>
          <TabsTrigger value="occupancy">
            <Calendar className="mr-2 h-4 w-4" />
            Ocupación
          </TabsTrigger>
          <TabsTrigger value="diagnosis">
            <FileText className="mr-2 h-4 w-4" />
            Diagnósticos
          </TabsTrigger>
        </TabsList>

        {/* Evolución */}
        <TabsContent value="evolution" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pacientes por Mes</CardTitle>
                <CardDescription>Evolución de consultas en los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-muted-foreground">{data.month}</div>
                      <div className="flex-1">
                        <div className="h-8 rounded-lg bg-primary/20 relative overflow-hidden">
                          <div 
                            className="h-full bg-primary flex items-center justify-end pr-2 text-xs font-medium text-white"
                            style={{ width: `${(data.patients / 127) * 100}%` }}
                          >
                            {data.patients}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Mes</CardTitle>
                <CardDescription>Evolución de ingresos en los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-muted-foreground">{data.month}</div>
                      <div className="flex-1">
                        <div className="h-8 rounded-lg bg-green-500/20 relative overflow-hidden">
                          <div 
                            className="h-full bg-green-500 flex items-center justify-end pr-2 text-xs font-medium text-white"
                            style={{ width: `${(data.revenue / 45600) * 100}%` }}
                          >
                            ${(data.revenue / 1000).toFixed(1)}k
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendencia Anual</CardTitle>
              <CardDescription>Proyección basada en últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-8 py-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Promedio Mensual</p>
                  <p className="text-3xl font-bold">106</p>
                  <p className="text-xs text-muted-foreground">pacientes/mes</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Proyección Anual</p>
                  <p className="text-3xl font-bold text-primary">1,272</p>
                  <p className="text-xs text-muted-foreground">pacientes/año</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Ingresos Anuales</p>
                  <p className="text-3xl font-bold text-green-500">$458k</p>
                  <p className="text-xs text-muted-foreground">proyectados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ocupación */}
        <TabsContent value="occupancy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ocupación por Día de la Semana</CardTitle>
              <CardDescription>Porcentaje promedio de ocupación de agenda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {occupancyByDay.map((day, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{day.day}</span>
                      <span className="text-muted-foreground">{day.percentage}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          day.percentage >= 80 ? "bg-green-500" :
                          day.percentage >= 60 ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}
                        style={{ width: `${day.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Recomendaciones</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    Martes tiene la mayor ocupación (92%), considera agregar turnos
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    Sábado tiene baja ocupación (45%), podrías reducir horarios
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Horarios Pico</CardTitle>
                <CardDescription>Franjas horarias más solicitadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">09:00 - 10:00</span>
                    <Badge variant="outline">Alta demanda</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">10:00 - 11:00</span>
                    <Badge variant="outline">Alta demanda</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">15:00 - 16:00</span>
                    <Badge variant="outline">Media demanda</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">18:00 - 19:00</span>
                    <Badge variant="outline">Baja demanda</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duración Promedio</CardTitle>
                <CardDescription>Tiempo promedio de consultas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold">28</p>
                    <p className="text-sm text-muted-foreground">minutos promedio</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Primera consulta:</span>
                      <span className="font-medium">35 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Control:</span>
                      <span className="font-medium">22 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Urgencia:</span>
                      <span className="font-medium">18 min</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Diagnósticos */}
        <TabsContent value="diagnosis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Diagnósticos Más Frecuentes</CardTitle>
              <CardDescription>Top 5 diagnósticos del último mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDiagnosis.map((diagnosis, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="font-medium">{diagnosis.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">{diagnosis.code}</Badge>
                        </div>
                        <span className="text-sm font-medium">{diagnosis.count} casos</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${(diagnosis.count / 24) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Categorías CIE-10</CardTitle>
                <CardDescription>Distribución por tipo de patología</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enfermedades Respiratorias</span>
                    <span className="font-medium">38%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enfermedades Cardiovasculares</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enfermedades Endocrinas</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enfermedades Musculoesqueléticas</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Otros</span>
                    <span className="font-medium">7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Ausentismo</CardTitle>
                <CardDescription>Pacientes que no asistieron</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold text-red-500">15</p>
                    <p className="text-sm text-muted-foreground">ausentes este mes</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      Impacto Económico
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pérdida estimada: <span className="font-bold">$5,400</span> en el último mes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Exportar Reportes</CardTitle>
          <CardDescription>Descarga los datos en diferentes formatos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar a Excel (.xlsx)
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar a PDF
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar a CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
