"use client";

import { logoutAction } from "@/actions/auth.actions";
import { createContext, useContext, useState, useTransition } from "react";

interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isPending: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
    initialUser,
}: {
    children: React.ReactNode;
    initialUser: User | null;
}) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [isPending, startTransition] = useTransition();

    const logout = () => {
        startTransition(async () => {
            await logoutAction();
            setUser(null);
        });
    };

    return (
        <AuthContext.Provider value={{ user, isPending, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return ctx;
}