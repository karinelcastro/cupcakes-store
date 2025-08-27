"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CreditCard, Smartphone, Banknote, CheckCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface OrderData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  paymentMethod: string
  observations: string
}

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const [formData, setFormData] = useState<OrderData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "credit-card",
    observations: "",
  })

  const [errors, setErrors] = useState<Partial<OrderData>>({})

  const handleInputChange = (field: keyof OrderData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderData> = {}

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!formData.address.trim()) newErrors.address = "Endereço é obrigatório"
    if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória"
    if (!formData.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate order number
    const orderNum = `CP${Date.now().toString().slice(-6)}`
    setOrderNumber(orderNum)

    // Save order to localStorage
    const order = {
      id: orderNum,
      date: new Date().toISOString(),
      items: state.items,
      total: state.total + 5, // Including delivery fee
      customer: formData,
      status: "Em preparo",
    }

    const existingOrders = JSON.parse(localStorage.getItem("cupcake-orders") || "[]")
    existingOrders.unshift(order)
    localStorage.setItem("cupcake-orders", JSON.stringify(existingOrders))

    // Clear cart
    dispatch({ type: "CLEAR_CART" })

    setOrderConfirmed(true)
    setIsSubmitting(false)
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

  // Redirect to cart if empty
  if (state.items.length === 0 && !orderConfirmed) {
    router.push("/carrinho")
    return null
  }

  if (orderConfirmed) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Pedido realizado com sucesso!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Seu pedido <span className="font-semibold text-primary">#{orderNumber}</span> foi confirmado e está sendo
              preparado com carinho.
            </p>
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-2">Próximos passos:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left max-w-md mx-auto">
                <li>• Você receberá um email de confirmação em breve</li>
                <li>• Seus cupcakes serão preparados fresquinhos</li>
                <li>• Tempo estimado de entrega: 45-60 minutos</li>
                <li>• Acompanhe o status na área "Meus Pedidos"</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link href="/meus-pedidos">Ver Meus Pedidos</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 bg-transparent" asChild>
                <Link href="/cardapio">Fazer Novo Pedido</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/carrinho">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Carrinho
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Finalizar Pedido</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Rua, número, complemento"
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="00000-000"
                        className={errors.zipCode ? "border-destructive" : ""}
                      />
                      {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Forma de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                        Cartão de Crédito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="debit-card" id="debit-card" />
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <Label htmlFor="debit-card" className="flex-1 cursor-pointer">
                        Cartão de Débito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="pix" id="pix" />
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                      <Label htmlFor="pix" className="flex-1 cursor-pointer">
                        PIX
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="cash" id="cash" />
                      <Banknote className="w-5 h-5 text-muted-foreground" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        Dinheiro na Entrega
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Observations */}
              <Card>
                <CardHeader>
                  <CardTitle>Observações (Opcional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.observations}
                    onChange={(e) => handleInputChange("observations", e.target.value)}
                    placeholder="Alguma observação especial sobre seu pedido?"
                    rows={3}
                  />
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="text-xs px-2 py-0.5" variant="secondary">
                            {getCategoryLabel(item.category)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Qtd: {item.quantity}</span>
                        </div>
                        <p className="text-sm font-medium text-primary mt-1">
                          R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">R$ {state.total.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="text-foreground">R$ 5,00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">R$ {(state.total + 5).toFixed(2).replace(".", ",")}</span>
                </div>

                <Button onClick={handleSubmit} size="lg" className="w-full mt-6" disabled={isSubmitting}>
                  {isSubmitting ? "Processando..." : "Confirmar Pedido"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
