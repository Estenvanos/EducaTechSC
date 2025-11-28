"use server";

import { UserUpdatePayload } from "@/types";
import { BASE_URL } from "@/utils";

export const getUser = async (clerkId: string) => {
  const res = await fetch(`${BASE_URL}/api/users/${clerkId}`);
  const userData = await res.json();

  return userData;
};

export const updateUserLikes = async (
  clerkId: string,
  userUpdate: UserUpdatePayload
) => {
  await fetch(`${BASE_URL}/api/users/${clerkId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userUpdate }),
  });
};
