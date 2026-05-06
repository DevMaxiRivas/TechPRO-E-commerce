"use client";

import { useAuth } from "@/contexts/auth-context";
import ProfileForm from "./components/profile-form";
import { Button } from "@/components/ui/button";
import ChangePasswordForm from "./components/change-password-form";
import { Separator } from "@/components/ui/separator";

export default function page() {
    const { user, logout, isPending } = useAuth();
    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div>
                <div className="flex justify-between">
                    <h1 className="mb-5 text-3xl font-bold">
                        Hi, {user.username}!
                    </h1>
                    <Button
                        onClick={logout}
                        disabled={isPending}
                        className="cursor-pointer text-sm font-semibold leading-6 text-white bg-red-600"
                    >
                        {isPending ? "Signing out..." : "Sign out"}
                    </Button>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <section>
                        <h2 className="mb-4 text-lg font-semibold">Profile</h2>
                        <ProfileForm />
                    </section>

                    <Separator className="my-8" />

                    <section>
                        <h2 className="mb-4 text-lg font-semibold">Change Password</h2>
                        <ChangePasswordForm />
                    </section>
                </div>

            </div>
        </div>
    );
}