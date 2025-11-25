"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { User } from "@/types";

interface AuthContextType {
  mongoUser: User | null;
  currentUser: () => User | null;
}

export const AuthContext = React.createContext<AuthContextType>({
  mongoUser: null,
  currentUser: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [mongoUser, setMongoUser] = useState<User | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;

      const clerkId = user.id;
      const fullName = user.fullName || user.firstName || "No Name";
      const email = user.primaryEmailAddress?.emailAddress;

      if (!clerkId || !email) {
        console.warn("Missing clerkId or email. User:", user);
        return;
      }

      try {
        // Try fetching the user
        const getRes = await fetch(`/api/users/${clerkId}`);

        if (getRes.ok) {
          const data = await getRes.json();
          setMongoUser(data);
          return;
        }

        if (getRes.status !== 404) {
          console.error("Unexpected error fetching user:", await getRes.text());
        }

        // If not found, create new user
        const createRes = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkId, fullName, email }),
        });

        if (!createRes.ok) {
          console.error("Failed creating user:", await createRes.text());
          return;
        }

        const newUser = await createRes.json();
        setMongoUser(newUser);
      } catch (err) {
        console.error("AuthProvider ERROR:", err);
      }
    };

    syncUser();
  }, [isLoaded, user]);

  // stable function to return the mongo user
  const currentUser = useCallback(() => mongoUser, [mongoUser]);


  return (
    <AuthContext.Provider value={{ mongoUser, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
