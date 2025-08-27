"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Clock, CheckCircle, Package, ArrowRight } from "lucide-react"
import Link from "next/link"

interface OrderItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  quantity: number
}

interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    zipCode: string
    paymentMethod: string
    observations: string
  }
  status: string
}

export default function MeusPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem("cupcake-orders")
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders)
          // Simulate status updates for demo
          const updatedOrders = parsedOrders.map((order: Order, index: number) => {
            const daysSinceOrder = Math.floor((Date.now() - new Date(order.date).getTime()) / (1000 * 60 * 60 * 24))
            let status = order.status

            // Simulate status progression
            if (daysSinceOrder >= 2) {
              status = "Entregue"
            } else if (daysSinceOrder >= 1) {
              status = "Saiu para entrega"
            } else if (index % 3 === 0) {
              status = "Pronto"
            }

            return { ...order, status }
          })
          setOrders(updatedOrders)
        }
      } catch (error) {
        console.error("Error loading orders:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Em preparo":
        return <Clock className="w-4 h-4" />
      case "Pronto":
        return <Package className="w-4 h-4" />
      case "Saiu para entrega":
        return <ArrowRight className="w-4 h-4" />
      case "Entregue":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em preparo":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
      case "Pronto":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200"
      case "Saiu para entrega":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200"
      case "Entregue":
        return "bg-green-100 text-green-700 hover:bg-green-200"
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "credit-card":
        return "Cartão de Crédito"
      case "debit-card":
        return "Cartão de Débito"
      case "pix":
        return "PIX"
      case "cash":
        return "Dinheiro na Entrega"
      default:
        return method
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando seus pedidos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Meus Pedidos</h1>
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Nenhum pedido encontrado</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Você ainda não fez nenhum pedido. Que tal explorar nosso delicioso cardápio?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link href="/cardapio">Explorar Cardápio</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 bg-transparent" asChild>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Meus Pedidos</h1>
            <p className="text-muted-foreground mt-2">
              {orders.length} {orders.length === 1 ? "pedido encontrado" : "pedidos encontrados"}
            </p>
          </div>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/cardapio">Fazer Novo Pedido</Link>
          </Button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{formatDate(order.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </Badge>
                    <span className="text-lg font-bold text-primary">
                      R$ {order.total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Order Items */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Itens do Pedido</h4>
                  <div className="grid gap-3">
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.id}`}
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm text-foreground truncate">{item.name}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              {getCategoryLabel(item.category)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Qtd: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            R$ {item.price.toFixed(2).replace(".", ",")} cada
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Entrega</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{order.customer.name}</p>
                      <p>{order.customer.address}</p>
                      <p>
                        {order.customer.city} - {order.customer.zipCode}
                      </p>
                      <p>{order.customer.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Pagamento</h4>
                    <p className="text-sm text-muted-foreground">
                      {getPaymentMethodLabel(order.customer.paymentMethod)}
                    </p>
                    {order.customer.observations && (
                      <div className="mt-3">
                        <h4 className="font-medium text-foreground mb-1">Observações</h4>
                        <p className="text-sm text-muted-foreground">{order.customer.observations}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">R$ {(order.total - 5).toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="text-foreground">R$ 5,00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">R$ {order.total.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 py-12 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">Gostou dos nossos cupcakes?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Faça um novo pedido e desfrute novamente dos nossos sabores únicos.
          </p>
          <Button asChild size="lg" className="px-8">
            <Link href="/cardapio">Fazer Novo Pedido</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
