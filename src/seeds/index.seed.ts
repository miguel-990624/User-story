import { sequelize } from "../config/database.ts";
import { seedUsers } from "./users.seed.ts";
import { seedProducts } from "./product.seed.ts";
import { seedClients } from "./clients.seed.ts";

async function runSeeds() {
  try {
    console.log("Base de datos sincronizada ✅");

    await seedUsers();
    console.log("Usuarios insertados ✅");

    await seedProducts();
    console.log("Productos insertados ✅");

    await seedClients();
    console.log("Clientes insertados ✅");

    console.log("Seeds ejecutados con éxito 🚀");
    process.exit(0);
    
  } catch (error) {
    console.error("Error ejecutando seeds:", error);
    process.exit(1);
  }
}

runSeeds();
