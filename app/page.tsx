import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Heart, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-background via-muted to-secondary/20 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Bem-vindo à <span className="text-primary">Cupcake Store</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Deliciosos cupcakes artesanais feitos com amor e ingredientes selecionados. Sabores tradicionais,
                  veganos e sem glúten para todos os gostos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/cardapio">Ver Cardápio</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  <Link href="/meus-pedidos">Meus Pedidos</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/chocolate-cupcake-with-chocolate-frosting.png"
                  alt="Cupcake de chocolate"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="/red-velvet-cupcake-with-cream-cheese-frosting.png"
                  alt="Cupcake red velvet"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg mt-8"
                />
                <img
                  src="/gluten-free-vanilla-cupcake.png"
                  alt="Cupcake de baunilha sem glúten"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg -mt-8"
                />
                <img
                  src="/gluten-free-chocolate-cupcake.png"
                  alt="Cupcake de chocolate sem glúten"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Por que escolher nossos cupcakes?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada cupcake é uma pequena obra de arte, feita com ingredientes frescos e muito carinho.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 hover:border-primary/50 transition-colors">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ChefHat className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Artesanais</h3>
                <p className="text-muted-foreground">
                  Feitos à mão com técnicas tradicionais e ingredientes selecionados
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-primary/50 transition-colors">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Para Todos</h3>
                <p className="text-muted-foreground">
                  Opções tradicionais, veganas e sem glúten para atender todos os gostos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-primary/50 transition-colors">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Frescos</h3>
                <p className="text-muted-foreground">
                  Preparados diariamente para garantir o máximo de sabor e qualidade
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Pronto para saborear?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore nosso cardápio completo e descubra sabores únicos que vão conquistar seu paladar.
          </p>
          <Button asChild size="lg" className="text-lg px-12 py-6">
            <Link href="/cardapio">Explorar Cardápio</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
