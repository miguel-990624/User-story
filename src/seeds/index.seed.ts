import { initSequelize } from "../config/database.ts";
import "../models/index.models.ts";

import { seedUsers } from "./users.seed.ts";
import { seedClients } from "./clients.seed.ts";
import { seedProducts } from "./product.seed.ts";
import { seedOrders } from "./orders.seed.ts";

export async function runSeeds() {
  try {
    await initSequelize();

    await seedUsers();
    await seedClients();
    await seedProducts();
    await seedOrders();

    console.log("🌱 Todos los seeds ejecutados correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error ejecutando seeds:", error);
    process.exit(1);
  }
}

runSeeds();
