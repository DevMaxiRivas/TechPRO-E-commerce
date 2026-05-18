"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import CardItem from "./components/card-item";
import { toast } from "sonner";

const Page = () => {
    const { items, removeAll, checkout, isLoading } = useCart();
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    const searchParams = useSearchParams();

    // Detectar retorno desde MercadoPago
    useEffect(() => {
        const status = searchParams.get("status"); // MP manda ?status=approved

        if (status === "approved") {
            removeAll();
            toast.success("¡Pago aprobado! Gracias por tu compra 🎉");
        } else if (status === "rejected") {
            toast.error("El pago fue rechazado. Intentá de nuevo.");
        } else if (status === "pending") {
            toast.info("Tu pago está pendiente de confirmación.");
        }
    }, [searchParams]);

    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-5 text-3xl font-bold">Shopping Cart</h1>
            <div className="grid sm:grid-cols-2 sm:gap-5">
                <div>
                    {items.length > 0 ? (
                        <ul>
                            {items.map(item => (
                                <CardItem key={item.id} product={item} />
                            ))}
                        </ul>
                    ) : (
                        <p>No items in cart</p>
                    )}
                </div>
                <div className="max-w-xl">
                    <div className="p-6 rounded-lg bg-slate-100 dark:bg-black">
                        <p className="mb-3 text-lg font-semibold">Order Summary</p>
                        <Separator />
                        <div className="flex justify-between gap-5 my-4">
                            <p>Order Total</p>
                            <p>{formatPrice(totalPrice)}</p>
                        </div>
                        <div className="flex items-center justify-center w-full mt-3">
                            <Button
                                className="w-full cursor-pointer bg-black dark:bg-white dark:text-black"
                                onClick={checkout} // 👈 cambiado
                            // disabled={isLoading || items.length === 0}
                            >
                                {isLoading ? "Procesando..." : "Comprar"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;