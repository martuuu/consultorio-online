export function StatsSection() {
  return (
    <section className="py-16 border-y border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">20</div>
            <div className="text-sm text-muted-foreground mt-1">Módulos Completos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">15,000+</div>
            <div className="text-sm text-muted-foreground mt-1">Líneas de Código</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">24/7</div>
            <div className="text-sm text-muted-foreground mt-1">Soporte Incluido</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">100%</div>
            <div className="text-sm text-muted-foreground mt-1">En la Nube</div>
          </div>
        </div>
      </div>
    </section>
  );
}
