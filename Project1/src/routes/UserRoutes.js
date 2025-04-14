// const routes = require("express").Router()
// //controller --> userController
// const userController = require("../controllers/UserController")
// //routes.post("/user",userController.addUser)
// routes.post("/user",userController.signup)
// routes.get("/users",userController.getAllUsers)
// routes.get("/user/:id",userController.getUserById)
// routes.delete("/user/:id",userController.deleteUserById)
// routes.post("/user/login",userController.loginUser)

// module.exports = routes


const routes = require("express").Router();
const userController = require("../controllers/UserController");
const { blockUser, unblockUser } = require("../controllers/UserController");
const { updateUserProfile } = require("../controllers/UserController");

// 🔹 User Signup (Creates a New User)
routes.post("/user", userController.signup);

// 🔹 Get All Users (Admin Only)
routes.get("/users", userController.getAllUsers);



// 🔹 Get User By ID
routes.get("/user/:id", userController.getUserById);

// 🔹 Delete User By ID (Admin Only)
routes.delete("/user/:id", userController.deleteUserById);

// 🔹 User Login (Handles Admin, User, Agent, Buy/Sale Login)
routes.post("/user/login", userController.loginUser);

routes.post("/user/forgotpassword", userController.forgotPassword);

routes.post("/user/verifyotp", userController.verifyOtp);

// Route for resetting password after OTP verification
routes.post("/user/resetpassword", userController.resetPassword);


routes.put("/block/:id", blockUser);

routes.put("/unblock/:id", unblockUser);

routes.put("/users/:id", updateUserProfile)


module.exports = routes;

