export type ContactType = "Lead" | "Cliente" | "Prospecto" | "Socio"
export type ProjectStatus = "No iniciado" | "En progreso" | "Completado" | "Perdido"

export interface Contact {
  id: string
  vencimiento: string
  nextAction: string
  tipo: ContactType
  nombre: string
  apellido: string
  cargo: string
  email: string
  organizacion: string
  telefono: string
  estadoProyecto: ProjectStatus | null
  valorProyecto: number | null
}

export const contacts: Contact[] = [
  {
    id: "1",
    vencimiento: "3 may 2026",
    nextAction: "Preguntar sobre los planes",
    tipo: "Lead",
    nombre: "Ruby",
    apellido: "Doe",
    cargo: "CEO",
    email: "doe.ruby@acme.com",
    organizacion: "Acme Inc.",
    telefono: "+12 3466 34 00",
    estadoProyecto: "No iniciado",
    valorProyecto: 2500,
  },
  {
    id: "2",
    vencimiento: "8 may 2026",
    nextAction: "Enviar precios actualizados",
    tipo: "Cliente",
    nombre: "Priya",
    apellido: "Fischer",
    cargo: "Venue Manager",
    email: "venue@events.uk.com",
    organizacion: "EventoMania",
    telefono: "+44 5544 55",
    estadoProyecto: "En progreso",
    valorProyecto: 300,
  },
  {
    id: "3",
    vencimiento: "12 may 2026",
    nextAction: "Enviar correo después de la conferencia",
    tipo: "Lead",
    nombre: "Lena",
    apellido: "Glaze",
    cargo: "Marketing Director",
    email: "glaze.lena@bigcompany.com",
    organizacion: "Big Company Inc.",
    telefono: "+44 12 34 556",
    estadoProyecto: "Perdido",
    valorProyecto: 1500,
  },
  {
    id: "4",
    vencimiento: "13 may 2026",
    nextAction: "Verificar el feedback de la propuesta",
    tipo: "Lead",
    nombre: "Ray",
    apellido: "Johnson",
    cargo: "Personal Assistant",
    email: "ray.j@logicltd.com",
    organizacion: "Logic Ltd.",
    telefono: "+365 245 566",
    estadoProyecto: "En progreso",
    valorProyecto: 2600,
  },
  {
    id: "5",
    vencimiento: "13 may 2026",
    nextAction: "Solicitar factura",
    tipo: "Socio",
    nombre: "Deepak",
    apellido: "Patel",
    cargo: "Manager",
    email: "patel@seoptim.ca",
    organizacion: "SEOptim",
    telefono: "+77 911 123 45",
    estadoProyecto: null,
    valorProyecto: null,
  },
  {
    id: "6",
    vencimiento: "18 may 2026",
    nextAction: "Reactivar contacto",
    tipo: "Lead",
    nombre: "Molly",
    apellido: "Verma",
    cargo: "Sales Operations",
    email: "molly.ve@innovaresearch.com",
    organizacion: "Innovaresearch",
    telefono: "+58 234 56 11",
    estadoProyecto: "Perdido",
    valorProyecto: 800,
  },
  {
    id: "7",
    vencimiento: "13 jun 2026",
    nextAction: "Pedir más información sobre nuevas ofertas",
    tipo: "Socio",
    nombre: "Jake",
    apellido: "Noodle",
    cargo: "Account Executive",
    email: "jake.accounts@bank.ie",
    organizacion: "Bank",
    telefono: "+1 22 33 444 55",
    estadoProyecto: null,
    valorProyecto: null,
  },
  {
    id: "8",
    vencimiento: "27 jun 2026",
    nextAction: "Programar una revisión de 6 meses",
    tipo: "Cliente",
    nombre: "Katrin",
    apellido: "Smith",
    cargo: "Sales Enablement",
    email: "ksmith@clarityconsulting.com",
    organizacion: "Clarity Consulting",
    telefono: "+43 11 789 01",
    estadoProyecto: "En progreso",
    valorProyecto: 1300,
  },
  {
    id: "9",
    vencimiento: "5 jul 2026",
    nextAction: "Llamar para confirmar la recepción del contrato",
    tipo: "Cliente",
    nombre: "Jane",
    apellido: "Doe",
    cargo: "Lead Solutions Manager",
    email: "doe.jane@bigcompany.com",
    organizacion: "Big Company Inc.",
    telefono: "+1 222 678 90",
    estadoProyecto: null,
    valorProyecto: null,
  },
  {
    id: "10",
    vencimiento: "13 jul 2026",
    nextAction: "Reconectar después de las vacaciones",
    tipo: "Cliente",
    nombre: "Nina",
    apellido: "Crumb",
    cargo: "Sales Lead",
    email: "crumb.nina@bigcompany.com",
    organizacion: "Big Company Inc.",
    telefono: "+44 12 34 556",
    estadoProyecto: "En progreso",
    valorProyecto: 500,
  },
  {
    id: "11",
    vencimiento: "20 jul 2026",
    nextAction: "Hacer seguimiento para agendar la próxima llamada",
    tipo: "Prospecto",
    nombre: "Joe",
    apellido: "Bloggs",
    cargo: "Business Process Consultant",
    email: "bloggs.joe@acme.com",
    organizacion: "Acme Inc.",
    telefono: "+1 555 123 45",
    estadoProyecto: null,
    valorProyecto: null,
  },
  {
    id: "12",
    vencimiento: "23 jul 2026",
    nextAction: "Reconectar después de las vacaciones",
    tipo: "Lead",
    nombre: "Amit",
    apellido: "Kumar",
    cargo: "Founder",
    email: "amit.k@logicltd.com",
    organizacion: "Logic Ltd.",
    telefono: "+365 245 566",
    estadoProyecto: "No iniciado",
    valorProyecto: 950,
  },
  {
    id: "13",
    vencimiento: "30 jul 2026",
    nextAction: "Pedir un testimonio",
    tipo: "Cliente",
    nombre: "Robert",
    apellido: "Walsh",
    cargo: "Marketing Manager",
    email: "walsh@pinnaclefinance.com",
    organizacion: "Pinnacle Finance",
    telefono: "+87 44 11 00",
    estadoProyecto: "Completado",
    valorProyecto: 2500,
  },
  {
    id: "14",
    vencimiento: "7 ago 2026",
    nextAction: "Confirmar los tomadores de decisiones",
    tipo: "Cliente",
    nombre: "Luke",
    apellido: "Mehta",
    cargo: "Customer Success Lead",
    email: "lukemehta@nextgenit.com",
    organizacion: "NextGenIT",
    telefono: "+227 11 344 5",
    estadoProyecto: "En progreso",
    valorProyecto: 700,
  },
  {
    id: "15",
    vencimiento: "19 ago 2026",
    nextAction: "Poner al día después del final del trimestre",
    tipo: "Prospecto",
    nombre: "Samantha",
    apellido: "Ryan",
    cargo: "Sales Lead",
    email: "sryan@brightfuture.org",
    organizacion: "BrightFuture",
    telefono: "+1 555 778 00",
    estadoProyecto: "Perdido",
    valorProyecto: 4000,
  },
  {
    id: "16",
    vencimiento: "15 sept 2026",
    nextAction: "Compartir estudio de caso para revisión",
    tipo: "Cliente",
    nombre: "Kate",
    apellido: "Bloggs",
    cargo: "Sales Manager",
    email: "joebloggs@datamorph.co.uk",
    organizacion: "DataMorph",
    telefono: "+1 234 567 89",
    estadoProyecto: "En progreso",
    valorProyecto: 1000,
  },
  {
    id: "17",
    vencimiento: "Pendiente",
    nextAction: "Contactar",
    tipo: "Prospecto",
    nombre: "Tom",
    apellido: "Apple",
    cargo: "Account Manager",
    email: "apple.tom@acme.com",
    organizacion: "Acme Inc.",
    telefono: "+12 3466 34 00",
    estadoProyecto: "No iniciado",
    valorProyecto: 1200,
  },
  {
    id: "18",
    vencimiento: "Pendiente",
    nextAction: "Contactar",
    tipo: "Lead",
    nombre: "Margo",
    apellido: "Murphy",
    cargo: "CEO",
    email: "margo@vanguardmedia.com",
    organizacion: "Vanguard Media",
    telefono: "+1 111 22 33",
    estadoProyecto: "No iniciado",
    valorProyecto: 950,
  },
  {
    id: "19",
    vencimiento: "Pendiente",
    nextAction: "Contactar",
    tipo: "Cliente",
    nombre: "Tess",
    apellido: "Wobble",
    cargo: "BDR",
    email: "tesswobble@datamorph.co.uk",
    organizacion: "DataMorph",
    telefono: "+1 234 567 89",
    estadoProyecto: "Completado",
    valorProyecto: 1400,
  },
]

// Helper functions
export function getContactsByType(contacts: Contact[]) {
  const counts = { Lead: 0, Cliente: 0, Prospecto: 0, Socio: 0 }
  contacts.forEach((c) => counts[c.tipo]++)
  return counts
}

export function getProjectsByStatus(contacts: Contact[]) {
  const counts = { "No iniciado": 0, "En progreso": 0, Completado: 0, Perdido: 0 }
  contacts.forEach((c) => {
    if (c.estadoProyecto) counts[c.estadoProyecto]++
  })
  return counts
}

export function getTotalValue(contacts: Contact[]) {
  return contacts.reduce((sum, c) => sum + (c.valorProyecto || 0), 0)
}

// Keep server and browser output identical regardless of runtime locale.
export function formatCurrency(value: number) {
  return `€${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}

export function getValueByOrganization(contacts: Contact[]) {
  const orgValues: Record<string, number> = {}
  contacts.forEach((c) => {
    if (c.valorProyecto) {
      orgValues[c.organizacion] = (orgValues[c.organizacion] || 0) + c.valorProyecto
    }
  })
  return Object.entries(orgValues)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
}

export function getUpcomingActions(contacts: Contact[]) {
  return contacts
    .filter((c) => c.vencimiento !== "Pendiente")
    .sort((a, b) => {
      const dateA = new Date(a.vencimiento.split(" ").reverse().join("-"))
      const dateB = new Date(b.vencimiento.split(" ").reverse().join("-"))
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 5)
}

export function getMonthlyData() {
  return [
    { month: "Ene", leads: 4, clientes: 2, valor: 3200 },
    { month: "Feb", leads: 6, clientes: 3, valor: 4800 },
    { month: "Mar", leads: 8, clientes: 4, valor: 6500 },
    { month: "Abr", leads: 5, clientes: 5, valor: 7200 },
    { month: "May", leads: 7, clientes: 6, valor: 8900 },
    { month: "Jun", leads: 9, clientes: 7, valor: 12000 },
  ]
}
