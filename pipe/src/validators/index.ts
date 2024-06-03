import jwt from "jsonwebtoken";
import User from "../models/users";
import Admin from "../models/admin";
import Client from "../models/client";
import { Request, Response, NextFunction } from "express";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    let decodedToken: jwt.JwtPayload;
    let userModel;

    if (token.startsWith("Bearer ")) {
      const tokenValue = token.replace("Bearer ", "");
      const secret: string | undefined = process.env.JWT_SECRET;
      if (!secret) {
        next("JWT secret is not defined");
      }

      decodedToken = jwt.verify(
        tokenValue,
        secret as jwt.Secret
      ) as jwt.JwtPayload;

      // userModel =
      //   decodedToken.role === "admin"
      //     ? Admin
      //     : decodedToken.role === "client" || decodedToken.role === "user"
      //     ? User
      //     : Admin;

      userModel =
        decodedToken.role === "admin"
          ? Admin
          : decodedToken.role === "client"
          ? Client
          : User;
    } else {
      throw new Error("Invalid token format");
    }

    const updatedReq = Object.assign({}, req, {
      [decodedToken.role as keyof typeof req]: userModel,
    });
    req = updatedReq;
  } catch (error) {
    if ((error as Error).name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
