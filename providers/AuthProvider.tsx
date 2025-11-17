"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export const AuthContext = React.createContext({
  mongoUser: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [mongoUser, setMongoUser] = useState(null);

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

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId, fullName, email }),
      });

      if (!res.ok) {
        console.error("Failed syncing user:", await res.text());
        return;
      }

      const data = await res.json();
      setMongoUser(data);
    };

    syncUser();
  }, [isLoaded, user]);

  return (
    <AuthContext.Provider value={{ mongoUser }}>
      {children}
    </AuthContext.Provider>
  );
};
