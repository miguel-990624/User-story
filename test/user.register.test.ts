import { UserRegisterSchema } from "../src/schemas/user.schema.ts";

describe("UserRegisterSchema", () => {
    it("valida un usuario correcto", () => {
        const result = UserRegisterSchema.safeParse({
            name: "Miguel",
            email: "miguel@test.com",
            password: "123456",
            role: "analyst",
        });

        expect(result.success).toBe(true);
    });

    it("rechaza un nombre demasiado corto", () => {
        const result = UserRegisterSchema.safeParse({
            name: "Mi",
            email: "miguel@test.com",
            password: "123456",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("al menos 3 caracteres");
        }
    });

    it("rechaza un email inválido", () => {
        const result = UserRegisterSchema.safeParse({
            name: "Miguel",
            email: "bad-email",
            password: "123456",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("Correo inválido");
        }
    });

    it("rechaza un password demasiado corto", () => {
        const result = UserRegisterSchema.safeParse({
            name: "Miguel",
            email: "miguel@test.com",
            password: "123",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("La contraseña");
        }
    });

    it("asigna rol por defecto como analyst", () => {
        const result = UserRegisterSchema.safeParse({
            name: "Miguel",
            email: "miguel@test.com",
            password: "123456",
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.role).toBe("analyst");
        }
    });
});
