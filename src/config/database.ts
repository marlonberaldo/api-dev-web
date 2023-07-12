import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ultima_chance", "root", "memorda1", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
