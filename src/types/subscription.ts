// Feature flags and subscription types

export type PlanTier = "BASE" | "PRO" | "PREMIUM" | "ENTERPRISE";

export type ModuleKey =
  // Base (MVP)
  | "agenda"
  | "turnos"
  | "pacientes"
  | "configuracion"
  // PRO
  | "recetas"
  | "facturacion"
  | "reportes"
  // PREMIUM
  | "comunicaciones"
  | "recordatorios"
  | "automatizaciones"
  // ENTERPRISE
  | "auditoria"
  | "telemedicina"
  | "cumplimiento";

export interface Module {
  key: ModuleKey;
  title: string;
  description: string;
  tier: PlanTier;
  priceUSD: number; // One-time setup cost
  maintenanceUSD: number; // Monthly recurring
  features: string[];
}

export interface Subscription {
  userId: string;
  plan: PlanTier;
  modules: ModuleKey[];
  setupPaidAt?: string; // ISO date
  expiresAt?: string; // ISO date (for trials or annual plans)
  isActive: boolean;
  billingCycle: "monthly" | "annual";
  nextBillingDate: string;
}

export interface FeatureFlag {
  moduleKey: ModuleKey;
  isEnabled: boolean;
  trialDaysRemaining?: number;
}

// Plan definitions for pricing
export const PLAN_MODULES: Record<PlanTier, ModuleKey[]> = {
  BASE: ["agenda", "turnos", "pacientes", "configuracion"],
  PRO: ["recetas", "facturacion", "reportes"],
  PREMIUM: ["comunicaciones", "recordatorios", "automatizaciones"],
  ENTERPRISE: ["auditoria", "telemedicina", "cumplimiento"],
};

// Pricing structure
export const MODULE_CATALOG: Module[] = [
  // PRO Modules
  {
    key: "recetas",
    title: "Recetas y Órdenes",
    description: "Generación de PDFs profesionales con firma digital",
    tier: "PRO",
    priceUSD: 200,
    maintenanceUSD: 5,
    features: [
      "Recetas médicas digitales",
      "Órdenes de estudios",
      "Certificados médicos",
      "Firma digital",
      "Envío automático por email",
    ],
  },
  {
    key: "facturacion",
    title: "Facturación",
    description: "Gestión de cobros e integración AFIP",
    tier: "PRO",
    priceUSD: 250,
    maintenanceUSD: 10,
    features: [
      "Factura electrónica AFIP",
      "Gestión de obra social",
      "Control de pagos",
      "Reportes de ingresos",
    ],
  },
  {
    key: "reportes",
    title: "Reportes y Analytics",
    description: "Dashboard con métricas y estadísticas",
    tier: "PRO",
    priceUSD: 150,
    maintenanceUSD: 5,
    features: [
      "Dashboard de métricas",
      "Exportación Excel/PDF",
      "Gráficos de tendencias",
      "Análisis de ausentismo",
    ],
  },

  // PREMIUM Modules
  {
    key: "comunicaciones",
    title: "Comunicaciones",
    description: "WhatsApp, Email y SMS automatizados",
    tier: "PREMIUM",
    priceUSD: 300,
    maintenanceUSD: 15,
    features: [
      "WhatsApp Business API",
      "Email transaccional",
      "SMS vía Twilio",
      "Historial de mensajes",
    ],
  },
  {
    key: "recordatorios",
    title: "Recordatorios",
    description: "Sistema automatizado de recordatorios",
    tier: "PREMIUM",
    priceUSD: 200,
    maintenanceUSD: 10,
    features: [
      "Recordatorios pre-turno",
      "Seguimientos post-consulta",
      "Templates personalizables",
      "Múltiples canales",
    ],
  },
  {
    key: "automatizaciones",
    title: "Automatizaciones (n8n)",
    description: "Workflows personalizados sin código",
    tier: "PREMIUM",
    priceUSD: 400,
    maintenanceUSD: 20,
    features: [
      "Workflows visuales",
      "Integraciones externas",
      "Formularios pre-consulta",
      "Sincronización con obra social",
    ],
  },

  // ENTERPRISE Modules
  {
    key: "auditoria",
    title: "Auditoría y Compliance",
    description: "Trazabilidad completa para regulaciones",
    tier: "ENTERPRISE",
    priceUSD: 800,
    maintenanceUSD: 30,
    features: [
      "Logs de auditoría completos",
      "Trazabilidad de cambios",
      "Exportación regulatoria",
      "Cumplimiento ISO 27001",
    ],
  },
  {
    key: "telemedicina",
    title: "Telemedicina",
    description: "Videollamadas integradas en la plataforma",
    tier: "ENTERPRISE",
    priceUSD: 1200,
    maintenanceUSD: 40,
    features: [
      "Videollamadas HD",
      "Sala de espera virtual",
      "Grabación de sesiones",
      "Pago online integrado",
    ],
  },
  {
    key: "cumplimiento",
    title: "Cumplimiento Legal",
    description: "HIPAA, GDPR, Ley 25.326",
    tier: "ENTERPRISE",
    priceUSD: 1000,
    maintenanceUSD: 35,
    features: [
      "HIPAA Compliance",
      "Ley 25.326 (Argentina)",
      "Backup cifrado automático",
      "Exportación completa de datos",
      "Firma digital certificada",
    ],
  },
];

// Helper function to check if user has access to a module
export function hasModuleAccess(
  subscription: Subscription,
  moduleKey: ModuleKey
): boolean {
  // BASE modules are always included
  if (PLAN_MODULES.BASE.includes(moduleKey)) {
    return true;
  }

  // Check if module is explicitly enabled
  return subscription.modules.includes(moduleKey);
}

// Helper to calculate total setup cost for a plan
export function calculatePlanCost(modules: ModuleKey[]): {
  setupCost: number;
  monthlyMaintenance: number;
} {
  const baseCost = 1500; // MVP setup
  const baseMaintenance = 25; // MVP monthly

  const moduleCosts = modules
    .map((key) => MODULE_CATALOG.find((m) => m.key === key))
    .filter((m): m is Module => m !== undefined);

  const setupCost =
    baseCost + moduleCosts.reduce((sum, m) => sum + m.priceUSD, 0);
  const monthlyMaintenance =
    baseMaintenance + moduleCosts.reduce((sum, m) => sum + m.maintenanceUSD, 0);

  return { setupCost, monthlyMaintenance };
}
