
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  getItemQuantity: (id: string) => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existingItem = get().items.find(
          (cartItem) => cartItem.id === item.id,
        );

        if (existingItem) {
          set({
            items: get().items.map((cartItem) =>
              cartItem.id === item.id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  }
                : cartItem,
            ),
          });

          return;
        }

        set({
          items: [
            ...get().items,
            {
              ...item,
              quantity: 1,
            },
          ],
        });
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter(
            (item) => item.id !== id,
          ),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({
            items: get().items.filter(
              (item) => item.id !== id,
            ),
          });

          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                }
              : item,
          ),
        });
      },

      clearCart: () => {
        set({
          items: [],
        });
      },

      getItemQuantity: (id) => {
        return (
          get().items.find((item) => item.id === id)
            ?.quantity ?? 0
        );
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) =>
            total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "food-delivery-cart",

      partialize: (state) => ({
        items: state.items,
      }),

      skipHydration: true,
    },
  ),
);
