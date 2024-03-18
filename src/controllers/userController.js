import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res
      .status(500)
      .json({ errCode: 1, message: "Missing input parameter" });
  }

  try {
    let userData = await userService.handleUserLogin(email, password); // Đảm bảo gọi hàm đúng tên
    console.log(userData);
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ errCode: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  handleLogin: handleLogin,
};
