import { ProductType } from "@/types/product";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

import { toast } from "sonner"

import { createMPPreference } from "@/lib/checkout";
import { UnauthorizedError } from "@/lib/errors";

interface CartStore {
    items: ProductType[];
    isLoading: boolean;
    addItem: (data: ProductType) => void;
    removeItem: (id: number) => void;
    removeAll: () => void;
    checkout: () => Promise<string | null | undefined>;
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === data.id);

        if (existingItem) {
            return toast.error("Item already in cart");
        }

        set({ items: [...currentItems, data] });
        toast.success("Item added to cart");
    },
    removeItem: (id: number) => {
        set({ items: get().items.filter(item => item.id !== id) });
        toast.success("Item removed from cart");
    },
    removeAll: () => {
        set({ items: [] });
        toast.success("Cart cleared");
    },
    checkout: async function () {
        const items = get().items;
        if (items.length === 0) return toast.error("El carrito está vacío");

        set({ isLoading: true });
        try {
            const preference = await createMPPreference(items);
            console.log(preference);
            const { init_point, sandbox_init_point } = preference;
            const redirectUrl =
                process.env.NODE_ENV === "development"
                    ? sandbox_init_point
                    : init_point;

            window.location.href = redirectUrl;
        } catch (error: unknown) {
            if (error instanceof UnauthorizedError) {
                toast.error("Tenés que iniciar sesión para comprar");
                window.location.href = "/login?redirect=/cart"; // redirigir al login
            } else {
                toast.error("Error al procesar el pago");
            }
            set({ isLoading: false });
        }
    },
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}));