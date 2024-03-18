import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(">>>>>>>>");
    console.log(data);
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error.message);
  }
};
let getAboutPage = (req, res) => {
  return res.render("about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post CRUD from controller");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getALLUsers();
  console.log(data);
  return res.render("display.ejs", { dataTable: data });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    console.log(userData);
    return res.render("editCRUD.ejs", { user: userData });
  } else {
    return res.send("update CRUD not found");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("display.ejs", { dataTable: allUsers });
};
let deleteCRUD = async (req, res) =>{
  let id = req.query.id;
  if(id){
    let allUsers =await CRUDService.deleteUserById(id);
    // return res.render("display.ejs", { dataTable: allUsers });
    return res.send("delete CRUD successfully ");
  }else{
    return res.send("delete CRUD not found");
  
  }
}
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD
};
