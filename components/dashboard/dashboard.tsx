"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { Charts } from "@/components/dashboard/charts"
import { ContactsTable } from "@/components/dashboard/contacts-table"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { PipelineFunnel } from "@/components/dashboard/pipeline-funnel"
import { NewContactDialog } from "@/components/dashboard/dialogs"
import { CrmProvider, useCrm } from "@/components/crm-provider"

function DashboardContent() {
  const { contacts } = useCrm()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 noise-overlay" />

      {/* Grid pattern background */}
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-30" />

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Dashboard content */}
        <main id="main-scroll" className="flex-1 overflow-y-auto scroll-smooth p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Page title */}
            <div id="dashboard" className="space-y-1 scroll-mt-6">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Sistema Activo
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Panel de Gestión de{" "}
                <span className="gradient-text">Clientes</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Monitoreo en tiempo real de tu pipeline de ventas y relaciones comerciales.
              </p>
            </div>

            {/* Stats cards */}
            <StatsCards contacts={contacts} />

            {/* Quick access directly below metrics */}
            <QuickActions />

            {/* Charts */}
            <section id="analiticas" className="scroll-mt-6">
              <Charts contacts={contacts} />
            </section>

            {/* Two column layout */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left column - Table */}
              <div id="contactos" className="lg:col-span-2 scroll-mt-6">
                <ContactsTable contacts={contacts} />
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <section id="proyectos" className="scroll-mt-6">
                  <PipelineFunnel contacts={contacts} />
                </section>
              </div>
            </div>

            {/* Activity feed */}
            <section id="acciones" className="scroll-mt-6">
              <ActivityFeed contacts={contacts} />
            </section>

            {/* Footer */}
            <footer className="border-t border-border pt-6">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-xs text-muted-foreground">
                    CRM.PANEL // SISTEMA EN LÍNEA
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  © 2026 OPERSEG.IA — Todos los derechos reservados
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Dialogs */}
      <NewContactDialog />
    </div>
  )
}

export function Dashboard() {
  return (
    <CrmProvider>
      <DashboardContent />
    </CrmProvider>
  )
}
