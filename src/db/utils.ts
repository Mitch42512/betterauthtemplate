import { eq } from 'drizzle-orm';
import { db } from './index';
import { user } from './schema';

// Example database operations
export async function createUser(email: string, password: string, name?: string) {
  const [newUser] = await db.insert(user).values({
    email,
    password,
    name,
  }).returning();
  
  return newUser;
}

export async function getUserByEmail(email: string) {
  const [foundUser] = await db.select().from(user).where(eq(user.email, email));
  return foundUser;
}

export async function getAllUsers() {
  return await db.select().from(user);
}

// Re-export the database instance and schema
export { db } from './index';
export * from './schema';

