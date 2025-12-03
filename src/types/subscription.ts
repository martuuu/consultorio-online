// Feature flags and subscription types

export type PlanTier = "BASE" | "PRO" | "PREMIUM" | "ENTERPRISE";

export type UserRole = "SUPERADMIN" | "ADMIN" | "MEDICO" | "RECEPCIONISTA";

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
  | "cumplimiento"
  | "portal-pacientes";

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
  ENTERPRISE: ["auditoria", "telemedicina", "cumplimiento", "portal-pacientes"],
};

// Plan hierarchy for access control
export const PLAN_HIERARCHY: Record<PlanTier, number> = {
  BASE: 1,
  PRO: 2,
  PREMIUM: 3,
  ENTERPRISE: 4
};

// Badge colors by tier
export const TIER_COLORS: Record<PlanTier, {
  bg: string;
  text: string;
  badge: string;
  ring: string;
}> = {
  BASE: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-700 dark:text-gray-300",
    badge: "bg-gray-500",
    ring: "ring-gray-200 dark:ring-gray-700"
  },
  PRO: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
    badge: "bg-blue-500",
    ring: "ring-blue-200 dark:ring-blue-800"
  },
  PREMIUM: {
    bg: "bg-purple-50 dark:bg-purple-950",
    text: "text-purple-700 dark:text-purple-300",
    badge: "bg-purple-500",
    ring: "ring-purple-200 dark:ring-purple-800"
  },
  ENTERPRISE: {
    bg: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-700 dark:text-amber-300",
    badge: "bg-amber-500",
    ring: "ring-amber-200 dark:ring-amber-800"
  }
};

// Role permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPERADMIN: ["*"], // Full access
  ADMIN: [
    "manage_users",
    "manage_patients",
    "manage_appointments",
    "view_reports",
    "manage_billing",
    "manage_settings",
    "view_audit_logs"
  ],
  MEDICO: [
    "view_patients",
    "edit_patients",
    "manage_appointments",
    "view_medical_records",
    "edit_medical_records",
    "generate_prescriptions",
    "view_reports"
  ],
  RECEPCIONISTA: [
    "view_patients",
    "create_patients",
    "manage_appointments",
    "view_waiting_list",
    "contact_patients"
  ]
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
  {
    key: "portal-pacientes",
    title: "Portal de Pacientes",
    description: "Acceso web para pacientes",
    tier: "ENTERPRISE",
    priceUSD: 600,
    maintenanceUSD: 25,
    features: [
      "Acceso seguro para pacientes",
      "Ver y confirmar turnos",
      "Historial de consultas",
      "Descarga de documentos",
      "Pago de consultas online",
      "Notificaciones automáticas",
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

// Helper: Check if a plan has access to another plan's modules
export function canAccessPlan(userPlan: PlanTier, requiredPlan: PlanTier): boolean {
  return PLAN_HIERARCHY[userPlan] >= PLAN_HIERARCHY[requiredPlan];
}

// Helper: Get all modules available for a plan (including inherited)
export function getAvailableModules(userPlan: PlanTier): ModuleKey[] {
  const modules: ModuleKey[] = [];
  
  // Add BASE modules
  modules.push(...PLAN_MODULES.BASE);
  
  // Add PRO modules if user has PRO or higher
  if (canAccessPlan(userPlan, "PRO")) {
    modules.push(...PLAN_MODULES.PRO);
  }
  
  // Add PREMIUM modules if user has PREMIUM or higher
  if (canAccessPlan(userPlan, "PREMIUM")) {
    modules.push(...PLAN_MODULES.PREMIUM);
  }
  
  // Add ENTERPRISE modules if user has ENTERPRISE
  if (canAccessPlan(userPlan, "ENTERPRISE")) {
    modules.push(...PLAN_MODULES.ENTERPRISE);
  }
  
  return modules;
}

// Helper: Get locked modules for a plan
export function getLockedModules(userPlan: PlanTier): ModuleKey[] {
  const available = getAvailableModules(userPlan);
  const allModules = Object.values(PLAN_MODULES).flat();
  return allModules.filter(m => !available.includes(m));
}

// Helper: Check if user role has permission
export function hasRolePermission(userRole: UserRole, action: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions.includes("*") || permissions.includes(action);
}

// Helper: Get required plan for a module
export function getRequiredPlan(moduleKey: ModuleKey): PlanTier {
  const moduleData = MODULE_CATALOG.find(m => m.key === moduleKey);
  return moduleData?.tier || "BASE";
}

// Helper: Format role name for display
export function formatRoleName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    SUPERADMIN: "Super Administrador",
    ADMIN: "Administrador",
    MEDICO: "Médico",
    RECEPCIONISTA: "Recepcionista"
  };
  return names[role];
}
