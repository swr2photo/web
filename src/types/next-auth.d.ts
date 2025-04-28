// src/types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // เพิ่ม id ของ user
      email: string;
      name: string; // Ensure that the `name` property is always present
      image?: string | null;
    };
    accessToken?: string; // เพิ่ม accessToken ใน session
  }
}
