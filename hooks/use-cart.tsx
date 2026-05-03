import { ProductType } from "@/types/product";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

import { toast } from "sonner"

interface CarStore {
    items: ProductType[];
    addItem: (data: ProductType) => void;
    removeItem: (id: number) => void;
    removeAll: () => void;
}

export const useCart = create(persist<CarStore>((set, get) => ({
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
    }
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}));