import {Request, Response} from "express";
import Users from "../../models/UserManagementModel/users";

export const updateUserController = (req: Request, res: Response): void => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        console.log("No user");
        return res.status(404).json({message: "User not found"});
      }
      console.log("Abc");
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.userType = req.body.userType || user.userType;
      user.designation = req.body.designation || user.designation;
      user.contactNumber = req.body.contactNumber || user.contactNumber;
      user.email = req.body.email || user.email;
      // user.password = req.body.password || user.password;

      user
        .save()
        .then(() => res.json("User updated"))
        .catch((err) => res.status(400).json({message: "Error: " + err}));
    })
    .catch((err) => res.status(400).json({message: "Error: " + err}));
};
