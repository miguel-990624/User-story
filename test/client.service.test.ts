// tests/client.service.test.ts
import { Client } from "../src/models/index.models.ts";
import { getClients, getClientById, postClient } from "../src/services/client.service.ts";

// Mock de los métodos de Sequelize
jest.mock("../src/models/index.models.ts", () => ({
  Client: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Client Service", () => {
    
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería retornar todos los clientes", async () => {
    (Client.findAll as jest.Mock).mockResolvedValue([{ id: 1, name: "Miguel" }]);

    const result = await getClients();
    expect(result).toEqual([{ id: 1, name: "Miguel" }]);
    expect(Client.findAll).toHaveBeenCalledTimes(1);
  });

  it("debería retornar un cliente por ID", async () => {
    (Client.findByPk as jest.Mock).mockResolvedValue({ id: 1, name: "Miguel" });

    const result = await getClientById(1);
    expect(result).toEqual({ id: 1, name: "Miguel" });
    expect(Client.findByPk).toHaveBeenCalledWith(1);
  });

  it("debería crear un cliente", async () => {
    const newClient = { name: "Nuevo", email: "nuevo@test.com" };
    (Client.create as jest.Mock).mockResolvedValue({ id: 2, ...newClient });

    const result = await postClient(newClient as any);
    expect(result).toEqual({ id: 2, ...newClient });
    expect(Client.create).toHaveBeenCalledWith(newClient);
  });
});
