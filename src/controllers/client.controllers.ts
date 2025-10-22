import { type Request, type Response } from "express";
import { getClients, getClientById, postClient, putClient, deleteClient } from "../services/client.services.ts";

// GET all clients
const getClientsController = async (req: Request, res: Response) => {
  try {
    const clients = await getClients();
    res.json(clients);
  } catch (error) {
    console.error("❌ Error in getClientsController:", error);
    res.status(500).send("Error fetching clients");
  }
};

// GET client by ID
const getClientByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clientId = Number(id);

  if (!id || isNaN(clientId)) {
    return res.status(400).send("Invalid client id");
  }

  try {
    const client = await getClientById(clientId);
    if (!client) return res.status(404).send("Client not found");
    res.json(client);
  } catch (error) {
    console.error("❌ Error in getClientByIdController:", error);
    res.status(500).send("Error fetching client");
  }
};

// POST create client
const postClientController = async (req: Request, res: Response) => {
  try {
    // Validación mínima del body
    if (!req.body.name || typeof req.body.name !== "string") {
      return res.status(400).send("Name is required and must be a string");
    }
    if (!req.body.email || typeof req.body.email !== "string") {
      return res.status(400).send("Email is required and must be a string");
    }

    const client = await postClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    console.error("❌ Error in postClientController:", error);
    res.status(500).send("Error creating client");
  }
};

// PUT update client
const putClientController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clientId = Number(id);

  if (!id || isNaN(clientId)) {
    return res.status(400).send("Invalid client id");
  }

  try {
    const client = await putClient(clientId, req.body);
    if (!client) return res.status(404).send("Client not found");
    res.json(client);
  } catch (error) {
    console.error("❌ Error in putClientController:", error);
    res.status(500).send("Error updating client");
  }
};

// DELETE client
const deleteClientController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clientId = Number(id);

  if (!id || isNaN(clientId)) {
    return res.status(400).send("Invalid client id");
  }

  try {
    const deleted = await deleteClient(clientId);
    if (!deleted) return res.status(404).send("Client not found");
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error in deleteClientController:", error);
    res.status(500).send("Error deleting client");
  }
};

export { getClientsController, getClientByIdController, postClientController, putClientController, deleteClientController };
