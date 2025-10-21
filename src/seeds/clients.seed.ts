import { Client } from "../models/clients.models.ts";

export async function seedClients() {
  await Client.bulkCreate([
    {
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      phone: "3001234567",
    },
    {
      name: "María Gómez",
      email: "maria.gomez@example.com",
      phone: "3019876543",
    },
  ]);
}
