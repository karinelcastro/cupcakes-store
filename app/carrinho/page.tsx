"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function CarrinhoPage() {
  const { state, dispatch } = useCart()

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "tradicional":
        return "bg-primary/10 text-primary"
      case "vegano":
        return "bg-green-100 text-green-700"
      case "sem-gluten":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "tradicional":
        return "Tradicional"
      case "vegano":
        return "Vegano"
      case "sem-gluten":
        return "Sem Glúten"
      default:
        return category
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Seu carrinho está vazio</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Que tal explorar nosso delicioso cardápio e adicionar alguns cupcakes?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link href="/cardapio">Explorar Cardápio</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                <Link href="/">Voltar ao Início</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/cardapio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuar Comprando
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Meu Carrinho</h1>
            <p className="text-muted-foreground mt-2">
              {state.items.length} {state.items.length === 1 ? "item" : "itens"} no seu carrinho
            </p>
          </div>
          {state.items.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Carrinho
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className={getCategoryBadgeColor(item.category)}>
                          {getCategoryLabel(item.category)}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-primary">
                              R$ {item.price.toFixed(2).replace(".", ",")}
                            </span>
                            <span className="text-sm text-muted-foreground">cada</span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 hover:bg-muted"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 hover:bg-muted"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Subtotal:</span>
                          <span className="font-semibold text-foreground">
                            R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <h2 className="text-xl font-semibold text-foreground">Resumo do Pedido</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-foreground">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">R$ {state.total.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="text-foreground">R$ 5,00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">R$ {(state.total + 5).toFixed(2).replace(".", ",")}</span>
                </div>

                <Button asChild size="lg" className="w-full mt-6">
                  <Link href="/checkout">Finalizar Pedido</Link>
                </Button>

                <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                  <Link href="/cardapio">Adicionar Mais Itens</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
