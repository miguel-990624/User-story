import {
  getClientsController,
  getClientByIdController,
  postClientController,
  putClientController,
  deleteClientController,
} from "../src/controllers/client.controller.ts";

import * as clientService from "../src/services/client.service.ts";

// Mock de Request y Response
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("Client Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // =====================
  // GET all clients
  // =====================
  it("getClientsController debería retornar lista de clientes", async () => {
    const req: any = {};
    const res = mockResponse();

    jest.spyOn(clientService, "getClients").mockResolvedValue([{ id: 1, name: "Miguel" }] as any);

    await getClientsController(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Miguel" }]);
  });

  it("getClientsController debería manejar error con status 500", async () => {
    const req: any = {};
    const res = mockResponse();

    jest.spyOn(clientService, "getClients").mockRejectedValue(new Error("DB error"));

    await getClientsController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error fetching clients");
  });

  // =====================
  // GET client by ID
  // =====================
  it("getClientByIdController debería retornar un cliente", async () => {
    const req: any = { params: { id: "1" } };
    const res = mockResponse();

    jest.spyOn(clientService, "getClientById").mockResolvedValue({ id: 1, name: "Miguel" } as any);

    await getClientByIdController(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Miguel" });
  });

  it("getClientByIdController debería retornar 400 si el id es inválido", async () => {
    const req: any = { params: { id: "abc" } };
    const res = mockResponse();

    await getClientByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid client id");
  });

  it("getClientByIdController debería retornar 404 si no existe cliente", async () => {
    const req: any = { params: { id: "1" } };
    const res = mockResponse();

    jest.spyOn(clientService, "getClientById").mockResolvedValue(null);

    await getClientByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Client not found");
  });

  // =====================
  // POST create client
  // =====================
  it("postClientController debería crear un cliente", async () => {
    const req: any = { body: { name: "Nuevo", email: "nuevo@test.com" } };
    const res = mockResponse();

    jest.spyOn(clientService, "postClient").mockResolvedValue({ id: 2, ...req.body } as any);

    await postClientController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 2, ...req.body });
  });

  it("postClientController debería retornar 400 si falta name", async () => {
    const req: any = { body: { email: "nuevo@test.com" } };
    const res = mockResponse();

    await postClientController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Name is required and must be a string");
  });

  // =====================
  // PUT update client
  // =====================
  it("putClientController debería actualizar un cliente", async () => {
    const req: any = { params: { id: "1" }, body: { name: "Actualizado" } };
    const res = mockResponse();

    jest.spyOn(clientService, "putClient").mockResolvedValue({ id: 1, name: "Actualizado" } as any);

    await putClientController(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Actualizado" });
  });

  it("putClientController debería retornar 404 si no existe cliente", async () => {
    const req: any = { params: { id: "1" }, body: { name: "Actualizado" } };
    const res = mockResponse();

    jest.spyOn(clientService, "putClient").mockResolvedValue(null);

    await putClientController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Client not found");
  });

  // =====================
  // DELETE client
  // =====================
  it("deleteClientController debería eliminar un cliente", async () => {
    const req: any = { params: { id: "1" } };
    const res = mockResponse();

    jest.spyOn(clientService, "deleteClient").mockResolvedValue(true);

    await deleteClientController(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("deleteClientController debería retornar 404 si no existe cliente", async () => {
    const req: any = { params: { id: "1" } };
    const res = mockResponse();

    jest.spyOn(clientService, "deleteClient").mockResolvedValue(false);

    await deleteClientController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Client not found");
  });
});
