import fs from "fs/promises";
import path from "path";

export type User = {
    id: string; 
    username: string; 
    studentId?: string;
    passwordHash: string 
};

const filePath = path.join(process.cwd(), "data", "users.json");

export async function readUsers(): Promise<User[]> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as User[];
}

export async function writeUsers(users: User[]) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
}
