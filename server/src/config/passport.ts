import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import db from "./database";
import {User} from "../models/user";

//Passport Local
passport.use(
    "local",
    new Strategy({ usernameField: "email" }, async function verify(
      email,
      password,
      cb
    ) {
      try {
        const checkCredentials = await db.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        if (checkCredentials.rows.length === 0) {
          return cb(null, false, {
            message: "User with this email doesn't exist!",
          });
        }
        //User Exists
        const user: User = checkCredentials.rows[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return cb(err);
          }
  
          if (result) {
            return cb(null, user);
          } else {
            return cb(null, false, { message: "The password is Incorrect!" });
          }
        });
      } catch (err) {
        return cb(err);
      }
    })
  );
  
  //Passport Google OAuth
  
  // Serialize User
  passport.serializeUser((user: any, cb) => {
    cb(null, user.id); // Serialize the user ID
  });
  
  // Deserialize User
  passport.deserializeUser(async (id: number, cb) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
      if (result.rows.length > 0) {
        cb(null, result.rows[0]); // Deserialize and return user object
      } else {
        cb(new Error("User not found"));
      }
    } catch (err) {
      cb(err);
    }
  });