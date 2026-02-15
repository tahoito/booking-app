import { cookies } from "next/headers";

const COOKIE_NAME = "uid";

export function setLogin(userId: string) {
  cookies().set({
    name: COOKIE_NAME,
    value: userId,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function getLoginUserId() {
  return cookies().get(COOKIE_NAME)?.value ?? null;
}

export function clearLogin() {
  cookies().delete(COOKIE_NAME);
}
