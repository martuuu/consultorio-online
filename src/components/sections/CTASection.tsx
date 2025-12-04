import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-cyan-600 to-teal-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Explorá el sistema completo
          </h2>
          <p className="text-xl text-cyan-100 mb-10">
            Accedé al demo en vivo con todos los módulos activos. Sin registro, sin esperas.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/agenda">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-base shadow-lg">
                <Rocket className="mr-2 h-5 w-5" />
                Ver Demo Live
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" className="h-14 px-10 text-base bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 backdrop-blur-sm">
                Ver Planes y Precios
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
