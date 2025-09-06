import { eq } from 'drizzle-orm';
import { db } from './index';
import { users } from './schema';

// Example database operations
export async function createUser(email: string, name?: string) {
  const [user] = await db.insert(users).values({
    email,
    name,
  }).returning();
  
  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

export async function getAllUsers() {
  return await db.select().from(users);
}

// Re-export the database instance and schema
export { db } from './index';
export * from './schema';
