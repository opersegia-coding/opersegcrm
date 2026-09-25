"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { toast } from "sonner"
import {
  contacts as initialContacts,
  type Contact,
} from "@/lib/crm-data"

interface CrmContextValue {
  contacts: Contact[]
  addContact: (contact: Omit<Contact, "id">) => void
  deleteContact: (id: string) => void
  search: string
  setSearch: (value: string) => void
  openNewContact: () => void
}

const CrmContext = createContext<CrmContextValue | null>(null)

export function useCrm() {
  const ctx = useContext(CrmContext)
  if (!ctx) throw new Error("useCrm debe usarse dentro de <CrmProvider>")
  return ctx
}

interface CrmProviderProps {
  children: ReactNode
  onNewContactRef?: (open: () => void) => void
}

export function CrmProvider({ children, onNewContactRef }: CrmProviderProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [search, setSearch] = useState("")

  const addContact = useCallback((contact: Omit<Contact, "id">) => {
    setContacts((prev) => [
      { ...contact, id: String(Date.now()) },
      ...prev,
    ])
    toast.success("Contacto creado", {
      description: `${contact.nombre} ${contact.apellido} se agregó correctamente.`,
    })
  }, [])

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => {
      const target = prev.find((c) => c.id === id)
      if (target) {
        toast.success("Contacto eliminado", {
          description: `${target.nombre} ${target.apellido} fue eliminado.`,
        })
      }
      return prev.filter((c) => c.id !== id)
    })
  }, [])

  // Placeholder: overwritten by NewContactDialog mount
  const openNewContact = useCallback(() => {
    window.dispatchEvent(new CustomEvent("crm:open-new-contact"))
  }, [])

  const value = useMemo(
    () => ({ contacts, addContact, deleteContact, search, setSearch, openNewContact }),
    [contacts, addContact, deleteContact, search, openNewContact]
  )

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>
}
