"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import CustomersTable from "@/components/customers-table"
import { NewCustomerModal } from "@/components/new-customer-modal"

export default function CustomersPage() {
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsNewCustomerModalOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar clientes..." className="pl-8" />
        </div>
      </div>

      <CustomersTable />

      <NewCustomerModal open={isNewCustomerModalOpen} onOpenChange={setIsNewCustomerModalOpen} />
    </div>
  )
}

