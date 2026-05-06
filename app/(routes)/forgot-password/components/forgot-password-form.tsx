"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordAction } from "@/actions/users.actions";
import Link from "next/link";

type ForgotPasswordState = {
    success?: boolean;
    error?: string;
    fieldErrors?: { email?: string };
} | null;

export default function ForgotPasswordForm() {
    const [state, action, isPending] = useActionState<ForgotPasswordState, FormData>(
        forgotPasswordAction,
        null
    );

    if (state?.success) {
        return (
            <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                    <span className="text-2xl">📧</span>
                </div>
                <h2 className="font-semibold">Check your email</h2>
                <p className="text-sm text-muted-foreground">
                    If that email is in our system, you will receive an email with instructions about how to reset your
                    password
                </p>
                <Link href="/login" className="text-sm cursor-pointer">
                    Login
                </Link>
            </div>
        );
    }

    return (
        <form action={action} className="flex flex-col gap-4 w-full max-w-sm">
            <p className="text-sm text-muted-foreground">
                Enter your email and we will send you a link to reset your password
            </p>

            {state?.error && (
                <div className="px-4 py-3 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                    {state.error}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                />
                {state?.fieldErrors?.email && (
                    <p className="text-xs text-red-500">{state.fieldErrors.email}</p>
                )}
            </div>

            <Button type="submit" disabled={isPending} className="w-full cursor-pointer">
                {isPending ? "Enviando..." : "Enviar enlace"}
            </Button>

            <a href="/login" className="cursor-pointer text-sm text-center text-muted-foreground">
                Login
            </a>
        </form>
    );
}