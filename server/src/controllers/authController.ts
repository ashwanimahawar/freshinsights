import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import db from "../config/database";
import passport from "passport";

const saltRounds = 10;

//Registering User
export const registerNewUser = async (
  req: Request<User>,
  res: Response
): Promise<any> => {
  const { name, email, password } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({
        message: "User with this email already exists, try logging in!",
        status: 400,
      });
    } else {
      //Password hashing
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error Hashing Password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hash]
          );
          const user = result.rows[0];
          req.logIn(user, (err) => {
            if (err) {
              return res.status(400).json({
                message: "Error logging in after registration..",
                status: 400,
                redirect: "/login",
              });
            }
            return res.status(200).json({
              message: "User Registered Successfully!",
              status: 200,
              user,
              redirect: "/dashboard",
            });
          });
        }
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      status: 400,
      redirect: "/login",
    });
  }
};

//Logging in User
export const loginExistingUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", async (err: Error, user: User, info: any) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error during login.", status: 400 });
    }
    const checkCredentials = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.email]
    );
    if (checkCredentials.rows.length === 0) {
      return res.status(400).json({
        message: "User with this email doesn't exists, try signing up!",
        status: 400,
      });
    }

    // If successful, login the user
    req.logIn(user, (err: any) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Password is Incorrect!", status: 400 });
      }
      return res.status(200).json({
        message: "Login successful!",
        status: 200,
        user,
        redirect: "/dashboard",
      });
    });
  })(req, res, next); // Call the middleware with req, res, next
};

//Logout User
export const logoutUser = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error during logout.", status: 400 });
    }
    //Destroy session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to destroy the session",
          status: 400,
          redirect: "/",
        });
      }
      // console.log("Session Destroyed!");
      // console.log("Authentication after Logout: ", req.isAuthenticated());

      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: false,
      });
      return res.status(200).json({
        message: "Logout successful!",
        status: 200,
        redirect: "/login",
      });
    });
  });
};