import { UserLoginSchema } from "../src/schemas/user.schema.ts";

describe("UserLoginSchema", () => {
    it("valida credenciales correctas", () => {
        const result = UserLoginSchema.safeParse({
            email: "miguel@test.com",
            password: "123456",
        });

        expect(result.success).toBe(true);
    });

    it("rechaza un email inválido", () => {
        const result = UserLoginSchema.safeParse({
            email: "bad-email",
            password: "123456",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("Invalid email");
        }
    });

    it("rechaza un password demasiado corto", () => {
        const result = UserLoginSchema.safeParse({
            email: "miguel@test.com",
            password: "123",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("Too small");
        }
    });
});
