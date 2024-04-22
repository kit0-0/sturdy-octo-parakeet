const db = require("../config/db");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password, mobile } = req.body;
    if (!email || !password || !mobile) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const user = await db.query("SELECT * FROM employee WHERE email_id = ?", [
      email,
    ]);
   
    if (!user || user.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    const storedPassword = password;
    const isMatch = password === storedPassword;
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Save token in a cookie
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred during login" });
  }
};

const profile = async (req, res) => {
  try {
    const email = req.user.email;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is missing in the request" });
    }

    const user = await db.query(
      "SELECT * FROM employee WHERE email_id = ?",
      [email]
    );

    if (user && user.length > 0) {
      return res.status(200).json({ success: true, user: user[0] });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while fetching user data",
      });
  }
};
const logout = (req, res) => {
    try {
      // Clear the token cookie
      res.clearCookie("token");
  
      return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "An error occurred during logout" });
    }
  };
  
  module.exports = {
    login,
    profile,
    logout,
  };