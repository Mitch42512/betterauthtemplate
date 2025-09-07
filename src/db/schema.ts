import { pgTable, varchar, timestamp, integer, serial, boolean } from "drizzle-orm/pg-core";

// User table - core user data
export const user = pgTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  emailVerified: varchar("emailVerified", { length: 255 }),
  image: varchar("image", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  // Required by BetterAuth 2FA
  twoFactorEnabled: boolean("twoFactorEnabled").default(false).notNull(),
});

// Account table - OAuth provider accounts
export const account = pgTable("account", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: varchar("accountId", { length: 255 }).notNull(),
  providerId: varchar("providerId", { length: 255 }).notNull(),
  accessToken: varchar("accessToken", { length: 500 }),
  refreshToken: varchar("refreshToken", { length: 500 }),
  idToken: varchar("idToken", { length: 500 }),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: varchar("scope", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Session table - user sessions
export const session = pgTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expiresAt").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 255 }),
  userAgent: varchar("userAgent", { length: 500 }),
});

// Verification table - email verification tokens
export const verification = pgTable("verification", {
  id: varchar("id", { length: 255 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Two-factor authentication table - MUST be named "twoFactor" for BetterAuth
export const twoFactor = pgTable("twoFactor", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  secret: varchar("secret", { length: 255 }).notNull(),
  backupCodes: varchar("backupCodes", { length: 1000 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Two-factor backup codes table - MUST be named "twoFactorBackupCodes" for BetterAuth
export const twoFactorBackupCodes = pgTable("twoFactorBackupCodes", {
  id: varchar("id", { length: 255 }).primaryKey(),
  twoFactorId: varchar("twoFactorId", { length: 255 })
    .notNull()
    .references(() => twoFactor.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 255 }).notNull(),
  used: varchar("used", { length: 10 }).default("false").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});