import { cookies } from "next/headers";

const COOKIE_NAME = "uid";

export async function setLogin(userId: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: COOKIE_NAME,
    value: userId,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function getLoginUserId() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function clearLogin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
