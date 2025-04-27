import {serial, text, pgTable, timestamp, integer} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  teacherName: text("teacherName").notNull(),
  university: text("university").notNull(),
  email: text("email").notNull(),
  dept: text("dept").notNull(),
  recommendedFor: text("recommendedFor"),
  notRecommendedFor: text("notRecommendedFor"),
  recommended: integer("recommended").default(0),
  notRecommended: integer("notRecommended").default(0),
  guzaraHai: integer("guzaraHai").default(0),
  marKrBhiNhi: integer("marKrBhiNhi").default(0),
  image: text("image"),
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});
