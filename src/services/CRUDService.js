import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSalt(10);

let createNewUser = async (data) => {
  try {
    return new Promise(async (resolve, reject) => {
      try {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender == "1" ? true : false,
          roleId: data.roleId,
          positionId: data.positionId,
        });
        resolve("Create new user success");
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

let hashUserPassword = (password, salt) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  hashUserPassword: hashUserPassword,
};
