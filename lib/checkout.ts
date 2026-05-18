import { ProductType } from "@/types/product";
import { UnauthorizedError } from "./errors";

export async function createMPPreference(items: ProductType[]) {
    const mpItems = items.map((item: ProductType) => ({
        id: String(item.id),
        title: item.productName,
        unit_price: item.price,
        quantity: item.quantity ?? 1,
        currency_id: "ARS",
    }));

    const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            items: mpItems,
            orderId: crypto.randomUUID(),
        }),
    });

    if (res.status === 401) throw new UnauthorizedError();

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error al crear preferencia de pago");
    }

    console.log(res);

    return res.json();
}