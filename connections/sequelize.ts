import { Sequelize, DataTypes } from "sequelize";
import pg from "pg";

// Configura la conexión a la base de datos
export const sequelize = new Sequelize(process.env.TOKEN_SEQUELIZE, {
  dialect: "postgres",
  dialectModule: pg,
});

export const User = sequelize.define("user", {
  name: DataTypes.STRING,
  surname: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: { type: DataTypes.JSON },
  identification: { type: DataTypes.JSON },
  address: { type: DataTypes.JSON },
});

export const Order = sequelize.define("order", {
  product_id: DataTypes.STRING,
  title: DataTypes.STRING,
  img: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  status: DataTypes.STRING,
  date: DataTypes.DATE,
});

async function syncDb() {
  try {
    // Sincroniza todos los modelos con la base de datos
    await sequelize.sync({ alter: true }); // Usar { force: true } eliminará todas las tablas antes de crear nuevas
    console.log("Database sincronizada");
  } catch (error) {
    console.error("Error sincronizacion base de datos:", error);
  }
}

syncDb();

// async function dropAllTables() {
//   try {
//     // Obtén la interfaz de consulta
//     const queryInterface = sequelize.getQueryInterface();

//     // Obtén todos los nombres de las tablas
//     const tables = await queryInterface.showAllTables();

//     // Elimina cada tabla con la opción CASCADE
//     for (const table of tables) {
//       await queryInterface.dropTable(table, { cascade: true });
//       console.log(`Table ${table} has been dropped`);
//     }
//   } catch (error) {
//     console.error("Error dropping tables:", error);
//   } finally {
//     // Cierra la conexión después de eliminar las tablas
//     await sequelize.close();
//     process.exit(0); // Salir del proceso después de la sincronización
//   }
// }

// dropAllTables();
