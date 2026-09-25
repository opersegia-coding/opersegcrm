"use client"

import { useState } from "react"
import { Bell, Search, Plus, User, CalendarDays } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCrm } from "@/components/crm-provider"
import { SettingsDialog } from "@/components/dashboard/dialogs"
import { getUpcomingActions } from "@/lib/crm-data"

export function DashboardHeader() {
  const { contacts, search, setSearch, openNewContact } = useCrm()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [readNotifications, setReadNotifications] = useState<string[]>([])

  const upcoming = getUpcomingActions(contacts).slice(0, 3)
  const unreadCount = upcoming.filter((c) => !readNotifications.includes(c.id)).length

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Panel de Gestión
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            CONTROL_CENTER // ACTIVE_SESSION
          </p>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              if (e.target.value) scrollTo("contactos")
            }}
            placeholder="Buscar contactos, proyectos..."
            className="w-80 bg-secondary/50 pl-10 font-mono text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <Button
          onClick={openNewContact}
          className="gap-2 bg-primary text-primary-foreground glow-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nuevo Contacto</span>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm font-semibold text-foreground">
                Notificaciones
              </p>
              <p className="font-mono text-[10px] text-muted-foreground">
                ACCIONES PRÓXIMAS A VENCER
              </p>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {upcoming.map((c) => {
                const isRead = readNotifications.includes(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setReadNotifications((prev) => [...prev, c.id])
                      scrollTo("acciones")
                    }}
                    className="flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-secondary/50"
                  >
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm text-foreground">
                        {c.nextAction}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.nombre} {c.apellido} · {c.vencimiento}
                      </p>
                    </div>
                    {!isRead && (
                      <span className="ml-auto mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={() => setReadNotifications(upcoming.map((c) => c.id))}
              className="w-full px-4 py-2 text-center text-xs text-primary transition-colors hover:bg-secondary/50"
            >
              Marcar todas como leídas
            </button>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-primary/20 text-sm text-primary">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  ROLE_ADMIN
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                toast.info("Perfil de Admin", {
                  description: "admin@operseg.ai · Rol: Administrador",
                })
              }
            >
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() =>
                toast.info("Demo", {
                  description: "La sesión demo no requiere cierre de sesión.",
                })
              }
            >
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </header>
  )
}
