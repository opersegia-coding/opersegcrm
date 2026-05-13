"use client"

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Contact } from "@/lib/crm-data"
import {
  getMonthlyData,
  getValueByOrganization,
  getProjectsByStatus,
} from "@/lib/crm-data"

interface ChartsProps {
  contacts: Contact[]
}

const COLORS = {
  primary: "oklch(0.85 0.2 140)",
  accent: "oklch(0.75 0.18 180)",
  chart3: "oklch(0.65 0.15 280)",
  warning: "oklch(0.8 0.18 85)",
}

export function Charts({ contacts }: ChartsProps) {
  const monthlyData = getMonthlyData()
  const orgData = getValueByOrganization(contacts)
  const statusData = getProjectsByStatus(contacts)

  const pieData = [
    { name: "En progreso", value: statusData["En progreso"], color: COLORS.primary },
    { name: "No iniciado", value: statusData["No iniciado"], color: COLORS.accent },
    { name: "Completado", value: statusData.Completado, color: COLORS.chart3 },
    { name: "Perdido", value: statusData.Perdido, color: COLORS.warning },
  ].filter(d => d.value > 0)

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Revenue trend */}
      <Card className="border-border bg-card lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Análisis Temporal
              </p>
              <CardTitle className="text-lg">Tendencia de Valor</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Clientes</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  axisLine={{ stroke: "oklch(0.25 0.02 250)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0.01 250)",
                    border: "1px solid oklch(0.25 0.02 250)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "oklch(0.95 0 0)" }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLeads)"
                />
                <Area
                  type="monotone"
                  dataKey="clientes"
                  stroke={COLORS.accent}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorClientes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Project status pie */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Distribución
          </p>
          <CardTitle className="text-lg">Estado Proyectos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0.01 250)",
                    border: "1px solid oklch(0.25 0.02 250)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-mono text-xs text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Organization value bar chart */}
      <Card className="border-border bg-card lg:col-span-3">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Pipeline por Organización
              </p>
              <CardTitle className="text-lg">Valor por Empresa</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orgData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  axisLine={{ stroke: "oklch(0.25 0.02 250)" }}
                  tickLine={false}
                  tickFormatter={(value) => `€${value}`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0.01 250)",
                    border: "1px solid oklch(0.25 0.02 250)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`€${value.toLocaleString()}`, "Valor"]}
                />
                <Bar
                  dataKey="value"
                  fill={COLORS.primary}
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
