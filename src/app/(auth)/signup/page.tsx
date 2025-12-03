import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Zap className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Empieza a gestionar tu consultorio hoy mismo
          </p>
        </div>

        <div className="rounded-xl bg-card p-8 shadow-sm ring-1 ring-border">
          <form className="space-y-6" action="/agenda">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name">Nombre</Label>
                <div className="mt-2">
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="last-name">Apellido</Label>
                <div className="mt-2">
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="doctor@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">
                  ¿Ya tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Inicia Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
