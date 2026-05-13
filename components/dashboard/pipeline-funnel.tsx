"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Contact } from "@/lib/crm-data"
import { getContactsByType } from "@/lib/crm-data"

interface PipelineFunnelProps {
  contacts: Contact[]
}

export function PipelineFunnel({ contacts }: PipelineFunnelProps) {
  const byType = getContactsByType(contacts)

  const stages = [
    { name: "Prospectos", count: byType.Prospecto, color: "bg-info" },
    { name: "Leads", count: byType.Lead, color: "bg-primary" },
    { name: "Clientes", count: byType.Cliente, color: "bg-accent" },
    { name: "Socios", count: byType.Socio, color: "bg-warning" },
  ]

  const maxCount = Math.max(...stages.map((s) => s.count))

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Embudo de Conversión
          </p>
          <CardTitle className="text-lg">Pipeline de Ventas</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {stages.map((stage, index) => {
          const widthPercent = (stage.count / maxCount) * 100
          
          return (
            <div key={stage.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      stage.color
                    )}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {stage.name}
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-foreground">
                  {stage.count}
                </span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-lg bg-secondary/50">
                <div
                  className={cn(
                    "h-full rounded-lg transition-all duration-500",
                    stage.color
                  )}
                  style={{
                    width: `${widthPercent}%`,
                    opacity: 0.7 - index * 0.1,
                  }}
                />
                {/* Animated pulse overlay */}
                <div
                  className={cn(
                    "absolute inset-0 animate-pulse rounded-lg",
                    stage.color
                  )}
                  style={{
                    width: `${widthPercent}%`,
                    opacity: 0.1,
                  }}
                />
              </div>
            </div>
          )
        })}

        {/* Conversion indicators */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-primary">
              {Math.round((byType.Lead / byType.Prospecto) * 100) || 0}%
            </p>
            <p className="text-[10px] text-muted-foreground">
              Prospecto → Lead
            </p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-accent">
              {Math.round((byType.Cliente / byType.Lead) * 100) || 0}%
            </p>
            <p className="text-[10px] text-muted-foreground">
              Lead → Cliente
            </p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-warning">
              {Math.round((byType.Socio / byType.Cliente) * 100) || 0}%
            </p>
            <p className="text-[10px] text-muted-foreground">
              Cliente → Socio
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
