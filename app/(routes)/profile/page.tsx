"use client";

import { useAuth } from "@/contexts/auth-context";
import ProfileForm from "./components/profile-form";
import { Button } from "@/components/ui/button";

export default function page() {
    const { user, logout, isPending } = useAuth();
    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div>
                <h1 className="mb-5 text-3xl font-bold">
                    Hi, {user.username} this is your profile...
                </h1>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <ProfileForm />
                </div>
                <Button
                    onClick={logout}
                    disabled={isPending}
                    className="cursor-pointer text-sm font-semibold leading-6 text-white"
                >
                    {isPending ? "Signing out..." : "Sign out"}
                </Button>
            </div>
        </div>
    );
}