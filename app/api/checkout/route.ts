import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
        return NextResponse.json(
            { error: "No autorizado. Iniciá sesión para continuar." },
            { status: 401 }
        );
    }

    const meRes = await fetch(`${process.env.STRAPI_HOST}/api/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!meRes.ok) {
        return NextResponse.json(
            { error: "Sesión expirada. Iniciá sesión nuevamente." },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();

        console.log("📦 Items enviados a MP:", JSON.stringify(body, null, 2));

        const res = await fetch(
            `${process.env.STRAPI_HOST}/api/payments/create-preference`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`, // identificar al usuario en Strapi
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();

        console.log("📨 Respuesta de Strapi:", JSON.stringify(data, null, 2));

        if (!res.ok) {
            return NextResponse.json(
                { error: data.error?.message || "Error al crear preferencia" },
                { status: res.status }
            );
        }

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Error de conexión con el servidor" },
            { status: 500 }
        );
    }
}