import { User } from "../models/users.models.ts";

export async function seedUsers() {
  await User.bulkCreate([
    {
      name: "Admin",
      email: "admin@sportsline.com",
      password: "admin123",
      role: "admin",
    },
    {
      name: "Analyst One",
      email: "analyst1@sportsline.com",
      password: "analyst123",
      role: "analyst",
    },
  ]);
}
