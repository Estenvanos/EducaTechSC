"use server";

import { BASE_URL } from "@/utils";

export const getModules = async() => {
    const res = await fetch(`${BASE_URL}/api/modules`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "force-cache",
      });
    
      const modules = await res.json();

      return modules
}

export const getSingleModule = async(moduleId : string) => {
  const res = await fetch(`${BASE_URL}/api/modules/${moduleId}`);
  const moduleData = await res.json();

  return moduleData
}