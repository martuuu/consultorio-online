"use client";

import { useState, useEffect } from "react";
import { X, Check, Eye, StickyNote as StickyNoteIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { toast } from "sonner";

type StickyNoteContext = "global" | "patient" | "appointment" | "room" | "page";
type StickyNotePriority = "low" | "normal" | "high";
type StickyNoteStatus = "active" | "checked" | "archived";

interface StickyNote {
  id: string;
  title: string;
  content: string;
  context: StickyNoteContext;
  contextId?: string;
  contextName?: string;
  url: string;
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  status: StickyNoteStatus;
  viewedAt?: Date;
  checkedBy?: {
    id: string;
    name: string;
    checkedAt: Date;
    notes?: string;
  };
  mentions: string[];
  createdAt: Date;
  expiresAt?: Date;
  priority: StickyNotePriority;
  isPrivate: boolean;
}

interface StickyNotesConfig {
  enabled: boolean;
  maxNotesPerPage: number;
}

const CURRENT_USER = {
  id: "user-1",
  name: "Dr. Juan Pérez",
  role: "MEDICO",
};

// Colores por rol - Paleta suave y moderna
const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  SUPERADMIN: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-300" },
  ADMIN: { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-300" },
  MEDICO: { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-300" },
  ENFERMERO: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-300" },
  RECEPCIONISTA: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-300" },
  SECRETARIA: { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-300" },
};

export function HeaderStickyNotes() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [config, setConfig] = useState<StickyNotesConfig>({ enabled: true, maxNotesPerPage: 5 });
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  // Load notes and config
  useEffect(() => {
    const loadNotes = () => {
      const stored = localStorage.getItem("sticky-notes");
      const storedConfig = localStorage.getItem("sticky-notes-config");
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const mapped = parsed.map((n: StickyNote) => ({
            ...n,
            createdAt: new Date(n.createdAt),
            expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined,
            viewedAt: n.viewedAt ? new Date(n.viewedAt) : undefined,
          }));
          setNotes(mapped);
        } catch (e) {
          console.error("Error loading sticky notes", e);
        }
      }

      if (storedConfig) {
        try {
          setConfig(JSON.parse(storedConfig));
        } catch (e) {
          console.error("Error loading config", e);
        }
      }
    };

    loadNotes();

    // Listen for updates
    const handleUpdate = () => loadNotes();
    window.addEventListener("sticky-notes-updated", handleUpdate);

    return () => {
      window.removeEventListener("sticky-notes-updated", handleUpdate);
    };
  }, []);

  // Filter notes for current page
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const visibleNotes = notes
    .filter((note) => {
      if (note.status !== "active") return false;
      if (!config.enabled) return false;
      if (note.isPrivate && note.createdBy.id !== CURRENT_USER.id) return false;
      
      // Show global notes everywhere
      if (note.context === "global") return true;
      
      // Show notes for current page
      return note.url === currentPath;
    })
    .slice(0, config.maxNotesPerPage);

  const handleCheck = (noteId: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            status: "checked" as StickyNoteStatus,
            checkedBy: {
              id: CURRENT_USER.id,
              name: CURRENT_USER.name,
              checkedAt: new Date(),
            },
          }
        : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("sticky-notes", JSON.stringify(updatedNotes));
    window.dispatchEvent(new CustomEvent("sticky-notes-updated", { detail: updatedNotes }));
    toast.success("Nota marcada como vista");
    setExpandedNoteId(null);
  };

  const handleDismiss = (noteId: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, status: "archived" as StickyNoteStatus } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("sticky-notes", JSON.stringify(updatedNotes));
    window.dispatchEvent(new CustomEvent("sticky-notes-updated", { detail: updatedNotes }));
    toast.success("Nota archivada");
    setExpandedNoteId(null);
  };

  const toggleExpand = (noteId: string) => {
    setExpandedNoteId(expandedNoteId === noteId ? null : noteId);
  };

  if (visibleNotes.length === 0) return null;

  const displayNotes = visibleNotes.slice(0, 3);
  const remainingCount = visibleNotes.length - 3;

  return (
    <div className="relative flex items-center gap-2">
      {displayNotes.map((note) => {
        const roleColors = ROLE_COLORS[note.createdBy.role] || ROLE_COLORS.SECRETARIA;
        const isExpanded = expandedNoteId === note.id;

        return (
          <div key={note.id} className="relative">
            {/* Nota colapsada - Diseño mejorado */}
            <button
              onClick={() => toggleExpand(note.id)}
              className={`group relative ${roleColors.bg} hover:scale-105 px-4 py-2 rounded-lg text-xs font-medium shadow-md hover:shadow-lg transition-all border border-border/50 flex items-center gap-2 min-w-[120px]`}
              title={note.title}
            >
              <StickyNoteIcon className={`h-4 w-4 ${roleColors.text} group-hover:scale-110 transition-transform`} />
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className={`${roleColors.text} font-semibold truncate max-w-full block text-left`}>
                  {note.title}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {format(note.createdAt, "HH:mm", { locale: es })}
                </span>
              </div>
              {note.priority === "high" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Nota expandida - Dropdown hacia abajo */}
            {isExpanded && (
              <div className="absolute right-0 top-full mt-2 w-80 z-50">
                <div className={`${roleColors.bg} rounded-lg shadow-xl border border-border overflow-hidden`}>
                  {/* Header */}
                  <div className="p-4 border-b border-border/50">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm mb-1 ${roleColors.text}`}>
                          {note.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {format(note.createdAt, "dd/MM HH:mm", { locale: es })} • {note.createdBy.name.split(" ")[0]}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedNoteId(null);
                        }}
                        className="p-1 rounded hover:bg-background/50 transition-colors"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-3">
                      {note.content}
                    </p>

                    {note.contextName && (
                      <Link
                        href={note.url}
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 hover:underline mb-3"
                        onClick={() => setExpandedNoteId(null)}
                      >
                        <Eye className="h-3 w-3" />
                        Ver {note.contextName}
                      </Link>
                    )}

                    {note.mentions.length > 0 && (
                      <div className="mb-3 text-xs text-blue-600">
                        {note.mentions.join(", ")}
                      </div>
                    )}

                    {note.priority === "high" && (
                      <div className="mb-3">
                        <Badge variant="destructive" className="text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1" />
                          Prioridad Alta
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 p-4 border-t border-border/50 bg-background/50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheck(note.id);
                      }}
                      className="flex-1 px-3 py-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center justify-center gap-1"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Marcar Vista
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss(note.id);
                      }}
                      className="flex-1 px-3 py-2 text-xs font-medium bg-muted hover:bg-muted/80 rounded transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="h-3.5 w-3.5" />
                      Archivar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {remainingCount > 0 && (
        <Link href="/sticky-notes">
          <button
            className="group bg-linear-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border border-primary/20 hover:border-primary/30 px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 hover:scale-105"
            title={`Ver ${remainingCount} notas más`}
          >
            <span className="text-primary">+{remainingCount}</span>
            <StickyNoteIcon className="h-3.5 w-3.5 text-primary group-hover:rotate-12 transition-transform" />
          </button>
        </Link>
      )}
    </div>
  );
}
