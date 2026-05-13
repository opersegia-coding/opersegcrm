"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CalendarCheck,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Contactos", active: false },
  { icon: FolderKanban, label: "Proyectos", active: false },
  { icon: CalendarCheck, label: "Acciones", active: false },
  { icon: BarChart3, label: "Analíticas", active: false },
  { icon: Settings, label: "Ajustes", active: false },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 glow-primary">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-foreground">
              CRM<span className="text-primary">.PANEL</span>
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              SYS_v4.2.8
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <div className="mb-4">
          {!collapsed && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Navegación
            </span>
          )}
        </div>
        {navItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
              index === activeIndex
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {index === activeIndex && (
              <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
            )}
            <item.icon
              className={cn(
                "h-5 w-5 transition-colors",
                index === activeIndex ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Status indicator */}
      <div className="border-t border-border p-4">
        {!collapsed ? (
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Sistema Activo
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              Última sync: hace 2 min
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  )
}
