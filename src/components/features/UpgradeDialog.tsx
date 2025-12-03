"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Module, PlanTier } from "@/types/subscription";

interface UpgradeDialogProps {
  module: Module;
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeDialog({ module, isOpen, onClose }: UpgradeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    // TODO: Implement Stripe/MercadoPago checkout
    // For now, just simulate loading
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      alert(`Upgrade a ${module.title} iniciado. Redirigiendo a checkout...`);
    }, 1500);
  };

  const tierColors: Record<PlanTier, string> = {
    BASE: "bg-gray-500",
    PRO: "bg-blue-500",
    PREMIUM: "bg-purple-500",
    ENTERPRISE: "bg-amber-500",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${tierColors[module.tier]}/10`}>
              <Sparkles className={`h-6 w-6 text-${tierColors[module.tier].replace("bg-", "")}`} />
            </div>
            <div>
              <DialogTitle className="text-xl">{module.title}</DialogTitle>
              <Badge variant="secondary" className="mt-1">
                {module.tier}
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-base">
            {module.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">
              Funcionalidades incluidas:
            </h4>
            <ul className="space-y-2">
              {module.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Costo de implementación</span>
              <span className="font-bold text-lg">${module.priceUSD} USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mantenimiento mensual</span>
              <span className="font-semibold">${module.maintenanceUSD} USD/mes</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleUpgrade} disabled={isLoading} className="gap-2">
            {isLoading ? (
              "Procesando..."
            ) : (
              <>
                Contratar ahora
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
