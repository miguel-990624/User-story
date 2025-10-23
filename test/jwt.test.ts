import jwt from "jsonwebtoken";

describe("JWT", () => {
  const secret = "supersecret"; // en producción usarías process.env.JWT_SECRET

  it("firma y verifica un token correctamente", () => {
    const payload = { userId: 123, role: "student" };

    // Generar token
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    // Verificar token
    const decoded = jwt.verify(token, secret) as { userId: number; role: string };

    expect(decoded.userId).toBe(123);
    expect(decoded.role).toBe("student");
  });

  it("lanza error con un token inválido", () => {
    expect(() => jwt.verify("fake.token.value", secret)).toThrow();
  });

  it("expira el token después del tiempo definido", done => {
    const token = jwt.sign({ userId: 1 }, secret, { expiresIn: "1s" });

    // Esperar 2 segundos para que expire
    setTimeout(() => {
      expect(() => jwt.verify(token, secret)).toThrow();
      done();
    }, 2000);
  });
});
