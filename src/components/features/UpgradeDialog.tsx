"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Sparkles, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import type { ModuleKey, PlanTier } from "@/types/subscription";
import { MODULE_CATALOG, TIER_COLORS, getRequiredPlan } from "@/types/subscription";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleKey: ModuleKey;
  currentPlan?: PlanTier;
}

export function UpgradeDialog({
  open,
  onOpenChange,
  moduleKey,
  currentPlan = "BASE",
}: UpgradeDialogProps) {
  const moduleData = MODULE_CATALOG.find((m) => m.key === moduleKey);
  const requiredPlan = getRequiredPlan(moduleKey);
  const tierColors = TIER_COLORS[requiredPlan];

  if (!moduleData) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tierColors.bg}`}>
              <Lock className={`h-6 w-6 ${tierColors.text}`} />
            </div>
            <div>
              <DialogTitle className="text-2xl">{moduleData.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${tierColors.badge} text-white border-0`}>
                  {requiredPlan}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Plan requerido
                </span>
              </div>
            </div>
          </div>
          <DialogDescription className="text-base mt-4">
            {moduleData.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Features List */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Características incluidas
            </h4>
            <ul className="space-y-2">
              {moduleData.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Info */}
          <div className={`rounded-lg border-2 ${tierColors.ring} ${tierColors.bg} p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Costo de setup</p>
                <p className="text-2xl font-bold">
                  ${moduleData.priceUSD}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    única vez
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Mantenimiento mensual</p>
                <p className="text-2xl font-bold">
                  ${moduleData.maintenanceUSD}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    /mes
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Current Plan Info */}
          <div className="rounded-lg bg-muted/50 p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Tu plan actual: {currentPlan}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Para acceder a <strong>{moduleData.title}</strong>, necesitas actualizar a{" "}
              <strong>{requiredPlan}</strong> o superior.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Volver
          </Button>
          <Link href="/#pricing" className="flex-1">
            <Button className={`w-full ${tierColors.badge}`}>
              Ver Planes y Precios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Contact CTA */}
        <div className="text-center pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            ¿Necesitas ayuda?{" "}
            <Link href="/#contact" className="text-primary hover:underline font-medium">
              Contacta con ventas
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
