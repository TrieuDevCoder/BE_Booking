const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("booking_app", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging:false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect to databaseDB   success");
  } catch (error) {
    console.log("Connect to database fail", error);
  }
};
module.exports = connectDB;
