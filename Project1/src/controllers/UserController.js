const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailutil = require("../utils/MailUtil");
const UserModel = require("../models/UserModel");


const loginUser  = async(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    const foundUserFromEmail = await userModel.findOne({ email:email}).populate("roleId")
    console.log(foundUserFromEmail);

    if(foundUserFromEmail != null){
        const isMatch = bcrypt.compareSync(password,foundUserFromEmail.password);

        if(isMatch ==true){
            res.status(200).json({
                message: "login success",
                data : foundUserFromEmail,
            });
        } else{
            res.status(404).json({
                message:"invalid cred..",
            }) ;
        
        };
    }else {
        res.status(404).json({
            message:"Email not found..",
        });  
     };
 };

const signup = async (req,res) =>{

    try{

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt);
        req.body.password = hashedPassword;
        const createdUser = await userModel.create(req.body);

        // const mailresponse = await mailutil.sendingMail(createdUser.email,"welcome to pg finder ", "this is a welcome mail")

        await mailutil.sendingMail(createdUser.email,"welcome to pg finder ", "this is a welcome mail")


        res.status(201).json({
            message:"user created..",
            data:createdUser,
        });



    }catch(err){

        console.log(err)
        res.status(500).json({
            message:"error",
            data:err,
        });

    };
};


const addUser = async(req,res)=>{

        //req.body...
        const savedUser = await userModel.create(req.body)
        res.json({
            message:"User Saved Successfully",
            data:savedUser,
        });



};
const getAllUsers = async(req,res)=>{


    const users = await userModel.find().populate("roleId")
    res.json({
        message:"User fetched successfully..",
        data:users,
    });



};

const getUserById = async(req,res)=>{

    const foundUser = await userModel.findById(req.params.id);
    res.json({
        message:"user fetched successfully..",
        data:foundUser,

    });

};

const deleteUserById = async(req,res)=>{


        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"user deleted Successfully..",
            data:deletedUser,
        });


};

// Block User
const blockUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { status: "blocked" },
        { new: true }
      );
  
      res.status(200).json({
        message: "User blocked successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error blocking user:", error);
      res.status(500).json({ message: "Error blocking user", error });
    }
  };
  
  // Unblock User
  const unblockUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { status: "active" },
        { new: true }
      );
  
      res.status(200).json({
        message: "User unblocked successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error unblocking user:", error);
      res.status(500).json({ message: "Error unblocking user", error });
    }
  };

  const updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
  
    console.log("User ID:", userId);
    console.log("Updated Data:", updatedData);
  
    try {
      const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log("Updated User:", updatedUser);
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message
      });
    }
  };
  const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists in the database by email
        const user = await userModel.findOne({ email: email });

        // If no user found, return an error response
        if (!user) {
            return res.status(404).json({ message: "User not found with this email" });
        }

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save OTP to the user model (you may want to add OTP and expiry fields to your user model)
        user.resetOTP = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP is valid for 10 minutes
        await user.save();

        // Send OTP to user's email (using your mail utility)
        await mailutil.sendingMail(
            user.email,
            "Forgot Password - OTP Verification",
            `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
        );

        // Respond with success message (not returning OTP in production, just for testing purposes)
        res.status(200).json({
            message: "OTP sent to your email successfully. Use it to reset your password.",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
      const user = await userModel.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found with this email" });
      }

      // Debugging: Check the OTP and expiry
      console.log("OTP from user input:", otp);
      console.log("Stored OTP:", user.resetOTP);
      console.log("OTP expiry time:", user.otpExpiry);

      // Ensure OTP is compared correctly (parse to integer if necessary)
      if (user.resetOTP !== parseInt(otp)) {
          return res.status(400).json({ message: "Invalid OTP" });
      }

      // Check if OTP has expired
      if (user.otpExpiry < Date.now()) {
          return res.status(400).json({ message: "OTP has expired" });
      }

      // OTP verified successfully
      res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
      console.log("Error during OTP verification:", error);
      res.status(500).json({ message: "Something went wrong", error });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      const user = await userModel.findOne({ email: email });
      
      if (!user) {
          return res.status(404).json({ message: "User not found with this email" });
      }

      // Hash new password and update it in the database
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      user.password = hashedPassword;
      
      // Reset OTP and expiry time as the password is successfully changed
      user.resetOTP = undefined;
      user.otpExpiry = undefined;

      await user.save();

      res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong", error });
  }
};




  

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    signup,
    loginUser,
    blockUser,
    unblockUser,
    updateUserProfile,
    forgotPassword ,
    verifyOtp,
    resetPassword 
};


