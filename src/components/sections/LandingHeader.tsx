import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/20">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">MediCore</span>
            <span className="text-[10px] text-muted-foreground -mt-1">Sistema Médico Integral</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Módulos
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Planes
          </Link>
          <Link href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
            Servicios
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">Iniciar Sesión</Button>
          </Link>
          <Link href="/agenda">
            <Button size="sm" className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
              Empezar Gratis
            </Button>
          </Link>
        </nav>
        <div className="md:hidden">
          <Link href="/login">
             <Button size="sm">Ingresar</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
