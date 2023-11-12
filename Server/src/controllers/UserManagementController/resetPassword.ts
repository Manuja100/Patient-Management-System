import {Request, Response} from "express";
import Users from "../../models/UserManagementModel/users";
import CryptoJS from "crypto-js";

export const resetPassword = async (req: Request, res: Response) => {
  const {email, currentPassword, newPassword} = req.body;
  try {
    // Check if user exists
    const returnUser = await Users.findOne({email});
    if (!returnUser) {
      return res.status(404).json({message: "User not found"});
    } else {
      const decryptedPassword = CryptoJS.AES.decrypt(
        returnUser.password,
        "xyz123"
      ).toString(CryptoJS.enc.Utf8);
      if (decryptedPassword == `"${currentPassword}"`) {
        // Update user's password

        returnUser.password = CryptoJS.AES.encrypt(
          JSON.stringify(newPassword),
          "xyz123"
        ).toString();
        await returnUser.save();
        res.status(200).json({message: "Password reset successful"});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Failed to reset password"});
  }
};
