"use client"

import { useState } from "react"
import {
  UserPlus,
  FileText,
  Send,
  CalendarPlus,
  Download,
  Settings2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const actions = [
  {
    icon: UserPlus,
    label: "Nuevo Contacto",
    description: "Agregar un nuevo lead o cliente",
    color: "primary",
  },
  {
    icon: FileText,
    label: "Crear Propuesta",
    description: "Generar documento de propuesta",
    color: "accent",
  },
  {
    icon: Send,
    label: "Email Masivo",
    description: "Enviar campaña a contactos",
    color: "primary",
  },
  {
    icon: CalendarPlus,
    label: "Agendar",
    description: "Programar una reunión",
    color: "accent",
  },
  {
    icon: Download,
    label: "Exportar",
    description: "Descargar datos a CSV",
    color: "primary",
  },
  {
    icon: Settings2,
    label: "Configurar",
    description: "Ajustes del sistema",
    color: "accent",
  },
]

export function QuickActions() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  return (
    <Card className="border-border bg-card">
      {selectedAction && (
        <div className="mx-6 mt-4 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">
          Demo activo: {selectedAction}. La acción se ha preparado correctamente.
        </div>
      )}
      <CardHeader className="pb-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Acceso Rápido
          </p>
          <CardTitle className="text-lg">Acciones</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => setSelectedAction(action.label)}
              className={cn(
                "group flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center transition-all",
                "hover:border-primary/30 hover:bg-secondary/50"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  action.color === "primary"
                    ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                    : "bg-accent/10 text-accent group-hover:bg-accent/20"
                )}
              >
                <action.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {action.label}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
