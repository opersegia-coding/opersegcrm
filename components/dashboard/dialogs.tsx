"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Building2, Briefcase } from "lucide-react"
import { useCrm } from "@/components/crm-provider"
import {
  formatCurrency,
  type Contact,
  type ContactType,
  type ProjectStatus,
} from "@/lib/crm-data"

/* ---------------- Nuevo Contacto ---------------- */

const emptyForm = {
  nombre: "",
  apellido: "",
  cargo: "",
  email: "",
  organizacion: "",
  telefono: "",
  tipo: "Lead" as ContactType,
  estadoProyecto: "No iniciado" as ProjectStatus,
  valorProyecto: "",
  vencimiento: "Pendiente",
  nextAction: "Contactar",
}

export function NewContactDialog() {
  const { addContact } = useCrm()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("crm:open-new-contact", handler)
    return () => window.removeEventListener("crm:open-new-contact", handler)
  }, [])

  const set = (key: keyof typeof emptyForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre.trim() || !form.apellido.trim() || !form.email.trim()) {
      toast.error("Faltan datos", {
        description: "Nombre, apellido y email son obligatorios.",
      })
      return
    }
    addContact({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      cargo: form.cargo.trim() || "—",
      email: form.email.trim(),
      organizacion: form.organizacion.trim() || "Sin organización",
      telefono: form.telefono.trim() || "—",
      tipo: form.tipo,
      estadoProyecto: form.estadoProyecto,
      valorProyecto: form.valorProyecto ? Number(form.valorProyecto) : null,
      vencimiento: form.vencimiento || "Pendiente",
      nextAction: form.nextAction || "Contactar",
    })
    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuevo Contacto</DialogTitle>
          <DialogDescription>
            Agrega un nuevo lead o cliente a tu pipeline.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nc-nombre">Nombre *</Label>
              <Input
                id="nc-nombre"
                value={form.nombre}
                onChange={(e) => set("nombre")(e.target.value)}
                placeholder="Ana"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nc-apellido">Apellido *</Label>
              <Input
                id="nc-apellido"
                value={form.apellido}
                onChange={(e) => set("apellido")(e.target.value)}
                placeholder="García"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nc-email">Email *</Label>
              <Input
                id="nc-email"
                type="email"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder="ana@empresa.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nc-telefono">Teléfono</Label>
              <Input
                id="nc-telefono"
                value={form.telefono}
                onChange={(e) => set("telefono")(e.target.value)}
                placeholder="+34 600 000 000"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nc-org">Organización</Label>
              <Input
                id="nc-org"
                value={form.organizacion}
                onChange={(e) => set("organizacion")(e.target.value)}
                placeholder="Empresa S.A."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nc-cargo">Cargo</Label>
              <Input
                id="nc-cargo"
                value={form.cargo}
                onChange={(e) => set("cargo")(e.target.value)}
                placeholder="CEO"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select
                value={form.tipo}
                onValueChange={(v) => set("tipo")(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Lead", "Cliente", "Prospecto", "Socio"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Select
                value={form.estadoProyecto}
                onValueChange={(v) => set("estadoProyecto")(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["No iniciado", "En progreso", "Completado", "Perdido"].map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nc-valor">Valor ($)</Label>
              <Input
                id="nc-valor"
                type="number"
                min="0"
                value={form.valorProyecto}
                onChange={(e) => set("valorProyecto")(e.target.value)}
                placeholder="1000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar Contacto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ---------------- Detalles de Contacto ---------------- */

interface ContactDetailsDialogProps {
  contact: Contact | null
  onClose: () => void
}

export function ContactDetailsDialog({
  contact,
  onClose,
}: ContactDetailsDialogProps) {
  return (
    <Dialog open={!!contact} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        {contact && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {contact.nombre[0]}
                    {contact.apellido[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle>
                    {contact.nombre} {contact.apellido}
                  </DialogTitle>
                  <DialogDescription>{contact.cargo}</DialogDescription>
                </div>
                <Badge variant="outline" className="ml-auto">
                  {contact.tipo}
                </Badge>
              </div>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-foreground hover:text-primary"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${contact.telefono}`}
                  className="text-foreground hover:text-primary"
                >
                  {contact.telefono}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="text-foreground">{contact.organizacion}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span className="text-foreground">
                  {contact.estadoProyecto ?? "Sin proyecto"} ·{" "}
                  {contact.valorProyecto
                    ? formatCurrency(contact.valorProyecto)
                    : "—"}
                </span>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Próxima acción · {contact.vencimiento}
                </p>
                <p className="mt-1 text-foreground">{contact.nextAction}</p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

/* ---------------- Acción genérica (propuesta / email / agendar) ---------------- */

export type ActionKind = "propuesta" | "email" | "agendar" | null

interface ActionDialogProps {
  kind: ActionKind
  onClose: () => void
}

const actionMeta = {
  propuesta: {
    title: "Crear Propuesta",
    description: "Genera un documento de propuesta comercial.",
    messageLabel: "Resumen de la propuesta",
    submitLabel: "Generar Propuesta",
    success: "Propuesta generada y guardada en documentos.",
  },
  email: {
    title: "Email Masivo",
    description: "Envía una campaña a tus contactos.",
    messageLabel: "Mensaje de la campaña",
    submitLabel: "Enviar Campaña",
    success: "Campaña enviada a tu lista de contactos.",
  },
  agendar: {
    title: "Agendar Reunión",
    description: "Programa una reunión con un contacto.",
    messageLabel: "Notas de la reunión",
    submitLabel: "Agendar",
    success: "Reunión agendada en el calendario.",
  },
} as const

export function ActionDialog({ kind, onClose }: ActionDialogProps) {
  const { contacts } = useCrm()
  const [contactId, setContactId] = useState<string>("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    if (kind) {
      setContactId("")
      setSubject("")
      setMessage("")
      setDate("")
    }
  }, [kind])

  if (!kind) return null
  const meta = actionMeta[kind]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactId) {
      toast.error("Selecciona un contacto")
      return
    }
    const contact = contacts.find((c) => c.id === contactId)
    toast.success(meta.title, {
      description: `${meta.success} (${contact?.nombre} ${contact?.apellido})`,
    })
    onClose()
  }

  return (
    <Dialog open={!!kind} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{meta.title}</DialogTitle>
          <DialogDescription>{meta.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Contacto *</Label>
            <Select value={contactId} onValueChange={setContactId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un contacto" />
              </SelectTrigger>
              <SelectContent>
                {contacts.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nombre} {c.apellido} — {c.organizacion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ad-subject">
              {kind === "agendar" ? "Título" : "Asunto"}
            </Label>
            <Input
              id="ad-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={
                kind === "email"
                  ? "Campaña de primavera"
                  : kind === "propuesta"
                    ? "Propuesta comercial Q3"
                    : "Reunión de seguimiento"
              }
            />
          </div>
          {kind === "agendar" && (
            <div className="space-y-1.5">
              <Label htmlFor="ad-date">Fecha y hora</Label>
              <Input
                id="ad-date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="ad-msg">{meta.messageLabel}</Label>
            <Textarea
              id="ad-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe aquí..."
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{meta.submitLabel}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ---------------- Ajustes ---------------- */

interface SettingsDialogProps {
  open: boolean
  onClose: () => void
}

export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const [notifications, setNotifications] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [sound, setSound] = useState(false)

  const handleSave = () => {
    toast.success("Ajustes guardados", {
      description: "La configuración del sistema se actualizó.",
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajustes del Sistema</DialogTitle>
          <DialogDescription>
            Configura las preferencias de tu panel CRM.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {[
            {
              label: "Notificaciones",
              desc: "Recibir alertas de acciones pendientes",
              value: notifications,
              set: setNotifications,
            },
            {
              label: "Sincronización automática",
              desc: "Sincronizar datos cada 5 minutos",
              value: autoSync,
              set: setAutoSync,
            },
            {
              label: "Sonidos",
              desc: "Reproducir sonido en notificaciones",
              value: sound,
              set: setSound,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={item.value}
                onClick={() => item.set(!item.value)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  item.value ? "bg-primary" : "bg-secondary"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${
                    item.value ? "translate-x-5.5 left-0" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
