import express, {Request, Response} from "express";
import Users from "../../models/UserManagementModel/users";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.PASSWORD_SECRET_KEY;

// export async function addUserController(req: Request, res: Response) {
//   console.log(req.body);

//   const newUser = new Users();
//   const addUser = await newUser.save();
//   res.json(addUser);
//   console.log(addUser);
// }

export async function addUserController(req: Request, res: Response) {
  const {
    firstName,
    lastName,
    userType,
    designation,
    contactNumber,
    email,
    password,
  } = req.body;

  const newUser = new Users({
    firstName,
    lastName,
    userType,
    designation,
    contactNumber,
    email,
    password: CryptoJS.AES.encrypt(
      JSON.stringify(password),
      "xyz123"
    ).toString(),
  });

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({message: "User with this email already exists"});
    }
    const addUser = await newUser.save();
    res.json(addUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Failed to add user."});
  }
}
