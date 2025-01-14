import { ConfigManager } from "./controllers/ConfigManager";
import { SurrealWrapper } from "./controllers/SurrealWrapper";

import fetch from "node-fetch";

const configManager = new ConfigManager();
const dbConfig = configManager.getConfig();
const db = new SurrealWrapper();

// Polyfill for fetch in Node.js
if (!globalThis.fetch) {
  globalThis.fetch = fetch as unknown as typeof globalThis.fetch;
}

global.exports("SurrealDB", () => {
  return {
    connect: async (database: DatabaseConfig) => db.connect(database),
    create: async (table: string, data: any) => db.create(table, data),
    change: async (table: string, data: any) => db.change(table, data),
    select: async (table: string) => db.select(table),
    update: async (table: string, data: any) => db.update(table, data),
    query: async (query: string, data: any) => db.query(query, data),
    delete: async (table: string) => db.delete(table),
  };
});

on("onResourceStart", async (resourceName: string) => {
  if (GetCurrentResourceName() !== resourceName) return;

  try {
    await db.connect(dbConfig);

    console.log(`[${resourceName}] Successfully connected to SurrealDB`);
  } catch (error) {
    console.error(`[${resourceName}] Failed to initialize database:`, error);
  }
});
