"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API = process.env.STRAPI_HOST;

async function getJwt() {
    const cookieStore = await cookies();
    return cookieStore.get("jwt")?.value ?? null;
}

export async function updateProfileAction(_prevState: unknown, formData: FormData) {
    const jwt = await getJwt();
    if (!jwt) return { error: "No autorizado" };

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;

    const fieldErrors: Record<string, string> = {};
    if (username.length < 3)
        fieldErrors.username = "Mínimo 3 caracteres";
    if (!/\S+@\S+\.\S+/.test(email))
        fieldErrors.email = "Email inválido";

    if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

    try {
        const res = await fetch(`${API}/api/users/me`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ username, email }),
        });

        const json = await res.json();
        if (!res.ok) return { error: json.error?.message || "Error al actualizar" };

        return { success: true, user: json };
    } catch {
        return { error: "Error de conexión" };
    }
}

export async function changePasswordAction(_prevState: unknown, formData: FormData) {
    const jwt = await getJwt();
    if (!jwt) return { error: "No autorizado" };

    const currentPassword = formData.get("currentPassword") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const fieldErrors: Record<string, string> = {};
    if (!currentPassword)
        fieldErrors.currentPassword = "Ingresá tu contraseña actual";
    if (password.length < 6)
        fieldErrors.password = "Mínimo 6 caracteres";
    if (password !== confirmPassword)
        fieldErrors.confirmPassword = "Las contraseñas no coinciden";

    if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

    try {
        const res = await fetch(`${API}/api/auth/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ currentPassword, password, passwordConfirmation: confirmPassword }),
        });

        const json = await res.json();
        if (!res.ok) return { error: json.error?.message || "Error al cambiar contraseña" };

        return { success: true };
    } catch {
        return { error: "Error de conexión" };
    }
}

export async function forgotPasswordAction(_prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string;

    if (!/\S+@\S+\.\S+/.test(email)) {
        return { fieldErrors: { email: "Email inválido" } };
    }

    try {
        const res = await fetch(`${API}/api/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) return { error: "Error al enviar el email" };

        return { success: true };
    } catch {
        return { error: "Error de conexión" };
    }
}

export async function resetPasswordAction(_prevState: unknown, formData: FormData) {
    const code = formData.get("code") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const fieldErrors: Record<string, string> = {};
    if (password.length < 6)
        fieldErrors.password = "Mínimo 6 caracteres";
    if (password !== confirmPassword)
        fieldErrors.confirmPassword = "Las contraseñas no coinciden";

    if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

    try {
        const res = await fetch(`${API}/api/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                password,
                passwordConfirmation: confirmPassword,
            }),
        });

        const json = await res.json();
        if (!res.ok) return { error: json.error?.message || "Código inválido o expirado" };

        return { success: true };
    } catch {
        return { error: "Error de conexión" };
    }
}