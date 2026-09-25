"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  ChevronDown,
  Filter,
  ArrowUpDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { Contact, ContactType, ProjectStatus } from "@/lib/crm-data"

interface ContactsTableProps {
  contacts: Contact[]
}

const typeColors: Record<ContactType, string> = {
  Lead: "bg-primary/20 text-primary border-primary/30",
  Cliente: "bg-accent/20 text-accent border-accent/30",
  Prospecto: "bg-info/20 text-info border-info/30",
  Socio: "bg-warning/20 text-warning border-warning/30",
}

const statusColors: Record<ProjectStatus, string> = {
  "No iniciado": "bg-muted text-muted-foreground",
  "En progreso": "bg-primary/20 text-primary",
  Completado: "bg-success/20 text-success",
  Perdido: "bg-destructive/20 text-destructive",
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  const [filter, setFilter] = useState<ContactType | "Todos">("Todos")

  const filteredContacts =
    filter === "Todos"
      ? contacts
      : contacts.filter((c) => c.tipo === filter)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Base de Datos
            </p>
            <CardTitle className="text-lg">Contactos Registrados</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {filter}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {["Todos", "Lead", "Cliente", "Prospecto", "Socio"].map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setFilter(type as ContactType | "Todos")}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Ordenar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Contacto
                </TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Tipo
                </TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Organización
                </TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Estado
                </TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Valor
                </TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Vencimiento
                </TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.slice(0, 8).map((contact) => (
                <TableRow
                  key={contact.id}
                  className="group border-border transition-colors hover:bg-secondary/30"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarFallback className="bg-secondary text-xs text-foreground">
                          {contact.nombre[0]}
                          {contact.apellido[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {contact.nombre} {contact.apellido}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-mono text-[10px]",
                        typeColors[contact.tipo]
                      )}
                    >
                      {contact.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {contact.organizacion}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {contact.estadoProyecto ? (
                      <Badge
                        className={cn(
                          "font-mono text-[10px]",
                          statusColors[contact.estadoProyecto]
                        )}
                      >
                        {contact.estadoProyecto}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {contact.valorProyecto ? (
                      <span className="font-mono text-sm font-medium text-primary">
                        €{contact.valorProyecto.toLocaleString("de-DE")}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {contact.vencimiento}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Llamar
                        </DropdownMenuItem>
                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium text-foreground">
              {Math.min(8, filteredContacts.length)}
            </span>{" "}
            de{" "}
            <span className="font-medium text-foreground">
              {filteredContacts.length}
            </span>{" "}
            contactos
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
