"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Settings,
  Zap,
  LogOut,
  Clock,
  FileText,
  DollarSign,
  BarChart3,
  MessageSquare,
  Bell,
  Workflow,
  FileStack,
  Heart,
  Shield,
} from "lucide-react";

// Módulos del sistema con badges para indicar plan (MVP, Pro, Premium)
const sidebarItems = [
  // ===== MVP (Core Features) =====
  {
    title: "Agenda",
    href: "/agenda",
    icon: Calendar,
    badge: null, // Incluido en base
  },
  {
    title: "Turnos",
    href: "/turnos",
    icon: Clock,
    badge: null,
  },
  {
    title: "Pacientes",
    href: "/pacientes",
    icon: Users,
    badge: null,
  },

  // ===== PRO (Monetización Core) =====
  {
    title: "Recetas y Órdenes",
    href: "/recetas",
    icon: FileText,
    badge: "PRO", // Generación de PDFs con firma digital
  },
  {
    title: "Comunicaciones",
    href: "/comunicaciones",
    icon: MessageSquare,
    badge: "PRO", // WhatsApp API + Email + SMS + Chat Interno
  },
  {
    title: "Reportes",
    href: "/reportes",
    icon: BarChart3,
    badge: "PRO", // Estadísticas de consultorio
  },

  // ===== PREMIUM (Features Avanzadas) =====
  {
    title: "Recordatorios",
    href: "/recordatorios",
    icon: Bell,
    badge: "PREMIUM", // Sistema automatizado de recordatorios
  },
  {
    title: "Automatizaciones",
    href: "/automatizaciones",
    icon: Workflow,
    badge: "PREMIUM", // n8n workflows (seguimientos, emails)
  },
  {
    title: "Facturación",
    href: "/facturacion",
    icon: DollarSign,
    badge: "PREMIUM", // Cobros, Obra Social, AFIP
  },

  // ===== ENTERPRISE (Add-ons Opcionales) =====
  {
    title: "Auditoría",
    href: "/auditoria",
    icon: FileStack,
    badge: "ENTERPRISE", // Logs completos, trazabilidad
  },
  {
    title: "Telemedicina",
    href: "/telemedicina",
    icon: Heart,
    badge: "ENTERPRISE", // Videollamadas integradas
  },
  {
    title: "Cumplimiento",
    href: "/cumplimiento",
    icon: Shield,
    badge: "ENTERPRISE", // HIPAA, Ley 25.326, exportaciones
  },

  // ===== Siempre Visible =====
  {
    title: "Configuración",
    href: "/configuracion",
    icon: Settings,
    badge: null,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-5 w-5" />
          </div>
          <span>Consultorio</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] font-semibold rounded uppercase",
                    item.badge === "PRO" && "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
                    item.badge === "PREMIUM" && "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
                    item.badge === "ENTERPRISE" && "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <Link href="/login">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </Link>
      </div>
    </div>
  );
}
