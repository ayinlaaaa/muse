import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next loads .env.local automatically; Drizzle Kit needs it loaded explicitly.
loadEnv({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run Drizzle Kit");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: databaseUrl,
  },
});
