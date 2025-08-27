export interface Cupcake {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "tradicional" | "vegano" | "sem-gluten"
  available: boolean
}

export const cupcakesData: Cupcake[] = [
  {
    id: "1",
    name: "Chocolate Clássico",
    description: "Cupcake de chocolate com cobertura cremosa de chocolate",
    price: 8.5,
    image: "/chocolate-cupcake-with-chocolate-frosting.png",
    category: "tradicional",
    available: true,
  },
  {
    id: "2",
    name: "Baunilha com Morango",
    description: "Massa de baunilha com cobertura de morango fresco",
    price: 9.0,
    image: "/placeholder-dk0dx.png",
    category: "tradicional",
    available: true,
  },
  {
    id: "3",
    name: "Red Velvet",
    description: "Clássico red velvet com cream cheese",
    price: 10.0,
    image: "/red-velvet-cupcake-with-cream-cheese-frosting.png",
    category: "tradicional",
    available: true,
  },
  {
    id: "4",
    name: "Limão Siciliano",
    description: "Massa de limão com cobertura cítrica refrescante",
    price: 8.5,
    image: "/placeholder-8jgcf.png",
    category: "tradicional",
    available: true,
  },
  {
    id: "5",
    name: "Chocolate Vegano",
    description: "Cupcake vegano de chocolate com cobertura de cacau",
    price: 11.0,
    image: "/placeholder-5zlxp.png",
    category: "vegano",
    available: true,
  },
  {
    id: "6",
    name: "Cenoura Vegana",
    description: "Cupcake vegano de cenoura com especiarias",
    price: 10.5,
    image: "/placeholder-1c535.png",
    category: "vegano",
    available: true,
  },
  {
    id: "7",
    name: "Baunilha Sem Glúten",
    description: "Delicioso cupcake de baunilha sem glúten",
    price: 12.0,
    image: "/gluten-free-vanilla-cupcake.png",
    category: "sem-gluten",
    available: true,
  },
  {
    id: "8",
    name: "Chocolate Sem Glúten",
    description: "Cupcake de chocolate sem glúten, igualmente saboroso",
    price: 12.5,
    image: "/gluten-free-chocolate-cupcake.png",
    category: "sem-gluten",
    available: true,
  },
]

export const categories = [
  { value: "todos", label: "Todos" },
  { value: "tradicional", label: "Tradicional" },
  { value: "vegano", label: "Vegano" },
  { value: "sem-gluten", label: "Sem Glúten" },
]
