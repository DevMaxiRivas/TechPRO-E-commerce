import { ProductType } from "@/types/product";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

import { toast } from "sonner"

interface BookmarksStore {
    items: ProductType[];
    addItem: (data: ProductType) => void;
    existItem: (id: number) => boolean;
    removeItem: (id: number) => void;
    removeAll: () => void;
}

export const useBookmarks = create(persist<BookmarksStore>((set, get) => ({
    items: [],
    addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === data.id);

        if (existingItem) {
            return toast.error("Item already in bookmarks");
        }

        set({ items: [...currentItems, data] });
        toast.success("Item added to bookmarks");
    },
    existItem: (id: number) => {
        return get().items.find(item => item.id === id) ? true : false;
    },
    removeItem: (id: number) => {
        set({ items: get().items.filter(item => item.id !== id) });
        toast.success("Item removed from bookmarks");
    },
    removeAll: () => {
        set({ items: [] });
        toast.success("Cart cleared");
    }
}), {
    name: "bookmarks-storage",
    storage: createJSONStorage(() => localStorage)
}));