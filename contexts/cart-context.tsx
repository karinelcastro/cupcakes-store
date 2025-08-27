"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Cupcake } from "@/lib/cupcakes-data"

export interface CartItem extends Cupcake {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Cupcake }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return { items: updatedItems, total }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return { items: newItems, total }
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return { items: newItems, total }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter((item) => item.id !== action.payload.id)
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return { items: newItems, total }
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return { items: updatedItems, total }
    }

    case "CLEAR_CART":
      return { items: [], total: 0 }

    case "LOAD_CART":
      const total = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return { items: action.payload, total }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cupcake-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cupcake-cart", JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
