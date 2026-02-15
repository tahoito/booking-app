// Auth helpers live here.
export type User = {
    username: string;
    studentId: string;  
    password: string;
};

const USERS_KEY = "booking-app-users";
const AUTH_KEY = "booking-app-auth";

export function saveUser(user: User) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUsers(): User[] {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
}

export function login(username: string, password: string): boolean {
    const users = getUsers();
    const found = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!found) return false;
    localStorage.setItem(AUTH_KEY, JSON.stringify({ username: found.username, token: "dummy-token" }));
    return true;
}


export function getAuthUser() : User | null{
    const raw= localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  if (typeof window === "undefined") return;
    localStorage.removeItem(AUTH_KEY);
}

export function register(username: string, studentId: string, password: string): boolean {
  if (typeof window === "undefined") return false;

  const users = getUsers();
  const exists = users.some(
    (u) => u.username === username || u.studentId === studentId
  );
  if (exists) return false;

  users.push({ username, studentId, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ username, token: "dummy-token" })
  );

  return true;
}
