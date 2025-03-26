"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Package, ShoppingCart, Users, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"

const navItems = [
  {
    name: "Órdenes",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Productos",
    href: "/products",
    icon: Package,
  },
  {
    name: "Clientes",
    href: "/customers",
    icon: Users,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()

  return (
    <>
      {/* Sidebar toggle button - always visible on the left */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggle}
        className={cn("fixed top-4 z-50 transition-all duration-300", isOpen ? "left-64" : "left-4")}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "bg-neutral-900 text-white z-40 h-full fixed left-0 top-0 flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0",
          !isOpen && "overflow-hidden",
        )}
      >
        <div className="pt-16 flex-1 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white hover:bg-neutral-800",
                  pathname.startsWith(item.href) ? "!bg-neutral-700 text-white" : "text-gray-300",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

