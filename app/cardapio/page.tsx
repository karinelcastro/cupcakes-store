"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ShoppingCart } from "lucide-react"
import { cupcakesData, categories, type Cupcake } from "@/lib/cupcakes-data"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export default function CardapioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const { dispatch } = useCart()

  const filteredCupcakes = useMemo(() => {
    return cupcakesData.filter((cupcake) => {
      const matchesSearch =
        cupcake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cupcake.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "todos" || cupcake.category === selectedCategory
      return matchesSearch && matchesCategory && cupcake.available
    })
  }, [searchTerm, selectedCategory])

  const handleAddToCart = (cupcake: Cupcake) => {
    dispatch({ type: "ADD_ITEM", payload: cupcake })
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "tradicional":
        return "bg-primary/10 text-primary hover:bg-primary/20"
      case "vegano":
        return "bg-green-100 text-green-700 hover:bg-green-200"
      case "sem-gluten":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Nosso Cardápio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossos deliciosos cupcakes artesanais. Cada um feito com ingredientes selecionados e muito amor.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar cupcakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "rounded-full px-6 py-2 transition-all",
                  selectedCategory === category.value ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                )}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            {filteredCupcakes.length === 0
              ? "Nenhum cupcake encontrado"
              : `${filteredCupcakes.length} cupcake${filteredCupcakes.length !== 1 ? "s" : ""} encontrado${filteredCupcakes.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Cupcakes Grid */}
        {filteredCupcakes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum cupcake encontrado</h3>
            <p className="text-muted-foreground mb-4">Tente ajustar seus filtros ou termo de busca.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("todos")
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCupcakes.map((cupcake) => (
              <Card
                key={cupcake.id}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={cupcake.image || "/placeholder.svg"}
                      alt={cupcake.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={getCategoryBadgeColor(cupcake.category)}>
                        {categories.find((cat) => cat.value === cupcake.category)?.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {cupcake.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{cupcake.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-primary">
                      R$ {cupcake.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    onClick={() => handleAddToCart(cupcake)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    size="lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {filteredCupcakes.length > 0 && (
          <div className="text-center mt-16 py-12 bg-muted/30 rounded-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Gostou do que viu?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Adicione seus cupcakes favoritos ao carrinho e finalize seu pedido.
            </p>
            <Button asChild size="lg" className="px-8">
              <a href="/carrinho">Ver Carrinho</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
