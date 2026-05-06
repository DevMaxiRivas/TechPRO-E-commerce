"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { changePasswordAction } from "@/actions/users.actions";

type ChangePasswordState = {
    success?: boolean;
    error?: string;
    fieldErrors?: {
        currentPassword?: string;
        password?: string;
        confirmPassword?: string;
    };
} | null;

export default function ChangePasswordForm() {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, action, isPending] = useActionState<ChangePasswordState, FormData>(
        changePasswordAction,
        null
    );

    useEffect(() => {
        if (state?.success) {
            toast.success("Password changed successfully");
            formRef.current?.reset();
        }
        if (state?.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <form ref={formRef} action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                />
                {state?.fieldErrors?.currentPassword && (
                    <p className="text-xs text-red-500">{state.fieldErrors.currentPassword}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="password">New password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                />
                {state?.fieldErrors?.password && (
                    <p className="text-xs text-red-500">{state.fieldErrors.password}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                />
                {state?.fieldErrors?.confirmPassword && (
                    <p className="text-xs text-red-500">{state.fieldErrors.confirmPassword}</p>
                )}
            </div>

            {state?.success && (
                <p className="text-sm text-green-600">✓ Password changed successfully</p>
            )}

            <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Change password"}
            </Button>
        </form>
    );
}