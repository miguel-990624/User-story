import { Client } from "../models/clients.models.ts";
import type { ClientCreation } from "../models/clients.models.ts";

// GET all clients
const getClients = async (): Promise<Client[]> => {
  return await Client.findAll();
};

// GET client by ID
const getClientById = async (id: number): Promise<Client | null> => {
  return await Client.findByPk(id);
};

// GET client by email
const getClientByEmail = async (email: string): Promise<Client | null> => {
  return await Client.findOne({ where: { email } });
};

// POST create client
const postClient = async (newClient: ClientCreation): Promise<Client> => {
  const client = await Client.create(newClient);
  return client;
};

// PUT update client
const putClient = async (
  id: number,
  updatedClient: Partial<ClientCreation>
): Promise<Client | null> => {
  const client = await Client.findByPk(id);
  if (!client) return null;

  const updated = await client.update(updatedClient);
  return updated;
};

// DELETE client
const deleteClient = async (id: number): Promise<boolean> => {
  const client = await Client.findByPk(id);
  if (!client) return false;

  await Client.destroy({ where: { id } });
  return true;
};

export { getClients, getClientById, getClientByEmail, postClient, putClient, deleteClient };
