"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Clock,
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Contact } from "@/lib/crm-data"
import { getUpcomingActions } from "@/lib/crm-data"

interface ActivityFeedProps {
  contacts: Contact[]
}

export function ActivityFeed({ contacts }: ActivityFeedProps) {
  const [showAll, setShowAll] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])

  const pending = contacts.filter((c) => !completed.includes(c.id))
  const all = getUpcomingActions(pending)
  const upcomingActions = showAll ? all : all.slice(0, 5)

  const markDone = (contact: Contact) => {
    setCompleted((prev) => [...prev, contact.id])
    toast.success("Acción completada", {
      description: `${contact.nextAction} — ${contact.nombre} ${contact.apellido}`,
    })
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Próximas Acciones
            </p>
            <CardTitle className="text-lg">Actividad Pendiente</CardTitle>
          </div>
          <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/30">
            <Clock className="h-3 w-3" />
            {upcomingActions.length} pendientes
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingActions.map((contact, index) => {
          const isUrgent = index === 0
          const isOverdue = contact.vencimiento.includes("may") && new Date().getMonth() >= 4

          return (
            <div
              key={contact.id}
              className={cn(
                "group relative rounded-lg border p-4 transition-all hover:border-primary/30",
                isUrgent ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30"
              )}
            >
              {/* Priority indicator */}
              {isUrgent && (
                <div className="absolute -left-px top-3 h-8 w-1 rounded-r-full bg-primary" />
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {isOverdue ? (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    ) : (
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        "font-mono text-xs",
                        isOverdue ? "text-warning" : "text-muted-foreground"
                      )}
                    >
                      {contact.vencimiento}
                    </span>
                    <Badge
                      variant="outline"
                      className="ml-auto bg-secondary/50 text-[10px] text-muted-foreground"
                    >
                      {contact.tipo}
                    </Badge>
                  </div>

                  <p className="text-sm font-medium text-foreground">
                    {contact.nextAction}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-muted-foreground">
                      {contact.nombre} {contact.apellido}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {contact.organizacion}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  title="Marcar como completada"
                  onClick={() => markDone(contact)}
                  className="h-8 w-8 shrink-0 opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}

        {upcomingActions.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No hay acciones pendientes. ¡Todo al día!
          </p>
        )}

        {all.length > 5 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll((prev) => !prev)}
            className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
          >
            {showAll ? "Ver menos" : `Ver todas las acciones (${all.length})`}
            <ArrowRight
              className={cn("h-4 w-4 transition-transform", showAll && "rotate-90")}
            />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
