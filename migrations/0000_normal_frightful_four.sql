CREATE TABLE IF NOT EXISTS "teachers" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacherName" text NOT NULL,
	"university" text NOT NULL,
	"recommended" integer,
	"notRecommended" integer,
	"guzaraHai" integer,
	"marKrBhiNhi" integer,
	"image" text,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" text NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);
