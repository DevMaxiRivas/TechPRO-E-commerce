"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API = process.env.STRAPI_HOST;

async function setAuthCookie(jwt: string) {
    const cookieStore = await cookies();
    cookieStore.set("jwt", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });
}

export async function loginAction(_prevState: unknown, formData: FormData) {
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    if (!identifier || !password) {
        return { error: "Todos los campos son requeridos" };
    }

    try {
        // const res = await fetch(`${API}/api/auth/local`, {
        const res = await fetch(`http://techpro_strapi:1337/api/auth/local`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier, password }),
        });

        const json = await res.json();

        if (!res.ok) {
            return { error: json.error?.message || "Credenciales incorrectas" };
        }

        await setAuthCookie(json.jwt);
        return { user: json.user };

    } catch {
        return { error: "Error de conexión. Intentá de nuevo." };
    }
}

export async function registerAction(_prevState: unknown, formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validaciones con errores por campo
    const fieldErrors: Record<string, string> = {};

    if (username.length < 3)
        fieldErrors.username = "Mínimo 3 caracteres";
    if (!/\S+@\S+\.\S+/.test(email))
        fieldErrors.email = "Email inválido";
    if (password.length < 6)
        fieldErrors.password = "Mínimo 6 caracteres";
    if (password !== confirmPassword)
        fieldErrors.confirmPassword = "Las contraseñas no coinciden";

    if (Object.keys(fieldErrors).length > 0) {
        return { fieldErrors };
    }

    try {
        const res = await fetch(`${API}/api/auth/local/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const json = await res.json();

        if (!res.ok) {
            return { error: json.error?.message || "Error en el registro" };
        }

        await setAuthCookie(json.jwt);
        return { user: json.user };

    } catch {
        return { error: "Error de conexión. Intentá de nuevo." };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("jwt");
    redirect("/login");
}

export async function getAuthenticatedUser() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    if (!jwt) return null;

    const res = await fetch(`${API}/api/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
        cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
}