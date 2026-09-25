"use client"

import Link from "next/link"
import { Users, Target, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Contact } from "@/lib/crm-data"
import {
  getContactsByType,
  getProjectsByStatus,
  getTotalValue,
} from "@/lib/crm-data"

interface StatsCardsProps {
  contacts: Contact[]
}

export function StatsCards({ contacts }: StatsCardsProps) {
  const byType = getContactsByType(contacts)
  const byStatus = getProjectsByStatus(contacts)
  const totalValue = getTotalValue(contacts)
  const activeProjects = byStatus["En progreso"]
  const conversionRate = Math.round(
    (byType.Cliente / (byType.Lead + byType.Prospecto + byType.Cliente)) * 100
  )

  const stats = [
    {
      label: "Total Contactos",
      value: contacts.length.toString(),
      subValue: `${byType.Lead} Leads · ${byType.Cliente} Clientes`,
      icon: Users,
      color: "primary",
      trend: "+12%",
      trendUp: true,
      href: "#contactos",
    },
    {
      label: "Valor Pipeline",
      value: `€${totalValue.toLocaleString()}`,
      subValue: `${Object.values(byStatus).reduce((a, b) => a + b, 0)} proyectos activos`,
      icon: Target,
      color: "accent",
      trend: "+8.5%",
      trendUp: true,
      href: "#proyectos",
    },
    {
      label: "Tasa Conversión",
      value: `${conversionRate}%`,
      subValue: `${byType.Cliente} de ${byType.Lead + byType.Prospecto + byType.Cliente}`,
      icon: TrendingUp,
      color: "primary",
      trend: "+3.2%",
      trendUp: true,
      href: "#analiticas",
    },
    {
      label: "Acciones Pendientes",
      value: activeProjects.toString(),
      subValue: `${byStatus.Perdido} oportunidades perdidas`,
      icon: AlertCircle,
      color: "warning",
      trend: "-2",
      trendUp: false,
      href: "#acciones",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Link key={stat.label} href={stat.href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <Card className="group relative overflow-hidden border-border bg-card transition-all hover:border-primary/30">
          {/* Gradient accent */}
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-1",
              stat.color === "primary" && "bg-primary",
              stat.color === "accent" && "bg-accent",
              stat.color === "warning" && "bg-warning"
            )}
          />

          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.subValue}</p>
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  stat.color === "primary" && "bg-primary/10 text-primary",
                  stat.color === "accent" && "bg-accent/10 text-accent",
                  stat.color === "warning" && "bg-warning/10 text-warning"
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>

            {/* Trend indicator */}
            <div className="mt-4 flex items-center gap-1">
              <span
                className={cn(
                  "font-mono text-xs font-medium",
                  stat.trendUp ? "text-primary" : "text-destructive"
                )}
              >
                {stat.trend}
              </span>
              <span className="text-xs text-muted-foreground">
                vs mes anterior
              </span>
            </div>
          </CardContent>

          {/* Hover effect */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </Card>
      </Link>
      ))}
    </div>
  )
}
