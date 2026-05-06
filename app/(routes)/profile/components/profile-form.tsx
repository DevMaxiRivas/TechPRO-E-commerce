"use client";

import { useActionState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/users.actions";

type UpdateProfileState = {
    success?: boolean;
    error?: string;
    fieldErrors?: { username?: string; email?: string };
    user?: { id: number; username: string; email: string };
} | null;

export default function ProfileForm() {
    const { user, setUser } = useAuth();

    const [state, action, isPending] = useActionState<UpdateProfileState, FormData>(
        updateProfileAction,
        null
    );

    useEffect(() => {
        if (state?.success && state.user) {
            setUser(state.user);
            toast.success("Perfil actualizado correctamente");
        }
        if (state?.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <form action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={user?.username ?? ""}
                    required
                />
                {state?.fieldErrors?.username && (
                    <p className="text-xs text-red-500">{state.fieldErrors.username}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email ?? ""}
                    required
                />
                {state?.fieldErrors?.email && (
                    <p className="text-xs text-red-500">{state.fieldErrors.email}</p>
                )}
            </div>

            {state?.success && (
                <p className="text-sm text-green-600">✓ Saved changes</p>
            )}

            <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save changes"}
            </Button>
        </form>
    );
}