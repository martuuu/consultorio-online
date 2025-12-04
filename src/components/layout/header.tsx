"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Bell, Settings, User, MessageSquare, X, CheckCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { HeaderStickyNotes } from "@/components/features/HeaderStickyNotes";

interface Notification {
  id: string;
  type: "chat" | "appointment" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export function Header() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Cargar notificaciones desde localStorage
  useEffect(() => {
    const loadNotifications = () => {
      const stored = localStorage.getItem("notifications");
      if (stored) {
        const parsed: Notification[] = JSON.parse(stored);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      }
    };

    loadNotifications();

    // Escuchar evento personalizado cuando llega una nueva notificación
    const handleNewNotification = (event: CustomEvent<Notification>) => {
      const newNotif = event.detail;
      setNotifications(prev => {
        const updated = [newNotif, ...prev].slice(0, 10); // Mantener solo las últimas 10
        localStorage.setItem("notifications", JSON.stringify(updated));
        return updated;
      });
      setUnreadCount(prev => prev + 1);
      
      // Mostrar toast
      toast.info(newNotif.title, {
        description: newNotif.message
      });
    };

    window.addEventListener("newNotification", handleNewNotification as EventListener);

    // Polling para detectar cambios de otros tabs
    const interval = setInterval(loadNotifications, 1000);

    return () => {
      window.removeEventListener("newNotification", handleNewNotification as EventListener);
      clearInterval(interval);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem("notifications", JSON.stringify(updated));
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem("notifications", JSON.stringify(updated));
      setUnreadCount(0);
      return updated;
    });
    toast.success("Todas las notificaciones marcadas como leídas");
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.setItem("notifications", JSON.stringify([]));
    toast.success("Notificaciones eliminadas");
  };
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative w-full max-w-md hidden lg:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar pacientes, turnos..."
            className="w-full bg-background pl-8"
          />
        </div>
        
        {/* Sticky Notes - a la derecha del buscador */}
        <HeaderStickyNotes />
      </div>
      
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <Button variant="outline" size="sm" asChild className="hidden md:flex whitespace-nowrap">
          <a href="/solicitar-turno" target="_blank" rel="noopener noreferrer">
            Ver Turnero Público
          </a>
        </Button>
        
        {/* Notificaciones Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notificaciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notificaciones</span>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                  onClick={markAllAsRead}
                >
                  <CheckCheck className="mr-1 h-3 w-3" />
                  Marcar todas leídas
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p>No hay notificaciones</p>
              </div>
            ) : (
              <>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-1">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors border-l-2 ${
                          notif.read ? "border-transparent" : "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                        }`}
                        onClick={() => {
                          markAsRead(notif.id);
                          if (notif.link) {
                            window.location.href = notif.link;
                          }
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <div className="shrink-0 mt-1">
                            {notif.type === "chat" && (
                              <MessageSquare className="h-4 w-4 text-blue-500" />
                            )}
                            {notif.type === "appointment" && (
                              <Bell className="h-4 w-4 text-green-500" />
                            )}
                            {notif.type === "system" && (
                              <Settings className="h-4 w-4 text-orange-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                              {notif.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {notif.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notif.timestamp}
                            </p>
                          </div>
                          {!notif.read && (
                            <div className="shrink-0">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <DropdownMenuSeparator />
                <div className="p-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={clearAll}
                  >
                    <X className="mr-1 h-3 w-3" />
                    Limpiar todo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    asChild
                  >
                    <Link href="/comunicaciones?tab=chat">
                      Ver Chat
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                DR
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Dr. Juan Pérez</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/agenda" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Panel de Control
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/configuracion" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="cursor-pointer text-destructive">
                Cerrar Sesión
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
