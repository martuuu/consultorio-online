import { Badge } from "@/components/ui/badge";
import { Building2, Rocket, Stethoscope, Phone, Settings, Shield } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-cyan-600 text-white border-0">Servicio Completo</Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Nosotros nos encargamos de <span className="text-cyan-600">todo</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            No solo te damos el software. Te acompañamos en cada paso para que tu consultorio esté operativo desde el día uno.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-card shadow-sm border border-border/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white mb-4 shadow-lg">
              <Building2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Hosting Incluido</h3>
            <p className="text-sm text-muted-foreground">
              Servidor en la nube, backup automático, SSL certificado. Tus datos seguros 24/7 sin costos adicionales.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-card shadow-sm border border-border/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white mb-4 shadow-lg">
              <Rocket className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Implementación</h3>
            <p className="text-sm text-muted-foreground">
              Configuramos todo por vos: usuarios, horarios, salas, plantillas. En 48hs tu sistema está listo para usar.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-card shadow-sm border border-border/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white mb-4 shadow-lg">
              <Stethoscope className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Capacitación</h3>
            <p className="text-sm text-muted-foreground">
              Sesiones en vivo para vos y tu equipo. Videos tutoriales y documentación completa en español.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-card shadow-sm border border-border/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white mb-4 shadow-lg">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Soporte 24/7</h3>
            <p className="text-sm text-muted-foreground">
              WhatsApp, email, videollamada. Respondemos en menos de 2 horas. Porque sabemos que tu consultorio no para.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-card shadow-sm border border-border/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white mb-4 shadow-lg">
              <Settings className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalización</h3>
            <p className="text-sm text-muted-foreground">
              ¿Necesitás algo específico? Adaptamos el sistema a tu especialidad y forma de trabajar sin cargo extra.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-card shadow-sm border border-border/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white mb-4 shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Actualizaciones</h3>
            <p className="text-sm text-muted-foreground">
              Nuevas funciones cada mes. Sin reinstalaciones, sin interrupciones. Tu sistema siempre al día.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
