import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">MediCore</div>
              <div className="text-xs text-muted-foreground">Sistema Médico Integral</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">Iniciar Sesión</Link>
            <Link href="#features" className="hover:text-foreground transition-colors">Módulos</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Planes</Link>
            <Link href="#services" className="hover:text-foreground transition-colors">Servicios</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 MediCore. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
