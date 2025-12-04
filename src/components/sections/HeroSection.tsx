import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100">
            <Sparkles className="h-3 w-3 mr-1" />
            18 Módulos Completos • 0 Setup • Soporte 24/7
          </Badge>
          
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            Tu Sistema Médico,
            <br />
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Completamente Listo
            </span>
          </h1>
          
          <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
            Desde consultas simples hasta despacho de ambulancias. 
            <span className="font-semibold text-foreground"> Nos encargamos de todo:</span> hosting, implementación, capacitación, soporte y personalización.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-10 text-base bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 shadow-lg shadow-cyan-500/30">
                <Rocket className="mr-2 h-5 w-5" />
                Empezar Ahora - Gratis
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="h-14 px-10 text-base border-2">
                Ver Planes y Precios <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>15 días de prueba</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Cancela cuando quieras</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-20rem)] -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%)] aspect-[1155/678] w-[50rem] -translate-x-1/2 bg-gradient-to-tr from-cyan-500 to-teal-600 opacity-20" />
      </div>
    </section>
  );
}
