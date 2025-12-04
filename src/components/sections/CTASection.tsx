import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-cyan-600 to-teal-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Empezá hoy mismo
          </h2>
          <p className="text-xl text-cyan-100 mb-10">
            15 días de prueba gratis. Sin tarjeta de crédito. Cancelá cuando quieras.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-base">
                <Rocket className="mr-2 h-5 w-5" />
                Crear Cuenta Gratis
              </Button>
            </Link>
            <Link href="/solicitar-turno">
              <Button size="lg" variant="outline" className="h-14 px-10 text-base border-2 border-white text-white hover:bg-white/10">
                Ver Demo en Vivo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
