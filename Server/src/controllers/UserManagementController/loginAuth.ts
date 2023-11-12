import {Request, Response} from "express";
import Users from "../../models/UserManagementModel/users";
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken";
import ENV from "../../config";

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    console.log(email, password);
    // Check if user exists
    const user = await Users.findOne({email});
    if (!user) return res.status(401).json({msg: "User does not exist"});

    // Check password

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      "xyz123"
    ).toString(CryptoJS.enc.Utf8);
    // console.log(decryptedPassword);
    // console.log(password);

    if (decryptedPassword != `"${password}"`) {
      return res.status(200).json({msg: "Invalid password"});
    } else {
      //create a JWT Token
      const token = Jwt.sign(
        {
          id: user._id,
          email: user.email,
          userType: user.userType,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        ENV.JWT_SECRET_KEY,
        {
          expiresIn: "2d",
        }
      );
      return res.status(200).json({msg: "Login Successful!", user, token});
    }
  } catch (error) {
    res.status(400).json({message: "Login Unsuccessful: " + error});
  }
};
