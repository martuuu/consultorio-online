import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Página no encontrada</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Es posible que haya sido movida o eliminada.
        </p>
        <Link href="/">
          <Button size="lg">Volver al Inicio</Button>
        </Link>
      </div>
    </div>
  );
}
