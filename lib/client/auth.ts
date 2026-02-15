export async function registerUser(input: {
  username: string;
  studentId: string;
  password: string;
}) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error ?? "登録に失敗しました");
  }

  return data as { success: true };
}



export async function loginUser(input: { username: string; password: string; }) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  
    const data = await res.json().catch(() => ({}));
  
    if (!res.ok) {
      throw new Error(data?.error ?? "ログインに失敗しました");
    }
  
    return data as { success: true };   
}