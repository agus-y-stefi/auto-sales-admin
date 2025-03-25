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
  const { isOpen, toggle, isMobile } = useSidebar()

  return (
    <>
      {/* Mobile toggle button */}
      <Button variant="outline" size="icon" onClick={toggle} className="fixed top-4 left-4 z-40 md:hidden">
        <Menu className="h-4 w-4" />
      </Button>

      {/* Sidebar backdrop for mobile */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggle} />}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-slate-800 text-white z-40 h-full flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0 md:w-16",
          isMobile && !isOpen && "hidden",
          isMobile && isOpen && "fixed left-0 top-0",
        )}
      >
        {/* Desktop toggle button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="absolute top-4 right-4 text-white hidden md:flex"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <nav className="space-y-1 flex-1 p-4 mt-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white hover:bg-slate-700",
                pathname.startsWith(item.href) ? "bg-slate-700 text-white" : "text-slate-300",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span className="truncate">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

