"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  Home,
  Ambulance,
  UserCog,
  Package,
  StickyNote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Módulos del sistema organizados por sección
const sidebarItems = [
  // ===== BASE ($35/mes) =====
  {
    title: "Agenda",
    href: "/agenda",
    icon: Calendar,
    badge: null,
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
  {
    title: "Sticky Notes",
    href: "/sticky-notes",
    icon: StickyNote,
    badge: null,
  },

  // ===== PRO ($65/mes) =====
  {
    title: "Atención Domiciliaria",
    href: "/ambulatorios",
    icon: Home,
    badge: "PRO",
  },
  {
    title: "Recetas y Órdenes",
    href: "/recetas",
    icon: FileText,
    badge: "PRO",
  },
  {
    title: "Comunicaciones",
    href: "/comunicaciones",
    icon: MessageSquare,
    badge: "PRO",
  },
  {
    title: "Reportes",
    href: "/reportes",
    icon: BarChart3,
    badge: "PRO",
  },
  {
    title: "Portal Pacientes",
    href: "/configuracion-portal",
    icon: Users,
    badge: "PRO",
  },

  // ===== PREMIUM ($110/mes) =====
  {
    title: "Recordatorios",
    href: "/recordatorios",
    icon: Bell,
    badge: "PREMIUM",
  },
  {
    title: "Automatizaciones",
    href: "/automatizaciones",
    icon: Workflow,
    badge: "PREMIUM",
  },
  {
    title: "Facturación",
    href: "/facturacion",
    icon: DollarSign,
    badge: "PREMIUM",
  },
  {
    title: "Envíos",
    href: "/envios",
    icon: Package,
    badge: "PREMIUM",
  },

  // ===== ENTERPRISE (Personalizado) =====
  {
    title: "Servicio de Emergencias",
    href: "/emergencias",
    icon: Ambulance,
    badge: "ENTERPRISE",
  },
  {
    title: "Auditoría",
    href: "/auditoria",
    icon: FileStack,
    badge: "ENTERPRISE",
  },
  {
    title: "Telemedicina",
    href: "/telemedicina",
    icon: Heart,
    badge: "ENTERPRISE",
  },
  {
    title: "Cumplimiento",
    href: "/cumplimiento",
    icon: Shield,
    badge: "ENTERPRISE",
  },
];

// Items de configuración (siempre al final)
const configItems = [
  {
    title: "Usuarios y Roles",
    href: "/roles",
    icon: UserCog,
  },
  {
    title: "Configuración",
    href: "/configuracion",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "relative flex h-full flex-col border-r bg-card transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Botón de collapse/expand - estilo "notch" */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-3 top-5 z-50 h-6 w-6 rounded-full border-2 bg-background shadow-md hover:bg-accent"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      <div className="flex h-16 items-center border-b px-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-5 w-5" />
          </div>
          {!isCollapsed && <span>Consultorio</span>}
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <TooltipProvider delayDuration={0}>
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item, index) => {
              const linkContent = (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && (
                    <>
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
                    </>
                  )}
                </Link>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      {linkContent}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-2">
                      {item.title}
                      {item.badge && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 text-[10px] font-semibold rounded uppercase",
                            item.badge === "PRO" && "bg-blue-500/10 text-blue-600",
                            item.badge === "PREMIUM" && "bg-purple-500/10 text-purple-600",
                            item.badge === "ENTERPRISE" && "bg-amber-500/10 text-amber-600"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </nav>
        </TooltipProvider>
      </div>
      
      {/* Configuración - Siempre visible al final */}
      <div className="border-t">
        <TooltipProvider delayDuration={0}>
          <nav className="grid gap-1 px-2 py-3">
            {configItems.map((item, index) => {
              const linkContent = (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span className="flex-1">{item.title}</span>}
                </Link>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      {linkContent}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </nav>
        </TooltipProvider>
      </div>

      <div className="border-t p-4">
        <TooltipProvider delayDuration={0}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/login">
                  <Button variant="outline" size="icon" className="w-full">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Cerrar Sesión
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </Link>
          )}
        </TooltipProvider>
      </div>
    </div>
  );
}
