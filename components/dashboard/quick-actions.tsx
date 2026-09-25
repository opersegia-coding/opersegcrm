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
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useCrm } from "@/components/crm-provider"
import {
  ActionDialog,
  SettingsDialog,
  type ActionKind,
} from "@/components/dashboard/dialogs"

function exportContactsCsv(contacts: ReturnType<typeof useCrm>["contacts"]) {
  const headers = [
    "Nombre",
    "Apellido",
    "Tipo",
    "Cargo",
    "Email",
    "Organización",
    "Teléfono",
    "Estado Proyecto",
    "Valor Proyecto",
    "Vencimiento",
    "Próxima Acción",
  ]
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`
  const rows = contacts.map((c) =>
    [
      c.nombre,
      c.apellido,
      c.tipo,
      c.cargo,
      c.email,
      c.organizacion,
      c.telefono,
      c.estadoProyecto ?? "",
      c.valorProyecto?.toString() ?? "",
      c.vencimiento,
      c.nextAction,
    ]
      .map(escape)
      .join(",")
  )
  const csv = "\uFEFF" + [headers.map(escape).join(","), ...rows].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `contactos-crm-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast.success("Exportación completa", {
    description: `${contacts.length} contactos descargados en CSV.`,
  })
}

export function QuickActions() {
  const { contacts, openNewContact } = useCrm()
  const [action, setAction] = useState<ActionKind>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const actions = [
    {
      icon: UserPlus,
      label: "Nuevo Contacto",
      description: "Agregar un nuevo lead o cliente",
      color: "primary",
      onClick: openNewContact,
    },
    {
      icon: FileText,
      label: "Crear Propuesta",
      description: "Generar documento de propuesta",
      color: "accent",
      onClick: () => setAction("propuesta"),
    },
    {
      icon: Send,
      label: "Email Masivo",
      description: "Enviar campaña a contactos",
      color: "primary",
      onClick: () => setAction("email"),
    },
    {
      icon: CalendarPlus,
      label: "Agendar",
      description: "Programar una reunión",
      color: "accent",
      onClick: () => setAction("agendar"),
    },
    {
      icon: Download,
      label: "Exportar",
      description: "Descargar datos a CSV",
      color: "primary",
      onClick: () => exportContactsCsv(contacts),
    },
    {
      icon: Settings2,
      label: "Configurar",
      description: "Ajustes del sistema",
      color: "accent",
      onClick: () => setSettingsOpen(true),
    },
  ]

  return (
    <Card className="border-border bg-card">
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
          {actions.map((actionItem) => (
            <button
              key={actionItem.label}
              type="button"
              onClick={actionItem.onClick}
              className={cn(
                "group flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center transition-all",
                "hover:border-primary/30 hover:bg-secondary/50"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  actionItem.color === "primary"
                    ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                    : "bg-accent/10 text-accent group-hover:bg-accent/20"
                )}
              >
                <actionItem.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {actionItem.label}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {actionItem.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>

      <ActionDialog kind={action} onClose={() => setAction(null)} />
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Card>
  )
}
