"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Home, BookOpen, User } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const { state } = useCart()

  const navItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/cardapio", label: "Cardápio", icon: BookOpen },
    { href: "/carrinho", label: "Carrinho", icon: ShoppingCart },
    { href: "/meus-pedidos", label: "Meus Pedidos", icon: User },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">🧁</span>
            </div>
            <span className="font-bold text-lg text-foreground">Cupcake Store</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                  {item.href === "/carrinho" && state.items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
