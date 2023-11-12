import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ENV from "../config";
import Users from "../models/UserManagementModel/users";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export default async function Auth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("Token is " + token);
    //retrieve user details of the logged in user
    if (token) {
      const decodedToken = jwt.verify(token, ENV.JWT_SECRET_KEY);
      req.user = decodedToken;
      const user = JSON.stringify(req.user);
      next();
    } else {
      res.status(401).json({ error: "Invalid Token" });
    }
  } catch (error) {
    res.status(401).json({ error: "Authentication Error" });
  }
}

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) => {
  if (req.user.userType === "Admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action!" });
  }
};

export const isConsultant = (
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) => {
  if (req.user.userType === "Consultant") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action!" });
  }
};

export const isDoctor = (
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) => {
  if (req.user.userType === "Doctor") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action!" });
  }
};

export const isHeadNurse = (
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) => {
  if (req.user.userType === "Head Nurse") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action!" });
  }
};
