import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
    logging: false,
  }
);

const initSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Sequelize connected to Postgres");
    
    await sequelize.sync({ force: false, alter: true }); 
    console.log("✅ All models were synchronized successfully");
  } catch (error) {
    console.error("❌ Error connecting to Sequelize:", error);
    process.exit(1);
  }
};

export { sequelize, initSequelize };