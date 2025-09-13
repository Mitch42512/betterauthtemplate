import { eq } from 'drizzle-orm';
import { db } from './index';
import { user, account } from './schema';
import { nanoid } from 'nanoid';

// Example database operations
export async function createUser(email: string, name?: string) {
  const [newUser] = await db.insert(user).values({
    id: nanoid(),
    email,
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

export async function createAccount(userId: string, accountId: string, providerId: string, password?: string) {
  const [newAccount] = await db.insert(account).values({
    id: accountId,
    userId,
    accountId,
    providerId,
    password,
  }).returning();
  
  return newAccount;
}

// Re-export the database instance and schema
export { db } from './index';
export * from './schema';

