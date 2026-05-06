"use client";

import { loginAction } from "@/actions/auth.actions";
import { PasswordInput } from "@/components/shared/auth/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";


type LoginState = {
    error?: string;
    user?: { id: number; username: string; email: string };
} | null;

export function LoginForm() {
    const { setUser } = useAuth();
    const router = useRouter();

    const [state, formAction, isPending] = useActionState<LoginState, FormData>(
        loginAction,
        null
    );

    useEffect(() => {
        if (state?.user) {
            setUser(state.user);
            router.push("/");
        }
    }, [state]);

    return (
        <form action={formAction} className="flex flex-col gap-3">
            {state?.error && (
                <div className="px-4 py-3 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                    {state.error}
                </div>
            )}

            <div className="flex flex-col gap-3">
                <Label htmlFor="identifier">Email or Username</Label>
                <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="tu@email.com"
                    required
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" />
            </div>
            <div className="text-sm my-3">
                <a href="/forgot-password" className="font-semibold text-primary hover:text-black">
                    Forgot password?
                </a>
            </div>

            <Button type="submit" disabled={isPending} className="w-full cursor-pointer">
                {isPending ? "Signing in..." : "Sign in"}
            </Button>

        </form>
    );
}